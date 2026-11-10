const test = require('node:test');
const assert = require('node:assert/strict');
const { prepareKbdsPc, classifyTextFont } = require('../templates/kbds-pc-runtime.js');

test('numeric formatting remains numeric while mixed text and symbols do not', () => {
  for (const s of ['123', '010) 00** - 00**', '02) 00** - 00**', '1,234.50']) assert.equal(classifyTextFont(s), 'Pretendard');
  for (const s of ['SMS 수신여부', 'kookmin@naver.com', '[12312] 서울', '123원', '123abc', '***', '', '123🙂']) assert.equal(classifyTextFont(s), 'KBFG Text');
});

test('applying text restores font aliases cleared by a family change and reuses font loads', async () => {
  const loads = [], variables = {
    base: { id: 'base', resolveForConsumer: () => ({ value: 'KBFG Text' }) },
    numeric: { id: 'numeric', resolveForConsumer: () => ({ value: 'Pretendard' }) },
    weight: { id: 'weight' }
  };
  const api = {
    loadFontAsync: async font => { loads.push(JSON.stringify(font)); },
    listAvailableFontsAsync: async () => ['KBFG Text', 'Pretendard'].map(family => ({ fontName: { family, style: 'Medium' } })),
    variables: { getVariableByIdAsync: async id => variables[id] }
  };
  const runtime = await prepareKbdsPc(api);
  runtime.tokens.set('fontBase', variables.base);
  runtime.tokens.set('fontNumeric', variables.numeric);
  let font = { family: 'KBFG Text', style: 'Medium' };
  const text = {
    id: 'text', type: 'TEXT', characters: 'old', letterSpacing: { unit: 'PIXELS', value: 0 },
    boundVariables: { fontWeight: [{ id: 'weight' }], letterSpacing: [{ id: 'zero' }] },
    get fontName() { return font; },
    set fontName(value) { font = value; delete this.boundVariables.fontFamily; delete this.boundVariables.fontWeight; },
    getStyledTextSegments: () => [{ fontName: font }],
    setBoundVariable(field, variable) { if (variable) this.boundVariables[field] = [{ id: variable.id }]; else delete this.boundVariables[field]; },
    setRangeBoundVariable(start, end, field, variable) { this.setBoundVariable(field, variable); }
  };
  await runtime.applyText(text, '010) 00** - 00**');
  assert.equal(text.fontName.family, 'Pretendard');
  assert.deepEqual(text.boundVariables.fontFamily, [{ id: 'numeric' }]);
  assert.deepEqual(text.boundVariables.fontWeight, [{ id: 'weight' }]);
  assert.equal(text.boundVariables.letterSpacing, undefined);
  await runtime.applyText(text, '국민은행');
  assert.equal(text.fontName.family, 'KBFG Text');
  assert.deepEqual(text.boundVariables.fontFamily, [{ id: 'base' }]);
  assert.equal(loads.length, 2);
  assert.deepEqual(runtime.evidence().mutatedNodeIds, ['text']);
  runtime.tokens.delete('fontBase');
  await assert.rejects(runtime.applyText(text, '변경 금지'), /Prepare the matching/);
  assert.equal(text.characters, '국민은행');
});

test('bounded audit reports all error counts without treating omitted errors as passing', async () => {
  const children = Array.from({ length: 40 }, (_, i) => ({ id: String(i), type: 'FRAME', clipsContent: true }));
  const root = { id: 'root', name: 'Changed area', type: 'FRAME', width: 100, height: 100,
    findAll: () => children, findAllWithCriteria: () => [] };
  const runtime = await prepareKbdsPc({});
  const result = await runtime.audit(root, { requireFooter: false });
  assert.equal(result.issueCount, 40);
  assert.equal(result.issues.length, 20);
  assert.equal(result.omittedIssueCount, 20);
  assert.equal(result.issueCounts['must be false'], 40);
});
