/**
 * AURA BOTANICA — PHASE 3 AUTOMATED MOTION & GSAP TEST SUITE
 * Tests:
 * 1. animations=off produces zero motion & no hidden content (.js-anim omitted)
 * 2. prefers-reduced-motion eliminates spatial translation (opacity fade only)
 * 3. Section lifecycle (shopify:section:unload / load) kills triggers & tweens with zero memory leaks
 * 4. Declarative attributes API coverage (12 types + modifiers)
 * 5. Settings schema and presets parity
 * 6. Script tag defer and ordering in theme.liquid
 */

const fs = require('fs');
const path = require('path');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failCount++;
  }
}

console.log('====================================================');
console.log('--- AURA BOTANICA PHASE 3 GSAP MOTION TEST SUITE ---');
console.log('====================================================\n');

// ----------------------------------------------------
// TEST 1: Inspect Settings Schema & Data
// ----------------------------------------------------
console.log('1. Validating Animation Settings in Schema & Data:');
const schema = JSON.parse(fs.readFileSync('config/settings_schema.json', 'utf8'));
const animGroup = schema.find(g => g.name === 'Animations');
assert(animGroup !== undefined, 'Settings schema contains "Animations" group');

const requiredSettingIds = [
  'animation_enable',
  'animation_intensity',
  'animation_smooth_scroll',
  'animation_custom_cursor',
  'page_transition',
  'animation_magnetic_buttons',
  'animation_image_hover_zoom',
  'animation_text_mask_reveal'
];

requiredSettingIds.forEach(id => {
  const setting = animGroup.settings.find(s => s.id === id);
  assert(setting !== undefined, `Animations group contains setting "${id}"`);
});

const settingsData = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));
const currentSettings = settingsData.current;
assert(currentSettings.animation_enable !== undefined, 'settings_data.json current has animation_enable defined');
assert(currentSettings.animation_intensity !== undefined, 'settings_data.json current has animation_intensity defined');
assert(currentSettings.animation_magnetic_buttons !== undefined, 'settings_data.json current has animation_magnetic_buttons defined');

// ----------------------------------------------------
// TEST 2: Validating Script Loading in theme.liquid
// ----------------------------------------------------
console.log('\n2. Validating Script Loading in layout/theme.liquid:');
const themeLiquid = fs.readFileSync('layout/theme.liquid', 'utf8');

assert(themeLiquid.includes('window.AuraSettings ='), 'theme.liquid injects window.AuraSettings');
assert(themeLiquid.includes("settings.animations != 'off'"), 'theme.liquid checks settings.animations != "off"');

const gsapIdx = themeLiquid.indexOf("gsap.min.js' | asset_url");
const stIdx = themeLiquid.indexOf("ScrollTrigger.min.js' | asset_url");
const splitIdx = themeLiquid.indexOf("SplitText.min.js' | asset_url");
const motionIdx = themeLiquid.indexOf("aura-motion.js' | asset_url");

assert(gsapIdx !== -1, 'theme.liquid loads gsap.min.js');
assert(stIdx !== -1, 'theme.liquid loads ScrollTrigger.min.js');
assert(splitIdx !== -1, 'theme.liquid loads SplitText.min.js');
assert(motionIdx !== -1, 'theme.liquid loads aura-motion.js');

assert(gsapIdx < stIdx, 'gsap.min.js is loaded before ScrollTrigger.min.js');
assert(stIdx < splitIdx, 'ScrollTrigger.min.js is loaded before SplitText.min.js');
assert(splitIdx < motionIdx, 'Plugins are loaded before aura-motion.js');

assert(themeLiquid.includes('<script src="{{ \'gsap.min.js\' | asset_url }}" defer="defer"></script>'), 'gsap.min.js has defer attribute');
assert(themeLiquid.includes('<script src="{{ \'aura-motion.js\' | asset_url }}" defer="defer"></script>'), 'aura-motion.js has defer attribute');

// ----------------------------------------------------
// TEST 3: Static Engine Analysis (aura-motion.js)
// ----------------------------------------------------
console.log('\n3. Validating aura-motion.js Declarative API & Handlers:');
const engineCode = fs.readFileSync('assets/aura-motion.js', 'utf8');

const animTypes = [
  'fade-up',
  'fade-in',
  'slide-left',
  'slide-right',
  'scale-in',
  'clip-reveal',
  'mask-lines',
  'stagger-children',
  'parallax',
  'counter',
  'marquee',
  'pin'
];

animTypes.forEach(type => {
  assert(engineCode.includes(`case "${type}":`) || engineCode.includes(`"${type}"`), `Engine implements declarative type "${type}"`);
});

assert(engineCode.includes('dataset.animDelay'), 'Engine supports data-anim-delay');
assert(engineCode.includes('dataset.animDuration'), 'Engine supports data-anim-duration');
assert(engineCode.includes('dataset.animStagger'), 'Engine supports data-anim-stagger');
assert(engineCode.includes('prefers-reduced-motion'), 'Engine inspects prefers-reduced-motion');
assert(engineCode.includes('shopify:section:load'), 'Engine listens to shopify:section:load');
assert(engineCode.includes('shopify:section:unload'), 'Engine listens to shopify:section:unload');
assert(engineCode.includes('ScrollTrigger.refresh()'), 'Engine refreshes ScrollTrigger on resize/load');

// ----------------------------------------------------
// TEST 4: Behavioral Simulation of Motion Engine
// ----------------------------------------------------
console.log('\n4. Running Behavioral Motion Engine Simulation:');

// Mock DOM & GSAP environment
class MockElement {
  constructor(tagName = 'div', dataset = {}) {
    this.tagName = tagName.toUpperCase();
    this.dataset = Object.assign({}, dataset);
    this.classList = new Set();
    this.style = {};
    this.children = [];
    this.parentNode = null;
    this.textContent = '';
    this.listeners = {};
  }
  getAttribute(name) { return this.dataset[name.replace(/^data-/, '')]; }
  setAttribute(name, val) { this.dataset[name.replace(/^data-/, '')] = val; }
  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
  }
  insertBefore(newEl, refEl) {
    const idx = this.children.indexOf(refEl);
    if (idx !== -1) {
      newEl.parentNode = this;
      this.children.splice(idx, 0, newEl);
    } else {
      this.appendChild(newEl);
    }
  }
  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }
  removeEventListener(evt, fn) {
    if (!this.listeners[evt]) return;
    this.listeners[evt] = this.listeners[evt].filter(f => f !== fn);
  }
  querySelectorAll(sel) {
    const results = [];
    function scan(node) {
      node.children.forEach(c => {
        if (sel === '[data-anim]' && c.dataset.anim) results.push(c);
        else if (sel === '[data-anim-child]' && c.dataset.animChild !== undefined) results.push(c);
        else if (sel === '[data-anim-initialized]' && c.dataset.animInitialized) results.push(c);
        scan(c);
      });
    }
    scan(this);
    return results;
  }
  querySelector(sel) {
    const all = this.querySelectorAll(sel);
    return all.length ? all[0] : null;
  }
  getBoundingClientRect() {
    return { left: 0, top: 0, width: 100, height: 40 };
  }
}

// 4A: Simulation with animations=off
console.log('\n  [Scenario A: Master Animation Disabled (animation_enable = false)]');
{
  const mockDocEl = {
    classList: {
      added: [],
      removed: [],
      add(cls) { this.added.push(cls); },
      remove(cls) { this.removed.push(cls); },
      contains(cls) { return this.added.includes(cls) && !this.removed.includes(cls); }
    }
  };

  const createdTweens = [];
  const mockGsap = {
    registerPlugin: () => {},
    fromTo: (target, from, to) => {
      const tw = { target, from, to, killed: false, kill() { this.killed = true; } };
      createdTweens.push(tw);
      return tw;
    },
    to: (target, to) => {
      const tw = { target, to, killed: false, kill() { this.killed = true; } };
      createdTweens.push(tw);
      return tw;
    },
    matchMedia: () => ({ add: () => {} })
  };

  const mockWindow = {
    matchMedia: () => ({ matches: false }),
    AuraSettings: { animation_enable: false, animation_intensity: 'off' },
    addEventListener: () => {},
    gsap: mockGsap
  };
  const mockDocument = {
    documentElement: mockDocEl,
    addEventListener: () => {},
    readyState: 'complete',
    querySelectorAll: () => []
  };

  const fn = new Function('window', 'document', engineCode);
  fn(mockWindow, mockDocument);

  assert(!mockDocEl.classList.contains('js-anim'), 'When animation is disabled, .js-anim class is NOT added to <html>');
  assert(createdTweens.length === 0, 'When animation is disabled, zero tweens are created');
}

// 4B: Simulation with prefers-reduced-motion: reduce
console.log('\n  [Scenario B: Accessibility prefers-reduced-motion: reduce]');
{
  const mockDocEl = {
    classList: {
      added: [],
      removed: [],
      add(cls) { this.added.push(cls); },
      remove(cls) { this.removed.push(cls); },
      contains(cls) { return this.added.includes(cls) && !this.removed.includes(cls); }
    }
  };

  const createdTweens = [];
  const mockGsap = {
    registerPlugin: () => {},
    fromTo: (target, from, to) => {
      const tw = { target, from, to, killed: false, kill() { this.killed = true; } };
      createdTweens.push(tw);
      return tw;
    },
    to: (target, to) => {
      const tw = { target, to, killed: false, kill() { this.killed = true; } };
      createdTweens.push(tw);
      return tw;
    },
    matchMedia: () => ({ add: () => {} })
  };

  const mockWindow = {
    matchMedia: query => ({ matches: query.includes('prefers-reduced-motion') }),
    AuraSettings: { animation_enable: true, animation_intensity: 'subtle' },
    addEventListener: () => {},
    gsap: mockGsap
  };

  const testRoot = new MockElement('div');
  const animEl1 = new MockElement('h2', { anim: 'fade-up' });
  const animEl2 = new MockElement('p', { anim: 'slide-left' });
  const animEl3 = new MockElement('ul', { anim: 'stagger-children' });
  const childItem = new MockElement('li');
  animEl3.appendChild(childItem);

  testRoot.appendChild(animEl1);
  testRoot.appendChild(animEl2);
  testRoot.appendChild(animEl3);

  const mockDocument = {
    documentElement: mockDocEl,
    addEventListener: () => {},
    readyState: 'complete',
    querySelectorAll: sel => testRoot.querySelectorAll(sel)
  };

  const fn = new Function('window', 'document', engineCode);
  fn(mockWindow, mockDocument);

  assert(mockWindow.AuraMotion !== undefined, 'AuraMotion namespace is exposed on window');
  
  // Initialize testRoot
  mockWindow.AuraMotion.init(testRoot);

  assert(createdTweens.length === 3, 'Created 3 tweens for test elements in reduced-motion mode');
  
  let spatialTranslationsDetected = 0;
  createdTweens.forEach((tw, i) => {
    if (tw.from.y !== undefined && tw.from.y !== 0) spatialTranslationsDetected++;
    if (tw.from.x !== undefined && tw.from.x !== 0) spatialTranslationsDetected++;
    if (tw.from.scale !== undefined && tw.from.scale !== 1) spatialTranslationsDetected++;
    if (tw.from.clipPath !== undefined) spatialTranslationsDetected++;
  });

  assert(spatialTranslationsDetected === 0, 'Zero spatial translations (x, y, scale, clipPath) when prefers-reduced-motion is active');
  assert(createdTweens.every(tw => tw.to.opacity === 1), 'All tweens in reduced-motion mode perform pure opacity fade only');
}

// 4C: Simulation of Shopify Section Unload / Reload Lifecycle & Zero Leaks
console.log('\n  [Scenario C: Section Lifecycle Teardown & Zero Memory Leaks]');
{
  const mockDocEl = {
    classList: {
      added: [],
      removed: [],
      add(cls) { this.added.push(cls); },
      remove(cls) { this.removed.push(cls); },
      contains(cls) { return this.added.includes(cls) && !this.removed.includes(cls); }
    }
  };

  const createdTweens = [];
  const createdTriggers = [];

  const mockGsap = {
    registerPlugin: () => {},
    fromTo: (target, from, to) => {
      const tw = { target, from, to, killed: false, kill() { this.killed = true; } };
      createdTweens.push(tw);
      return tw;
    },
    to: (target, to) => {
      const tw = { target, to, killed: false, kill() { this.killed = true; } };
      createdTweens.push(tw);
      return tw;
    },
    matchMedia: () => ({ add: () => {} })
  };

  const mockScrollTrigger = {
    create: opts => {
      const trig = { opts, killed: false, kill() { this.killed = true; } };
      createdTriggers.push(trig);
      return trig;
    },
    refresh: () => {}
  };

  const mockWindow = {
    matchMedia: () => ({ matches: false }),
    AuraSettings: { animation_enable: true, animation_intensity: 'subtle' },
    addEventListener: () => {},
    gsap: mockGsap,
    ScrollTrigger: mockScrollTrigger
  };

  const sectionEl = new MockElement('section', { sectionId: 'template--12345' });
  const card1 = new MockElement('div', { anim: 'fade-up' });
  const card2 = new MockElement('div', { anim: 'fade-up' });
  const parallaxImg = new MockElement('img', { anim: 'parallax' });

  sectionEl.appendChild(card1);
  sectionEl.appendChild(card2);
  sectionEl.appendChild(parallaxImg);

  const mockDocument = {
    documentElement: mockDocEl,
    addEventListener: () => {},
    readyState: 'complete',
    querySelectorAll: () => []
  };

  const fn = new Function('window', 'document', engineCode);
  fn(mockWindow, mockDocument);

  // 1. Initialize Section
  mockWindow.AuraMotion.init(sectionEl);
  assert(createdTweens.length === 2, 'Section init creates 2 tweens for fade-up cards');
  assert(createdTriggers.length === 1, 'Section init creates 1 trigger for parallax image');
  assert(card1.dataset.animInitialized === 'true', 'Elements marked with data-anim-initialized = "true"');

  // 2. Kill / Unload Section
  mockWindow.AuraMotion.kill(sectionEl);

  const allTweensKilled = createdTweens.every(tw => tw.killed === true);
  const allTriggersKilled = createdTriggers.every(trig => trig.killed === true);

  assert(allTweensKilled, 'On section unload, all GSAP tweens are killed cleanly');
  assert(allTriggersKilled, 'On section unload, all ScrollTriggers are killed cleanly');
  assert(card1.dataset.animInitialized === undefined, 'data-anim-initialized flag is stripped on unload');

  // 3. Re-initialize Section (Simulate Theme Editor reload)
  createdTweens.length = 0;
  createdTriggers.length = 0;
  mockWindow.AuraMotion.init(sectionEl);

  assert(createdTweens.length === 2, 'Section re-init cleanly creates fresh tweens without conflict');
  assert(card1.dataset.animInitialized === 'true', 'Section re-init restores initialized flags');
}

// ----------------------------------------------------
// TEST 5: Verify CSS No-JS & Reduced Motion Safety
// ----------------------------------------------------
console.log('\n5. Validating CSS No-JS and Pre-GSAP Safety in assets/aura-base.css:');
const baseCss = fs.readFileSync('assets/aura-base.css', 'utf8');

assert(baseCss.includes('.js-anim [data-anim="fade-up"]'), 'Initial hidden states are scoped under .js-anim');
assert(!baseCss.includes('\n[data-anim="fade-up"] { opacity: 0'), 'Hidden states are NEVER unscoped (prevents No-JS blank screen)');
assert(baseCss.includes('@media (prefers-reduced-motion: reduce)'), 'CSS includes @media (prefers-reduced-motion: reduce)');
assert(baseCss.includes('transform: none !important;'), 'CSS forces transform: none !important for reduced-motion');

console.log('\n====================================================');
console.log(`TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('====================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('All Phase 3 motion engine automated verification checks passed with 100% success!\n');
}
