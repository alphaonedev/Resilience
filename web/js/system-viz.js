/** Strategy → Tactic → Technique System visualizations */

const STS_COLORS = {
  strategy: '#10b981',
  tactic: '#3b82f6',
  system: '#8b5cf6',
  technique: '#f59e0b',
  phase: { 'Pre-Contact': '#10b981', 'Contact': '#f59e0b', 'Post-Contact / Exit': '#ef4444' }
};

function stsTierColor(tier) {
  return { 'A+': '#10b981', A: '#3b82f6', 'B+': '#8b5cf6', B: '#8b5cf6', C: '#f59e0b', D: '#ef4444' }[tier] || '#6b7280';
}

function renderSTSPyramid() {
  const el = document.getElementById('sts-pyramid');
  if (!el || !evidenceData?.stsFramework) return;
  const f = evidenceData.stsFramework;
  el.innerHTML = `
    <svg viewBox="0 0 500 340" class="sts-pyramid-svg" role="img" aria-label="Strategy Tactic Technique pyramid">
      <defs>
        <linearGradient id="gStrat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#059669"/></linearGradient>
        <linearGradient id="gTact" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#2563eb"/></linearGradient>
        <linearGradient id="gSys" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient>
        <linearGradient id="gTech" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/></linearGradient>
      </defs>
      <polygon points="250,20 420,120 80,120" fill="url(#gStrat)" opacity="0.9"/>
      <text x="250" y="55" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">STRATEGY</text>
      <text x="250" y="72" text-anchor="middle" fill="#d1fae5" font-size="9">${f.strategies.length} win conditions · Why you act</text>
      <polygon points="250,125 400,210 100,210" fill="url(#gTact)" opacity="0.9"/>
      <text x="250" y="155" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">TACTICS</text>
      <text x="250" y="172" text-anchor="middle" fill="#dbeafe" font-size="9">${f.tactics.length} mid-level moves · When & how</text>
      <polygon points="250,215 380,300 120,300" fill="url(#gSys)" opacity="0.9"/>
      <text x="250" y="245" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">TECHNIQUE SYSTEMS</text>
      <text x="250" y="262" text-anchor="middle" fill="#ede9fe" font-size="9">${f.techniqueSystems.length} trained bundles · What you practice</text>
      <rect x="120" y="305" width="260" height="28" rx="6" fill="url(#gTech)" opacity="0.9"/>
      <text x="250" y="323" text-anchor="middle" fill="#fff" font-size="11" font-weight="600">INDIVIDUAL TECHNIQUES (punches, kicks, subs)</text>
      <text x="250" y="338" text-anchor="middle" fill="#8b9cb8" font-size="8">Evidence strongest at top · Weakest at bottom for civilian survival</text>
    </svg>`;
}

function renderSTSFlowDiagram() {
  const el = document.getElementById('sts-flow');
  if (!el) return;
  const nodes = [
    { x: 60, y: 50, w: 100, h: 36, label: 'THREAT\nDETECTED', color: '#10b981', phase: 'Pre' },
    { x: 200, y: 50, w: 100, h: 36, label: 'CAN YOU\nLEAVE?', color: '#3b82f6', phase: 'Pre' },
    { x: 340, y: 30, w: 110, h: 36, label: 'YES → EXIT\n(Strategy: Avoid)', color: '#10b981' },
    { x: 340, y: 80, w: 110, h: 36, label: 'NO → ENGAGED', color: '#f59e0b' },
    { x: 200, y: 150, w: 100, h: 36, label: 'OUTNUMBERED?', color: '#3b82f6' },
    { x: 60, y: 130, w: 100, h: 36, label: 'RUN\n22% escape', color: '#10b981' },
    { x: 340, y: 150, w: 110, h: 36, label: '1v1 STANDING\nStrike burst', color: '#ef4444' },
    { x: 200, y: 230, w: 100, h: 36, label: 'GOING DOWN?', color: '#3b82f6' },
    { x: 60, y: 210, w: 100, h: 36, label: 'STAND UP\n41% recover', color: '#10b981' },
    { x: 340, y: 230, w: 110, h: 36, label: 'CONTROL ROLE?\nGrapple restrain', color: '#3b82f6' }
  ];
  const arrows = [
    [110, 68, 200, 68], [300, 50, 340, 48], [300, 78, 340, 88],
    [250, 86, 250, 150], [200, 168, 110, 148], [300, 168, 340, 168],
    [250, 186, 250, 230], [200, 248, 110, 228], [300, 248, 340, 248]
  ];
  let svg = `<svg viewBox="0 0 470 290" class="sts-flow-svg">`;
  arrows.forEach(([x1, y1, x2, y2]) => {
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2d3a52" stroke-width="2" marker-end="url(#arr2)"/>`;
  });
  svg += `<defs><marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#8b9cb8"/></marker></defs>`;
  nodes.forEach(n => {
    const lines = n.label.split('\n');
    svg += `<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="8" fill="${n.color}" opacity="0.85"/>`;
    lines.forEach((line, i) => {
      svg += `<text x="${n.x + n.w / 2}" y="${n.y + 16 + i * 12}" text-anchor="middle" fill="#fff" font-size="9" font-weight="${i === 0 ? 700 : 400}">${line}</text>`;
    });
  });
  svg += '</svg>';
  el.innerHTML = svg;
}

function renderStrategyRadarChart() {
  const ctx = document.getElementById('strategyRadarChart');
  if (!ctx || !evidenceData?.stsFramework) return;
  const dims = ['Avoidance', 'Evidence', 'Combat', 'Multi-Attacker'];
  const keys = ['avoidance', 'evidence', 'combat', 'multiAttacker'];
  const top = evidenceData.stsFramework.strategies
    .sort((a, b) => b.weightedScore - a.weightedScore)
    .slice(0, 5);
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: dims,
      datasets: top.map((s, i) => ({
        label: s.name.substring(0, 22),
        data: keys.map(k => s.scores[k]),
        borderColor: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][i],
        backgroundColor: `rgba(${i === 0 ? '16,185,129' : i === 1 ? '59,130,246' : i === 2 ? '139,92,246' : i === 3 ? '245,158,11' : '239,68,68'},0.12)`,
        borderWidth: 2
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { r: { min: 0, max: 10, ticks: { stepSize: 2 }, grid: { color: '#2d3a52' }, pointLabels: { font: { size: 10 } } } }
    }
  });
}

function renderStrategyBarChart() {
  const ctx = document.getElementById('strategyBarChart');
  if (!ctx || !evidenceData?.stsFramework) return;
  const s = [...evidenceData.stsFramework.strategies].sort((a, b) => b.weightedScore - a.weightedScore);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: s.map(x => x.name),
      datasets: [{
        label: 'Weighted evidence score',
        data: s.map(x => x.weightedScore),
        backgroundColor: s.map(x => stsTierColor(x.tier)),
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: { min: 0, max: 10, grid: { color: '#2d3a52' } }, y: { grid: { display: false } } }
    }
  });
}

function renderTacticPhaseChart() {
  const ctx = document.getElementById('tacticPhaseChart');
  if (!ctx || !evidenceData?.stsFramework) return;
  const phases = evidenceData.stsFramework.phases;
  const tactics = evidenceData.stsFramework.tactics;
  const counts = phases.map(p => tactics.filter(t => t.phase === p).length);
  const tierAvg = phases.map(p => {
    const ts = tactics.filter(t => t.phase === p);
    const tierScore = { 'A+': 5, A: 4, B: 3, C: 2, D: 1 };
    return ts.length ? ts.reduce((a, t) => a + (tierScore[t.tier] || 2), 0) / ts.length : 0;
  });
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: phases.map(p => p.replace(' / Exit', '')),
      datasets: [
        { label: 'Tactic count', data: counts, backgroundColor: phases.map(p => STS_COLORS.phase[p] || '#6b7280'), borderRadius: 6, yAxisID: 'y' },
        { label: 'Avg evidence tier (0–5)', data: tierAvg, backgroundColor: 'rgba(139,92,246,0.6)', borderRadius: 6, yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: { position: 'left', beginAtZero: true, title: { display: true, text: 'Count' } },
        y1: { position: 'right', min: 0, max: 5, grid: { drawOnChartArea: false } }
      }
    }
  });
}

function renderSystemCompareRadar() {
  const ctx = document.getElementById('systemCompareRadar');
  if (!ctx || !evidenceData?.stsFramework) return;
  const dims = ['Avoidance', 'Combat', 'Evidence', 'Breadth'];
  const keys = ['avoidance', 'combat', 'evidence', 'breadth'];
  const systems = evidenceData.stsFramework.techniqueSystems
    .sort((a, b) => b.scores.evidence - a.scores.evidence)
    .slice(0, 6);
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: dims,
      datasets: systems.map((s, i) => ({
        label: s.name.substring(0, 20),
        data: keys.map(k => s.scores[k]),
        borderColor: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'][i],
        backgroundColor: 'transparent',
        borderWidth: 2
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { r: { min: 0, max: 10, grid: { color: '#2d3a52' }, pointLabels: { font: { size: 10 } } } }
    }
  });
}

function renderSTSHierarchyMap() {
  const el = document.getElementById('sts-hierarchy-map');
  if (!el || !evidenceData?.stsFramework) return;
  const f = evidenceData.stsFramework;
  const stratMap = Object.fromEntries(f.strategies.map(s => [s.id, s]));
  let html = '';
  f.strategies.sort((a, b) => b.weightedScore - a.weightedScore).forEach(strat => {
    const systems = f.techniqueSystems.filter(sys => sys.strategy === strat.id || strat.systems?.includes(sys.id));
    const tactics = f.tactics.filter(t => t.strategy === strat.id || strat.tactics?.includes(t.id));
    html += `
      <div class="sts-tree-branch" style="--branch-color:${stsTierColor(strat.tier)}">
        <div class="sts-tree-strategy">
          <span class="sts-tree-badge">STRATEGY</span>
          <strong>${strat.name}</strong>
          <span class="tier tier-${strat.tier.replace('+', 'plus').toLowerCase()}">${strat.tier}</span>
          <span class="sts-tree-score">${strat.weightedScore}</span>
          <p>${strat.plainEnglish}</p>
        </div>
        <div class="sts-tree-children">
          <div class="sts-tree-col">
            <h4>Tactics (${tactics.length})</h4>
            ${tactics.map(t => `
              <div class="sts-tree-tactic" data-phase="${t.phase}">
                <span class="sts-phase-dot"></span>
                <span>${t.name}</span>
                <span class="tier tier-${t.tier.replace('+', 'plus').toLowerCase()}" style="font-size:0.65rem">${t.tier}</span>
              </div>`).join('')}
          </div>
          <div class="sts-tree-col">
            <h4>Technique Systems (${systems.length})</h4>
            ${systems.map(sys => `
              <div class="sts-tree-system">
                <span>${sys.name}</span>
                <div class="sts-sys-components">${sys.components.slice(0, 3).join(' · ')}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  });
  el.innerHTML = html;
}

function renderStrategyCards() {
  const el = document.getElementById('strategy-cards');
  if (!el || !evidenceData?.stsFramework) return;
  el.innerHTML = evidenceData.stsFramework.strategies
    .sort((a, b) => b.weightedScore - a.weightedScore)
    .map(s => `
      <div class="sts-card sts-card-strategy" style="--sts-color:${stsTierColor(s.tier)}">
        <div class="sts-card-type">Strategy</div>
        <h4>${s.name}</h4>
        <p class="sts-win"><strong>Win:</strong> ${s.winCondition}</p>
        <p class="sts-plain">${s.plainEnglish}</p>
        <p class="sts-evidence">${s.evidence}</p>
        <div class="sts-score-row">
          ${Object.entries(s.scores).map(([k, v]) => `<span>${k}: <strong>${v}</strong></span>`).join('')}
        </div>
      </div>`).join('');
}

function renderTacticCards() {
  const el = document.getElementById('tactic-cards');
  if (!el || !evidenceData?.stsFramework) return;
  const phases = evidenceData.stsFramework.phases;
  el.innerHTML = phases.map(phase => {
    const tactics = evidenceData.stsFramework.tactics.filter(t => t.phase === phase);
    return `
      <div class="sts-phase-group">
        <h4 class="sts-phase-title" style="color:${STS_COLORS.phase[phase]}">${phase}</h4>
        <div class="sts-tactic-grid">
          ${tactics.map(t => `
            <div class="sts-card sts-card-tactic">
              <span class="tier tier-${t.tier.replace('+', 'plus').toLowerCase()}">${t.tier}</span>
              <h5>${t.name}</h5>
              <p>${t.description}</p>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');
}

function renderSystemCards() {
  const el = document.getElementById('system-cards');
  if (!el || !evidenceData?.stsFramework) return;
  el.innerHTML = evidenceData.stsFramework.techniqueSystems
    .sort((a, b) => b.scores.evidence - a.scores.evidence)
    .map(sys => {
      const strat = evidenceData.stsFramework.strategies.find(s => s.id === sys.strategy);
      return `
        <div class="sts-card sts-card-system" style="--sts-color:${stsTierColor(sys.tier)}">
          <div class="sts-card-header">
            <span class="sts-card-type">System</span>
            <span class="tier tier-${sys.tier.replace('+', 'plus').toLowerCase()}">${sys.tier}</span>
          </div>
          <h4>${sys.name}</h4>
          <p class="sts-sys-type">${sys.type}</p>
          <p class="sts-strat-link">↳ Strategy: <strong>${strat?.name || sys.strategy}</strong></p>
          <ul class="sts-components">${sys.components.map(c => `<li>${c}</li>`).join('')}</ul>
          <div class="sts-score-bars">
            ${Object.entries(sys.scores).map(([k, v]) => `
              <div class="sts-mini-bar"><span>${k}</span><div class="sts-mini-track"><div class="sts-mini-fill" style="width:${v * 10}%"></div></div><span>${v}</span></div>`).join('')}
          </div>
          <p class="sts-hours">${sys.hours} training</p>
        </div>`;
    }).join('');
}

function renderSTSMatrix() {
  const el = document.getElementById('sts-matrix');
  if (!el || !evidenceData?.stsFramework) return;
  const systems = evidenceData.stsFramework.techniqueSystems;
  const strategies = evidenceData.stsFramework.strategies;
  let html = '<table class="sts-matrix-table"><thead><tr><th>System ↓ / Strategy →</th>';
  strategies.forEach(s => { html += `<th>${s.name.split(' ')[0]}…</th>`; });
  html += '</tr></thead><tbody>';
  systems.forEach(sys => {
    html += `<tr><td class="sys-name">${sys.name}</td>`;
    strategies.forEach(s => {
      const match = sys.strategy === s.id || s.systems?.includes(sys.id);
      html += `<td class="${match ? 'sts-match' : 'sts-no-match'}">${match ? '●' : '·'}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody></table>';
  el.innerHTML = html;
}

function renderAllSystemVisualizations() {
  if (!evidenceData?.stsFramework) return;
  renderSTSPyramid();
  renderSTSFlowDiagram();
  renderStrategyRadarChart();
  renderStrategyBarChart();
  renderTacticPhaseChart();
  renderSystemCompareRadar();
  renderSTSHierarchyMap();
  renderStrategyCards();
  renderTacticCards();
  renderSystemCards();
  renderSTSMatrix();
}