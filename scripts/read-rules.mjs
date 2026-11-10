import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const index = JSON.parse(read('knowledge/rule-index.json'));

export function headings(markdown) {
  const lines = markdown.split('\n'), out = [];
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const f = lines[i].match(/^\s*(`{3,}|~{3,})/);
    if (f) {
      if (!fence) fence = f[1];
      else if (f[1][0] === fence[0] && f[1].length >= fence.length) fence = null;
      continue;
    }
    if (fence) continue;
    const m = lines[i].match(/^(#{2,6})\s+(\d+(?:\.\d+)*)\.\s+(.+)$/);
    if (m) out.push({ id: m[2], level: m[1].length, title: m[3], line: i });
  }
  return { lines, headings: out };
}

export function sections(markdown, ids) {
  const parsed = headings(markdown);
  const wanted = [...new Set(ids)].map(id => {
    const n = parsed.headings.find(h => h.id === id);
    if (!n) throw new Error('Unknown section: ' + id);
    const end = parsed.headings.find(h => h.line > n.line && h.level <= n.level)?.line ?? parsed.lines.length;
    return { start: n.line, end };
  }).sort((a, b) => a.start - b.start);
  const merged = [];
  for (const r of wanted) {
    const last = merged.at(-1);
    if (last && r.start <= last.end) last.end = Math.max(last.end, r.end);
    else merged.push({ ...r });
  }
  return merged.map(r => parsed.lines.slice(r.start, r.end).join('\n').trim()).join('\n\n');
}

export function run(argv) {
  const withCommon = argv.includes('--with-common') && !argv.includes('--no-common');
  const [command = 'common', ...args] = argv.filter(a => !['--no-common', '--with-common'].includes(a));
  if (command === 'assets' || command === 'tokens') {
    if (!args.length) throw new Error('Specify needed asset/token names; full catalogs are not printed');
    const require = createRequire(import.meta.url);
    const { KBDS_PC } = require(path.join(root, index.runtime));
    const catalog = command === 'assets' ? KBDS_PC.components : KBDS_PC.tokens;
    return JSON.stringify(Object.fromEntries(args.map(name => {
      if (!Object.hasOwn(catalog, name)) throw new Error('Unknown catalog entry: ' + name);
      return [name, catalog[name]];
    })), null, 2);
  }
  if (command === 'list') {
    const hs = headings(read(index.source)).headings.filter(h => h.level === 2);
    return 'Topics: ' + Object.keys(index.topics).join(', ') + '\n\n' + hs.map(h => h.id + '. ' + h.title).join('\n');
  }
  if (command === 'ranges') {
    if (!args.length) throw new Error('Specify a topic or section number');
    const ids = [...new Set(args.flatMap(arg => index.topics[arg] ?? [arg]))];
    const parsed = headings(read(index.source));
    return JSON.stringify({ source: index.source, ranges: ids.map(id => {
      const h = parsed.headings.find(n => n.id === id);
      if (!h) throw new Error('Unknown section: ' + id);
      const end = parsed.headings.find(n => n.line > h.line && n.level <= h.level)?.line ?? parsed.lines.length;
      return { id, start_line: h.line + 1, end_line: end };
    }) });
  }
  const ids = command === 'section' ? args : index.topics[command];
  if (!ids || (command === 'section' && !ids.length)) throw new Error('Choose a topic or section number; use list');
  const selected = ids.length ? sections(read(index.source), ids) : '';
  return [command === 'common' || withCommon ? read(index.common).trim() : '', selected].filter(Boolean).join('\n\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { process.stdout.write(run(process.argv.slice(2)) + '\n'); }
  catch (e) { console.error(e.message); process.exitCode = 1; }
}
