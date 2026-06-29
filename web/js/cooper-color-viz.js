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
    <div class="cooper-strip-header">
      <span class="cooper-strip-title">Cooper Color Code</span>
      <span class="tier tier-c">Tier C habit</span>
      <span class="cooper-strip-hint">Your brain's awareness traffic light</span>
    </div>
    <div class="cooper-strip-ladder" role="list" aria-label="Cooper awareness levels">
      ${c.levels.map(l => `
        <div class="cooper-strip-node ${cooperLevelClass(l.id)}${l.isTarget ? ' cooper-strip-target' : ''}" role="listitem"
          style="--cooper-color:${l.hex};--cooper-bg:${l.bg};--cooper-border:${l.border}"
          title="${l.mindset}">
          <span class="cooper-strip-dot"></span>
          <span class="cooper-strip-name">${l.name}</span>
          ${l.isTarget ? '<span class="cooper-strip-badge">DEFAULT</span>' : ''}
        </div>`).join('<span class="cooper-strip-arrow" aria-hidden="true">→</span>')}
    </div>
    <p class="cooper-strip-foot">${c.honestNote}</p>`;
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
  el.innerHTML = `
    <h4>How the whole site maps to Cooper colors</h4>
    <p class="chart-explainer">Every section on Resilience fits a mental color. Train Yellow daily; escalate only when the situation demands it.</p>
    <div class="cooper-system-grid">
      ${c.systemMap.map(row => {
        const lv = levelById[row.color];
        return `
          <div class="cooper-system-row ${cooperLevelClass(row.color)}"
            style="--cooper-color:${lv?.hex};--cooper-bg:${lv?.bg};--cooper-border:${lv?.border}">
            <div class="cooper-system-swatch"></div>
            <div>
              <strong class="cooper-system-layer">${row.layer}</strong>
              <span class="cooper-system-color-label">${lv?.name}</span>
              <ul class="cooper-system-list">${row.systems.map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
          </div>`;
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