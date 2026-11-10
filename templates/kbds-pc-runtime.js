/* Include this file at the start of a use_figma script, then call prepareKbdsPc.
 * Handles are valid only inside that call. Canvas writes remain caller-owned.
 * This is a helper template, not a complete screen or an elapsed-time guarantee.
 */
const KBDS_PC = {
  templates: {
    fileKey: "2MavuzZhNpHpqer5fk3ML4", pageId: "2:278", sectionId: "2:286",
    view: "5:31", edit: "30:1871", confirmation: "30:3002"
  },
  components: {
    tableHeader: { key: "ba105a8f29acb712e5c5aa6a3cb2015de330f392" },
    tableCell: { key: "1b5a0ae0fefd157325271672a78224db2575f047" },
    tableItemTitle: { key: "23300554f76d678797b5bf90b60ba0932d0c64f8" },
    tableItemContent: { key: "90613469e713ec832541afff534a91aa3ad2a1d4" },
    tableItemNumberContent: { key: "1bbdaf1a6a84ca85cd1533529900f4374a68f080" },
    card: { key: "5c0de8b23aeaceaf9eb3def0d2845b6a97447773" },
    footer: { key: "bb4b7042c4ccc5742c5d51c3f5460ffec409ab63" },
    info: { key: "5fb7ce75dbc07c0aeca6e8cd5bfb876c0d0f7892" },
    primaryButton: { key: "d206f834d8d80e5bd6ab306b8033f3c0e5214bc5" },
    secondaryButton: { key: "09684c7d693d1049e961daf2bd7e53c3ef59319b" },
    disabledPrimary: { key: "b0ba19fc89ca0a02d51008a50d0f58ae39b356a0" },
    radioAffix: { key: "fd387ba8b08cad4c8101ac8b7d2e8a3742f89f23" },
    chevronRight: { key: "c583635d46aec2de5f463e4e4551034b4da5a7c5" },
    title20: { set: "57de5c3a24dde772d052456794e798783fc6a24f", variant: "variant=title, size=20" },
    title16: { set: "57de5c3a24dde772d052456794e798783fc6a24f", variant: "variant=title, size=16" },
    description: { key: "c47b8233c6063da6c1a828f8ddd8c90412a4aeac" },
    input: { key: "f689ed1a91c3666eab721996119a0b3540668190" },
    emptyInput: { key: "6a180f941f7bc12168489ec44f9203d0f3a4e7cc" },
    disabledInput: { key: "968fbf5fac3c58c4eda41005d26ac6a9b886add5" },
    radio: { key: "68b391ccaa9831d9da00db067160a4482484b1c5" },
    checkedRadio: { key: "66bb5a3ada46e42acc6d0d1f719ab2cf69a14640" },
    accordion: { key: "d14342b496bd3aa5d2e707cf26a183daf5d401ce" }
  },
  tokens: {
    fontBase: "add9bb3ae034f71f42290d2312acfa17bc5c5e86",
    fontNumeric: "4ee4b4adb360913d3e18e569a75b5f42642a1d29",
    gap2: "1efdb0abff61482e5e09332d5119346b53ac463f",
    gap8: "2277b8d1df86cdf8204cdac92209643941df242f",
    gap12: "f1822d95f1b0043e2ee435fea6d4725d37db3ebb",
    gap16: "2b90494af4b83af52e567824fc30afcec9447c32",
    padding20: "f338af7d20bc6e0583d08efdf7e7e389a325b1d0",
    gap24: "66fd0b70f3b70ba3c427cc46afb3ea70baf7680e",
    gap32: "403b2e3136ffc6d8206f6e63e2f62f235a5d3ae8",
    padding40: "9f3a6e1ca84e9627129a8315526a0ebd5bc65412",
    gap48: "0828de47528b32f0cd679d06a75e61169b841246",
    radius20: "8f274529260c1a703dfd211c49e01978e90e8d04"
  }
};

function classifyTextFont(value) {
  const text = String(value);
  return /\d/.test(text) && /^[\d\s()[\].,:+\-/*#]+$/.test(text) ? "Pretendard" : "KBFG Text";
}

async function prepareKbdsPc(figma, options = {}) {
  const components = new Map(), tokens = new Map(), sets = new Map();
  const loadedFonts = new Map();
  let availableFonts;
  const createdNodeIds = new Set(), mutatedNodeIds = new Set();
  const names = [...new Set(options.assets || [])];
  const tokenNames = [...new Set(options.tokens || [])];
  // Resolve all dependencies BEFORE creating the deliverable.
  await Promise.all(names.map(async name => {
    const spec = KBDS_PC.components[name];
    if (!spec) throw new Error("Unknown KBDS asset: " + name);
    let component;
    if (spec.set) {
      if (!sets.has(spec.set)) sets.set(spec.set, figma.importComponentSetByKeyAsync(spec.set));
      const set = await sets.get(spec.set);
      component = set.children.find(n => n.type === "COMPONENT" && n.name === spec.variant);
    } else component = await figma.importComponentByKeyAsync(spec.key);
    if (!component) throw new Error("KBDS variant unavailable: " + name);
    components.set(name, component);
  }));
  await Promise.all(tokenNames.map(async name => {
    const key = KBDS_PC.tokens[name];
    if (!key) throw new Error("Unknown KBDS token: " + name);
    tokens.set(name, await figma.variables.importVariableByKeyAsync(key));
  }));
  async function loadFont(font) {
    const key = JSON.stringify(font);
    if (!loadedFonts.has(key)) loadedFonts.set(key, figma.loadFontAsync(font).catch(e => { loadedFonts.delete(key); throw e; }));
    await loadedFonts.get(key);
  }
  async function loadFonts(root) {
    const texts = root.type === "TEXT" ? [root] : root.findAllWithCriteria({ types: ["TEXT"] });
    const fonts = new Map();
    for (const t of texts) for (const s of t.getStyledTextSegments(["fontName"])) fonts.set(JSON.stringify(s.fontName), s.fontName);
    await Promise.all([...fonts.values()].map(loadFont));
  }
  async function applyText(text, value) {
    if (text.type !== "TEXT" || typeof value !== "string" || !value.length) throw new Error("applyText needs a nonempty TEXT value");
    const family = classifyTextFont(value);
    const variable = tokens.get(family === "Pretendard" ? "fontNumeric" : "fontBase");
    if (!variable || variable.resolveForConsumer(text).value !== family) throw new Error("Prepare the matching font-family token before applying text");
    await loadFonts(text);
    if (typeof text.fontName !== "object" || !text.fontName.style) throw new Error("Mixed font styles require an explicit range edit");
    const target = { family, style: text.fontName.style };
    if (text.fontName.family !== family) {
      availableFonts ??= await figma.listAvailableFontsAsync();
      if (!availableFonts.some(f => f.fontName.family === target.family && f.fontName.style === target.style)) throw new Error("Verified target font style unavailable: " + JSON.stringify(target));
    }
    await loadFont(target);
    // fontName may clear family/weight aliases. Resolve them before editing and restore afterward.
    const weightAlias = [text.boundVariables?.fontWeight].flat().find(v => v?.id);
    const weight = weightAlias ? await figma.variables.getVariableByIdAsync(weightAlias.id) : null;
    text.characters = value;
    if (text.fontName.family !== family) text.fontName = target;
    if (weight) text.setBoundVariable("fontWeight", weight);
    text.setBoundVariable("fontFamily", variable);
    if (text.letterSpacing && text.letterSpacing.value === 0) literalZero(text, "letterSpacing");
    if (text.fontName.family !== family || !text.boundVariables?.fontFamily) throw new Error("Font-family application failed: " + text.id);
    mutatedNodeIds.add(text.id);
    return text;
  }
  function flag(instance, name, value) {
    const props = instance.componentProperties;
    const key = Object.keys(props).find(k => k.split("#")[0] === name);
    if (!key) throw new Error(instance.name + ": missing public property " + name);
    instance.setProperties({ [key]: props[key].type === "VARIANT" ? String(value) : value });
    mutatedNodeIds.add(instance.id);
  }
  function literalZero(node, field) {
    const letterUnit = field === "letterSpacing" ? node.letterSpacing.unit : null;
    node.setBoundVariable(field, null);
    if (field === "letterSpacing") {
      node.setRangeBoundVariable(0, node.characters.length, field, null);
      node.letterSpacing = { unit: letterUnit, value: 0 };
    } else node[field] = 0;
    mutatedNodeIds.add(node.id);
  }
  function numeric(node, field, value, tokenName) {
    if (value === 0) return literalZero(node, field);
    if (node.name === "## BODY" && field === "width") {
      if (value !== 1440 || node.width !== 1440) throw new Error("Size BODY to literal 1440 before binding other properties");
      node.setBoundVariable("width", null);
    } else {
      const variable = tokens.get(tokenName);
      if (!variable) throw new Error("Import the intended token before use: " + tokenName);
      if (variable.resolveForConsumer(node).value !== value) throw new Error("KBDS token/value mismatch: " + tokenName);
      node.setBoundVariable(field, variable);
    }
    mutatedNodeIds.add(node.id);
  }
  function frame(parent, name, gap = 0, gapToken, direction = "VERTICAL") {
    const n = figma.createAutoLayout(direction);
    n.name = name; n.fills = []; n.clipsContent = false;
    parent.appendChild(n);
    n.layoutSizingHorizontal = "FILL"; n.layoutSizingVertical = "HUG";
    numeric(n, "itemSpacing", gap, gapToken);
    createdNodeIds.add(n.id);
    return n;
  }
  async function instance(name, parent) {
    const main = components.get(name);
    if (!main) throw new Error("Asset not prepared in this call: " + name);
    const n = main.createInstance(); parent.appendChild(n);
    createdNodeIds.add(n.id);
    await loadFonts(n);
    n.clipsContent = false;
    if (["primaryButton", "secondaryButton", "disabledPrimary"].includes(name)) {
      flag(n, "hasPrefix", false); flag(n, "hasSuffix", false);
    }
    if (name === "card") for (const c of n.children) {
      if (c.type === "INSTANCE" && c.name === "Header / Affix") { c.visible = false; mutatedNodeIds.add(c.id); }
    }
    return n;
  }
  async function fillTextList(n, value) {
    await loadFonts(n);
    const texts = n.findAllWithCriteria({ types: ["TEXT"] });
    const content = texts.find(t => t.parent.id === n.id);
    const marker = texts.find(t => t.name === "Bullet");
    if (!content || !marker) throw new Error("Unsupported TextList structure; inspect before editing: " + n.id);
    content.characters = value;
    content.resize(Math.max(1, n.width - 12), content.height);
    content.textAutoResize = "HEIGHT"; content.layoutSizingHorizontal = "FILL";
    marker.characters = "•"; marker.textAutoResize = "WIDTH_AND_HEIGHT"; marker.layoutSizingHorizontal = "HUG";
    n.layoutSizingVertical = "HUG";
    mutatedNodeIds.add(n.id); mutatedNodeIds.add(content.id); mutatedNodeIds.add(marker.id);
  }
  function radioAffixInBody(card, body, affix) {
    for (const c of card.children) if (c.type === "INSTANCE" && c.name === "Header / Affix") {
      c.visible = false; mutatedNodeIds.add(c.id);
    }
    body.appendChild(affix); affix.resize(24, 24);
    affix.layoutPositioning = "AUTO";
    affix.layoutSizingHorizontal = "FIXED"; affix.layoutSizingVertical = "FIXED";
    mutatedNodeIds.add(body.id); mutatedNodeIds.add(affix.id);
  }
  function screenName(name, id) {
    if (!name || !name.trim()) throw new Error("Screen name required");
    return (id || "화면ID") + "_" + name;
  }
  async function audit(root, { requireFooter = true } = {}) {
    await loadFonts(root);
    const issues = [], nodes = [root, ...root.findAll(() => true)];
    const fields = ["itemSpacing", "counterAxisSpacing", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"];
    const issue = (n, field, problem) => issues.push({ id: n.id, field, problem });
    for (const n of nodes) {
      if ("clipsContent" in n && n.clipsContent) issue(n, "clipsContent", "must be false");
      if (["FRAME", "SLOT", "INSTANCE"].includes(n.type)) for (const p of fields) {
        if (typeof n[p] !== "number") continue;
        if (n[p] === 0 && n.boundVariables?.[p]) issue(n, p, "zero must be literal");
        if (n[p] !== 0 && !n.boundVariables?.[p]) issue(n, p, "missing numeric alias");
      }
      if (n.name === "## BODY" && (n.width !== 1440 || n.boundVariables?.width)) issue(n, "width", "BODY must be literal 1440");
      if (n.type === "TEXT") {
        if (n.hasMissingFont) issue(n, "fontName", "font unavailable after loading");
        if (n.getStyledTextSegments(["fontName"]).some(s => !/KBFG|Pretendard/.test(s.fontName.family))) issue(n, "fontName", "unexpected font family");
        for (const p of ["fontSize", "lineHeight", "fontWeight"]) if (!n.boundVariables?.[p]) issue(n, p, "missing typography alias");
        if (n.letterSpacing.value === 0 && n.boundVariables?.letterSpacing) issue(n, "letterSpacing", "zero must be literal");
        let visible = true;
        for (let p = n; p && p !== root; p = p.parent) if (p.visible === false) visible = false;
        if (visible && /^(ICON|MainText|타이틀입니다|텍스트영역)$/.test(n.characters)) issue(n, "characters", "default placeholder remains");
      }
    }
    if (requireFooter) {
      const footerArea = root.children.find(n => n.name === "## FOOTER");
      const footer = footerArea?.children.find(n => n.type === "INSTANCE");
      if (!footer || footer.mainComponent.key !== KBDS_PC.components.footer.key) issue(root, "Footer", "required instance missing");
    }
    const issueCounts = {};
    for (const item of issues) issueCounts[item.problem] = (issueCounts[item.problem] || 0) + 1;
    return { id: root.id, name: root.name, width: root.width, height: root.height, issueCount: issues.length, issueCounts, issues: issues.slice(0, 20), omittedIssueCount: Math.max(0, issues.length - 20) };
  }
  function evidence() { return { createdNodeIds: [...createdNodeIds], mutatedNodeIds: [...mutatedNodeIds] }; }
  return { components, tokens, loadFonts, applyText, flag, numeric, literalZero, frame, instance, fillTextList, radioAffixInBody, screenName, audit, evidence };
}

if (typeof module !== "undefined") module.exports = { KBDS_PC, prepareKbdsPc, classifyTextFont };
