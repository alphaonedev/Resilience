/** Cooper Color Code — visual mental model reinforcement */

function getCooperData() {
  return evidenceData?.avoidanceAndAwareness?.situationalAwareness?.cooperColorCode;
}

function cooperLevelClass(id) {
  return `cooper-${id}`;
}

function renderCooperCompactStrip() {
  const c = getCooperData();
  const el = document.getElementById('cooper-compact-strip');
  if (!el || !c) return;
  el.innerHTML = `
    <div class="cooper-hero-head">
      <div class="cooper-hero-head-text">
        <h2 class="cooper-hero-title">Cooper Color Code</h2>
        <p class="cooper-hero-subtitle">Your brain's awareness traffic light — four mental settings that decide whether you see danger early or walk into it blind.</p>
        <p class="cooper-hero-metaphor">${c.trafficMetaphor}</p>
      </div>
      <div class="cooper-hero-badges">
        <span class="tier tier-c">Tier C habit</span>
        <span class="cooper-hero-origin">${c.origin}</span>
      </div>
    </div>

    <div class="cooper-hero-grid" role="list" aria-label="Cooper awareness levels">
      ${c.levels.map(l => `
        <article class="cooper-hero-card ${cooperLevelClass(l.id)}${l.isTarget ? ' cooper-hero-card-target' : ''}${l.id === 'white' ? ' cooper-hero-card-avoid' : ''}"
          role="listitem"
          style="--cooper-color:${l.hex};--cooper-bg:${l.bg};--cooper-border:${l.border};--cooper-bright:${l.hexBright}">
          <div class="cooper-hero-card-bar" aria-hidden="true"></div>
          <header class="cooper-hero-card-head">
            <span class="cooper-hero-swatch" aria-hidden="true"></span>
            <div>
              <h3 class="cooper-hero-card-name">${l.name}</h3>
              <p class="cooper-hero-card-mindset">${l.mindset}</p>
            </div>
            ${l.isTarget ? '<span class="cooper-hero-pill cooper-hero-pill-default">Your default</span>' : ''}
            ${l.id === 'white' ? '<span class="cooper-hero-pill cooper-hero-pill-avoid">Avoid</span>' : ''}
          </header>
          <p class="cooper-hero-card-body">${l.plainEnglish}</p>
          <p class="cooper-hero-card-action"><span class="cooper-hero-action-label">Do this</span> ${l.action}</p>
          ${l.aaaMap ? `<p class="cooper-hero-card-aaa"><span class="cooper-hero-aaa-label">Resilience</span> ${l.aaaMap}</p>` : ''}
        </article>`).join('')}
    </div>

    <div class="cooper-hero-flow" aria-label="Escalation path">
      <span class="cooper-hero-flow-label">Normal escalation</span>
      <div class="cooper-hero-flow-track">
        ${c.levels.filter(l => l.id !== 'white').map((l, i, arr) => `
          <span class="cooper-hero-flow-step ${cooperLevelClass(l.id)}" style="--cooper-color:${l.hex}">${l.name}</span>
          ${i < arr.length - 1 ? '<span class="cooper-hero-flow-arrow" aria-hidden="true">→</span>' : ''}`).join('')}
      </div>
      <span class="cooper-hero-flow-skip">Skip White entirely — wake up into <strong>Yellow</strong> every day.</span>
    </div>

    <footer class="cooper-hero-foot">
      <p class="cooper-hero-note"><strong>Evidence honest:</strong> ${c.honestNote}</p>
      <div class="cooper-hero-aaa-bridge">
        <span class="cooper-bridge-pill cooper-yellow">Yellow = Assess</span>
        <span class="cooper-bridge-arrow">→</span>
        <span class="cooper-bridge-pill cooper-orange">Orange = Acknowledge</span>
        <span class="cooper-bridge-arrow">→</span>
        <span class="cooper-bridge-pill cooper-red">Red = Act (leave first)</span>
      </div>
    </footer>`;
}

function renderCooperColorLadder() {
  const c = getCooperData();
  const el = document.getElementById('cooper-color-ladder');
  if (!el || !c) return;
  el.innerHTML = `
    <p class="cooper-ladder-intro">${c.trafficMetaphor}</p>
    <div class="cooper-ladder">
      ${c.levels.map((l, i) => `
        <article class="cooper-level-card ${cooperLevelClass(l.id)}${l.isTarget ? ' cooper-level-target' : ''}"
          style="--cooper-color:${l.hex};--cooper-bg:${l.bg};--cooper-border:${l.border};--cooper-bright:${l.hexBright}">
          <div class="cooper-level-rail">
            <div class="cooper-level-swatch" aria-hidden="true"></div>
            ${i < c.levels.length - 1 ? '<div class="cooper-level-connector"></div>' : ''}
          </div>
          <div class="cooper-level-body">
            <header class="cooper-level-header">
              <h4 class="cooper-level-name">${l.name}</h4>
              ${l.isTarget ? '<span class="cooper-default-pill">Live here daily</span>' : ''}
              ${l.id === 'white' ? '<span class="cooper-avoid-pill">Avoid</span>' : ''}
            </header>
            <p class="cooper-level-mindset">${l.mindset}</p>
            <p class="cooper-level-text">${l.plainEnglish}</p>
            <p class="cooper-level-action"><strong>Do:</strong> ${l.action}</p>
            ${l.aaaMap ? `<p class="cooper-level-map"><strong>Resilience:</strong> ${l.aaaMap}</p>` : ''}
            ${l.resilienceSection ? `<p class="cooper-level-section">${l.resilienceSection}</p>` : ''}
          </div>
        </article>`).join('')}
    </div>`;
}

function renderCooperSystemMap() {
  const c = getCooperData();
  const el = document.getElementById('cooper-system-map');
  if (!el || !c?.systemMap) return;
  const levelById = Object.fromEntries(c.levels.map(l => [l.id, l]));
  const layerHints = {
    yellow: 'Your everyday setting — calm scanning, not paranoia.',
    orange: 'Gut tightens — name the threat and plan your exit.',
    red: 'Seconds count — leave, run, or burst only if trapped.',
    white: 'The state predators prefer — do not live here.'
  };
  el.innerHTML = `
    <div class="cooper-map-head">
      <h4>How the whole site maps to Cooper colors</h4>
      <p class="chart-explainer">Every section on Resilience fits a mental color. Train <strong>Yellow</strong> daily; escalate only when the situation demands it — never skip straight to fighting.</p>
    </div>
    <div class="cooper-system-grid">
      ${c.systemMap.map(row => {
        const lv = levelById[row.color];
        return `
          <article class="cooper-system-card ${cooperLevelClass(row.color)}"
            style="--cooper-color:${lv?.hex};--cooper-bg:${lv?.bg};--cooper-border:${lv?.border};--cooper-bright:${lv?.hexBright}">
            <div class="cooper-system-card-top">
              <span class="cooper-system-swatch-lg" aria-hidden="true"></span>
              <div>
                <span class="cooper-system-color-label">${lv?.name} condition</span>
                <h5 class="cooper-system-layer">${row.layer}</h5>
              </div>
            </div>
            <p class="cooper-system-hint">${layerHints[row.color] || ''}</p>
            <p class="cooper-system-mindset">${lv?.mindset}</p>
            <ul class="cooper-system-list">${row.systems.map(s => `<li>${s}</li>`).join('')}</ul>
          </article>`;
      }).join('')}
    </div>`;
}

function renderCooperAwarenessCards() {
  const c = getCooperData();
  const el = document.getElementById('cooper-awareness-cards');
  if (!el || !c) return;
  const yellow = c.levels.find(l => l.id === 'yellow');
  el.innerHTML = `
    <div class="card cooper-card cooper-yellow" style="--cooper-color:${yellow.hex};--cooper-bg:${yellow.bg};--cooper-border:${yellow.border}">
      <div class="cooper-card-bar"></div>
      <h3>Cooper Color Code <span class="tier tier-c">Tier C</span></h3>
      <p><strong>In plain English:</strong> A mental checklist for staying switched on. Excellent habit. Not proven in a civilian trial.</p>
      <div class="cooper-card-mini-ladder">
        ${c.levels.map(l => `<span class="cooper-mini-pill ${cooperLevelClass(l.id)}" style="--cooper-color:${l.hex};--cooper-border:${l.border}">${l.name}</span>`).join('')}
      </div>
    </div>`;
}

function applyCooperWinRateRows() {
  const rows = document.querySelectorAll('.win-rate-table tbody tr[data-cooper]');
  const c = getCooperData();
  if (!c) return;
  const levelById = Object.fromEntries(c.levels.map(l => [l.id, l]));
  rows.forEach(tr => {
    const id = tr.dataset.cooper;
    const lv = levelById[id];
    if (lv) {
      tr.style.setProperty('--cooper-row-color', lv.hex);
      tr.style.setProperty('--cooper-row-bg', lv.bg);
      tr.classList.add('cooper-win-row', cooperLevelClass(id));
    }
  });
}

function renderAllCooperColorVisualizations() {
  if (!getCooperData()) return;
  renderCooperCompactStrip();
  renderCooperColorLadder();
  renderCooperSystemMap();
  renderCooperAwarenessCards();
  applyCooperWinRateRows();
}