const test = require('node:test');
const assert = require('node:assert/strict');
const { prepareKbdsPc, classifyTextFont } = require('../templates/kbds-pc-runtime.js');

test('numeric formatting remains numeric while mixed text and symbols do not', () => {
  for (const s of ['123', '010) 00** - 00**', '02) 00** - 00**', '1,234.50']) assert.equal(classifyTextFont(s), 'Pretendard');
  for (const s of ['SMS 수신여부', 'kookmin@naver.com', '[12312] 서울', '123원', '123abc', '***', '', '123🙂']) assert.equal(classifyTextFont(s), 'KBFG Text');
});

test('text changes preserve actual style linkage and inherited zero spacing', async () => {
  const loads = [], base = { id: 'base', type: 'TEXT', fontName: { family: 'KBFG Text', style: 'Light' } };
  const numeric = { id: 'numeric', type: 'TEXT', fontName: { family: 'Pretendard', style: 'Light' } };
  const api = {
    loadFontAsync: async f => { loads.push(JSON.stringify(f)); },
    getStyleByIdAsync: async id => id === 'base' ? base : id === 'numeric' ? numeric : null,
    importStyleByKeyAsync: async () => numeric
  };
  const runtime = await prepareKbdsPc(api);
  const text = {
    id: 'text', type: 'TEXT', textStyleId: 'base', characters: 'old', fontName: base.fontName,
    fills: [{ type: 'SOLID', boundVariables: { color: { id: 'state-color' } } }],
    boundVariables: { letterSpacing: [{ id: 'style-zero' }] },
    getStyledTextSegments() { return [{ fontName: this.fontName, textStyleId: this.textStyleId }]; },
    async setTextStyleIdAsync(id) { this.textStyleId = id; this.fontName = id === 'numeric' ? numeric.fontName : base.fontName; }
  };
  await runtime.applyText(text, '국민은행');
  assert.equal(text.textStyleId, 'base');
  await runtime.applyText(text, '010) 00** - 00**', { styleKey: 'numeric14Light' });
  assert.equal(text.textStyleId, 'numeric');
  assert.equal(text.fontName.family, 'Pretendard');
  assert.deepEqual(text.boundVariables.letterSpacing, [{ id: 'style-zero' }]);
  assert.equal(text.fills[0].boundVariables.color.id, 'state-color');
  await assert.rejects(runtime.applyText(text, '문자 데이터'), /matching native numeric variant/);
  assert.equal(text.characters, '010) 00** - 00**');
  assert.throws(() => runtime.literalZero(text, 'letterSpacing'), /Preserve inherited zero/);
  text.textStyleId = '';
  await assert.rejects(runtime.applyText(text, '문자 데이터'), /Linked KBDS text style/);
  assert.equal(loads.length, 2);
  assert.deepEqual(runtime.evidence().mutatedNodeIds, ['text']);
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
