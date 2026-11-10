import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { headings, sections, run } from '../scripts/read-rules.mjs';

test('code-fenced sample headings are not document sections', () => {
  const sample = '## 1. First\ntext\n```text\n## 99. Fake\n```\n### 1.1. Child\nchild\n## 2. Second\nlast';
  assert.deepEqual(headings(sample).headings.map(h => h.id), ['1', '1.1', '2']);
  assert.equal(sections(sample, ['1.1']), '### 1.1. Child\nchild');
  assert.throws(() => sections(sample, ['99']), /Unknown section/);
});

test('overlapping section requests do not duplicate text', () => {
  const sample = '## 1. First\ntext\n### 1.1. Child\nchild\n## 2. Second\nlast';
  assert.equal(sections(sample, ['1', '1.1', '1']), sections(sample, ['1']));
});

test('every configured topic resolves against the current source', () => {
  const index = JSON.parse(fs.readFileSync(new URL('../knowledge/rule-index.json', import.meta.url), 'utf8'));
  for (const topic of Object.keys(index.topics)) assert.equal(typeof run([topic]), 'string');
});

test('Table route selects current Table rules without old Card section', () => {
  const text = run(['table', '--no-common']);
  assert.match(text, /^## 63\./);
  assert.doesNotMatch(text, /^## 60\./m);
  assert.doesNotMatch(text, /^# 작업 시작/m);
  assert.ok(Buffer.byteLength(text) < 24000);
});

test('common instructions remain bounded and default to the short guide', () => {
  assert.match(run([]), /^# 작업 시작/);
  assert.ok(Buffer.byteLength(run([])) < 7000);
  assert.ok(Buffer.byteLength(fs.readFileSync(new URL('../AGENTS.md', import.meta.url))) < 5000);
});

test('explicit topics omit common instructions unless requested', () => {
  const minimal = run(['typography']);
  assert.match(minimal, /^### 65\.2\./);
  assert.doesNotMatch(minimal, /^# 작업 시작/m);
  assert.equal(run(['typography', '--with-common']), run([]).trim() + '\n\n' + minimal);
  assert.equal(run(['typography', '--no-common']), minimal);
  assert.ok(Buffer.byteLength(minimal) < Buffer.byteLength(run(['table'])));
});

test('remote ranges reproduce the exact selected source sections', () => {
  const source = fs.readFileSync(new URL('../design-rules.md', import.meta.url), 'utf8');
  const lines = source.split('\n');
  const result = JSON.parse(run(['ranges', 'table-slots']));
  assert.equal(result.source, 'design-rules.md');
  assert.deepEqual(result.ranges.map(r => r.id), ['65.1', '65.3', '65.4', '65.5']);
  const fromRanges = result.ranges.map(r => lines.slice(r.start_line - 1, r.end_line).join('\n').trim()).join('\n\n');
  assert.equal(fromRanges, run(['table-slots']));
  assert.throws(() => run(['ranges', '999']), /Unknown section/);
});

test('asset lookup returns only requested entries and fails on unknown names', () => {
  const entries = JSON.parse(run(['assets', 'tableHeader', 'tableCell']));
  assert.deepEqual(Object.keys(entries), ['tableHeader', 'tableCell']);
  for (const asset of Object.values(entries)) assert.match(asset.key, /^[a-f0-9]{40}$/);
  assert.throws(() => run(['assets']), /Specify needed/);
  assert.throws(() => run(['assets', 'missingAsset']), /Unknown catalog/);
  assert.throws(() => run(['unknownTopic']), /Choose a topic/);
});
