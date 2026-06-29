/** Technique SVG diagrams + Chart.js visualizations */

const TIER_COLORS = { 'A+': '#10b981', A: '#3b82f6', B: '#8b5cf6', C: '#f59e0b', D: '#ef4444' };
const CAT_COLORS = { striking: '#ef4444', kicking: '#f59e0b', grappling: '#3b82f6' };

const TECHNIQUE_SVG = {
  cross: `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="75" cy="28" r="8" fill="#8b9cb8"/><line x1="75" y1="36" x2="55" y2="70" stroke="#8b9cb8" stroke-width="3"/><line x1="55" y1="70" x2="45" y2="95" stroke="#8b9cb8" stroke-width="3"/><line x1="55" y1="70" x2="70" y2="95" stroke="#8b9cb8" stroke-width="3"/><line x1="55" y1="50" x2="95" y2="45" stroke="#ef4444" stroke-width="4" marker-end="url(#arr)"/><text x="98" y="48" fill="#ef4444" font-size="8">CROSS</text><defs><marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#ef4444"/></marker></defs></svg>`,
  hook: `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="40" cy="35" r="8" fill="#8b9cb8"/><line x1="40" y1="43" x2="55" y2="70" stroke="#8b9cb8" stroke-width="3"/><path d="M55 50 Q85 20 75 35" fill="none" stroke="#ef4444" stroke-width="4"/><text x="82" y="22" fill="#ef4444" font-size="8">HOOK</text></svg>`,
  jab: `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="35" cy="35" r="8" fill="#8b9cb8"/><line x1="35" y1="43" x2="50" y2="70" stroke="#8b9cb8" stroke-width="3"/><line x1="50" y1="55" x2="90" y2="50" stroke="#f59e0b" stroke-width="3"/><text x="92" y="53" fill="#f59e0b" font-size="8">JAB</text></svg>`,
  elbow: `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="50" cy="40" r="7" fill="#8b9cb8"/><circle cx="70" cy="42" r="7" fill="#6b7280"/><line x1="50" y1="47" x2="65" y2="65" stroke="#8b9cb8" stroke-width="3"/><line x1="65" y1="55" x2="78" y2="38" stroke="#ef4444" stroke-width="5"/><text x="80" y="35" fill="#ef4444" font-size="7">ELBOW</text></svg>`,
  'gyaku-zuki': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="30" cy="40" r="8" fill="#8b9cb8"/><line x1="30" y1="48" x2="55" y2="72" stroke="#8b9cb8" stroke-width="3"/><line x1="40" y1="72" x2="25" y2="95" stroke="#8b9cb8" stroke-width="3"/><line x1="55" y1="55" x2="95" y2="48" stroke="#8b5cf6" stroke-width="4"/><text x="70" y="42" fill="#8b5cf6" font-size="7">REVERSE</text></svg>`,
  palm: `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="40" cy="38" r="8" fill="#8b9cb8"/><line x1="50" y1="55" x2="88" y2="42" stroke="#f59e0b" stroke-width="4"/><rect x="86" y="36" width="10" height="12" rx="2" fill="#f59e0b" opacity="0.6"/><text x="70" y="30" fill="#f59e0b" font-size="7">PALM</text></svg>`,
  'chain-punch': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="35" cy="40" r="7" fill="#8b9cb8"/><line x1="45" y1="48" x2="55" y2="48" stroke="#6b7280" stroke-width="2"/><line x1="55" y1="48" x2="65" y2="48" stroke="#6b7280" stroke-width="2"/><line x1="65" y1="48" x2="75" y2="48" stroke="#6b7280" stroke-width="2"/><text x="40" y="70" fill="#6b7280" font-size="7">CHAIN</text></svg>`,
  'snap-punch': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="40" cy="40" r="7" fill="#8b9cb8"/><line x1="50" y1="52" x2="70" y2="50" stroke="#6b7280" stroke-width="2" stroke-dasharray="4"/><text x="35" y="75" fill="#6b7280" font-size="7">PULL SHORT</text></svg>`,
  'calf-kick': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="35" cy="30" r="7" fill="#8b9cb8"/><line x1="35" y1="38" x2="35" y2="75" stroke="#8b9cb8" stroke-width="3"/><line x1="35" y1="75" x2="30" y2="95" stroke="#8b9cb8" stroke-width="3"/><line x1="35" y1="75" x2="55" y2="95" stroke="#8b9cb8" stroke-width="3"/><circle cx="75" cy="75" r="7" fill="#6b7280"/><line x1="55" y1="55" x2="72" y2="72" stroke="#f59e0b" stroke-width="4"/><text x="78" y="78" fill="#f59e0b" font-size="7">CALF</text></svg>`,
  teep: `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="30" cy="35" r="7" fill="#8b9cb8"/><line x1="30" y1="43" x2="35" y2="70" stroke="#8b9cb8" stroke-width="3"/><line x1="35" y1="55" x2="85" y2="50" stroke="#f59e0b" stroke-width="3"/><line x1="85" y1="50" x2="95" y2="50" stroke="#f59e0b" stroke-width="6"/><text x="60" y="42" fill="#f59e0b" font-size="7">PUSH</text></svg>`,
  'roundhouse-body': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="35" cy="35" r="7" fill="#8b9cb8"/><path d="M35 55 Q70 30 75 60" fill="none" stroke="#f59e0b" stroke-width="4"/><circle cx="78" cy="58" r="6" fill="#6b7280"/><text x="55" y="25" fill="#f59e0b" font-size="7">ROUND</text></svg>`,
  'front-knee': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="35" cy="32" r="7" fill="#8b9cb8"/><line x1="35" y1="40" x2="38" y2="72" stroke="#8b9cb8" stroke-width="3"/><line x1="38" y1="55" x2="70" y2="58" stroke="#f59e0b" stroke-width="3"/><circle cx="72" cy="58" r="5" fill="#6b7280"/><text x="74" y="62" fill="#f59e0b" font-size="6">KNEE</text></svg>`,
  'roundhouse-head': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="35" cy="35" r="7" fill="#8b9cb8"/><path d="M38 58 Q75 15 72 32" fill="none" stroke="#ef4444" stroke-width="4"/><circle cx="72" cy="30" r="7" fill="#6b7280"/><text x="50" y="18" fill="#ef4444" font-size="7">HIGH</text></svg>`,
  'spinning-kick': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="50" cy="50" r="6" fill="#8b9cb8"/><path d="M50 50 Q30 20 80 25" fill="none" stroke="#6b7280" stroke-width="3" stroke-dasharray="3"/><line x1="50" y1="50" x2="85" y2="30" stroke="#ef4444" stroke-width="3"/><text x="35" y="80" fill="#6b7280" font-size="7">SPIN</text></svg>`,
  'double-leg': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="75" cy="28" r="7" fill="#6b7280"/><line x1="75" y1="35" x2="75" y2="70" stroke="#6b7280" stroke-width="3"/><circle cx="40" cy="55" r="7" fill="#8b9cb8"/><path d="M40 62 L55 85 L65 85 L48 62 Z" fill="none" stroke="#3b82f6" stroke-width="3"/><line x1="48" y1="62" x2="68" y2="78" stroke="#3b82f6" stroke-width="3"/><text x="25" y="45" fill="#3b82f6" font-size="7">DOUBLE</text></svg>`,
  rnc: `<svg viewBox="0 0 120 100" class="tech-svg"><ellipse cx="60" cy="55" rx="35" ry="20" fill="none" stroke="#2d3a52" stroke-width="2"/><circle cx="85" cy="48" r="7" fill="#8b9cb8"/><circle cx="45" cy="52" r="7" fill="#6b7280"/><path d="M78 48 Q60 38 48 52" fill="none" stroke="#3b82f6" stroke-width="3"/><text x="42" y="75" fill="#3b82f6" font-size="7">RNC</text></svg>`,
  'mount-gnp': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="60" cy="35" r="8" fill="#8b9cb8"/><ellipse cx="60" cy="68" rx="22" ry="12" fill="none" stroke="#6b7280" stroke-width="2"/><line x1="55" y1="42" x2="58" y2="58" stroke="#8b9cb8" stroke-width="3"/><line x1="58" y1="45" x2="58" y2="55" stroke="#ef4444" stroke-width="2"/><text x="42" y="88" fill="#3b82f6" font-size="7">MOUNT</text></svg>`,
  'side-control': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="75" cy="60" r="7" fill="#6b7280"/><circle cx="45" cy="55" r="7" fill="#8b9cb8"/><line x1="45" y1="55" x2="68" y2="58" stroke="#8b9cb8" stroke-width="4"/><line x1="55" y1="55" x2="55" y2="75" stroke="#3b82f6" stroke-width="2"/><text x="30" y="80" fill="#3b82f6" font-size="7">SIDE</text></svg>`,
  guillotine: `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="55" cy="32" r="7" fill="#6b7280"/><circle cx="45" cy="55" r="7" fill="#8b9cb8"/><path d="M45 48 Q55 35 58 42" fill="none" stroke="#3b82f6" stroke-width="4"/><text x="30" y="75" fill="#3b82f6" font-size="7">GUILL.</text></svg>`,
  'closed-guard': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="45" cy="42" r="7" fill="#8b9cb8"/><circle cx="70" cy="48" r="7" fill="#6b7280"/><path d="M45 55 Q58 75 70 55" fill="none" stroke="#3b82f6" stroke-width="3"/><text x="38" y="88" fill="#8b5cf6" font-size="7">GUARD</text></svg>`,
  'pull-guard': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="50" cy="70" r="7" fill="#8b9cb8"/><circle cx="75" cy="35" r="7" fill="#6b7280"/><line x1="50" y1="63" x2="68" y2="42" stroke="#ef4444" stroke-width="2" stroke-dasharray="3"/><text x="30" y="50" fill="#ef4444" font-size="6">PULL ↓</text></svg>`,
  'judo-throw': `<svg viewBox="0 0 120 100" class="tech-svg"><circle cx="40" cy="60" r="7" fill="#8b9cb8"/><circle cx="70" cy="35" r="7" fill="#6b7280"/><path d="M40 55 Q55 20 85 40" fill="none" stroke="#ef4444" stroke-width="3"/><text x="50" y="88" fill="#ef4444" font-size="7">THROW</text></svg>`
};

function scoreToPercent(score) { return (score / 5) * 100; }

function renderTechniqueBarChart(canvasId, techniques, color, label) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: techniques.map(t => t.name),
      datasets: [{
        label: `${label} effectiveness (0–5)`,
        data: techniques.map(t => t.score),
        backgroundColor: techniques.map(t => TIER_COLORS[t.tier] || color),
        borderRadius: 4,
        barThickness: 14
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            afterLabel: (item) => {
              const t = techniques[item.dataIndex];
              return [`Style: ${t.style}`, `Target: ${t.target}`, `Range: ${t.range}`, `Evidence: Tier ${t.tier}`];
            }
          }
        }
      },
      scales: {
        x: { min: 0, max: 5, ticks: { stepSize: 1 }, grid: { color: '#2d3a52' }, title: { display: true, text: 'Effectiveness score', color: '#8b9cb8' } },
        y: { grid: { display: false } }
      }
    }
  });
}

function renderTechniqueCompareChart() {
  const ctx = document.getElementById('techniqueCompareChart');
  if (!ctx || !evidenceData) return;
  const top = (arr, n = 4) => arr.slice(0, n);
  const s = top(evidenceData.strikingTechniques);
  const k = top(evidenceData.kickingTechniques);
  const g = top(evidenceData.grapplingTechniques);
  const labels = [...s, ...k, ...g].map(t => t.name.replace(/Boxing |Muay Thai |\s*\(.*\)/g, '').trim());
  const scores = [...s, ...k, ...g].map(t => t.score);
  const colors = [...s, ...k, ...g].map((t, i) => {
    if (i < s.length) return CAT_COLORS.striking;
    if (i < s.length + k.length) return CAT_COLORS.kicking;
    return CAT_COLORS.grappling;
  });
  new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Top techniques by category', data: scores, backgroundColor: colors, borderRadius: 6 }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Red = Strikes · Orange = Kicks · Blue = Grappling', color: '#8b9cb8', font: { size: 11 } }
      },
      scales: { y: { min: 0, max: 5, grid: { color: '#2d3a52' } }, x: { ticks: { maxRotation: 45, minRotation: 45, font: { size: 9 } } } }
    }
  });
}

function renderTechniqueBubbleChart() {
  const ctx = document.getElementById('techniqueBubbleChart');
  if (!ctx || !evidenceData) return;
  const all = [
    ...evidenceData.strikingTechniques.map(t => ({ ...t, cat: 'Strike', yKey: 'koPotential' })),
    ...evidenceData.kickingTechniques.map(t => ({ ...t, cat: 'Kick', yKey: 'koPotential' })),
    ...evidenceData.grapplingTechniques.map(t => ({ ...t, cat: 'Grapple', yKey: 'controlPotential' }))
  ];
  const datasets = ['Strike', 'Kick', 'Grapple'].map(cat => ({
    label: cat,
    data: all.filter(t => t.cat === cat).map(t => ({
      x: t.streetSafety,
      y: t[t.yKey] || t.score,
      r: 6 + t.score * 2,
      technique: t.name
    })),
    backgroundColor: cat === 'Strike' ? 'rgba(239,68,68,0.65)' : cat === 'Kick' ? 'rgba(245,158,11,0.65)' : 'rgba(59,130,246,0.65)',
    borderColor: cat === 'Strike' ? '#ef4444' : cat === 'Kick' ? '#f59e0b' : '#3b82f6'
  }));
  new Chart(ctx, {
    type: 'bubble',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: (c) => {
              const p = c.raw;
              return `${p.technique}: Safety ${p.x}/5, Power ${p.y}/5`;
            }
          }
        }
      },
      scales: {
        x: { min: -0.5, max: 5.5, title: { display: true, text: 'Street safety (higher = safer for you)', color: '#8b9cb8' }, grid: { color: '#2d3a52' } },
        y: { min: 0, max: 6, title: { display: true, text: 'KO / control potential', color: '#8b9cb8' }, grid: { color: '#2d3a52' } }
      }
    }
  });
}

function renderPunchStyleChart() {
  const ctx = document.getElementById('punchStyleChart');
  if (!ctx || !evidenceData) return;
  const punches = [
    { name: 'Boxing cross', force: 2500, validated: 5 },
    { name: 'Karate reverse', force: 2645, validated: 3 },
    { name: 'Boxing jab', force: 1800, validated: 5 },
    { name: 'Chain punch', force: 800, validated: 1 },
    { name: 'Snap punch', force: 600, validated: 0 }
  ];
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: punches.map(p => p.name),
      datasets: [
        { label: 'Lab peak force (N)', data: punches.map(p => p.force), backgroundColor: 'rgba(59,130,246,0.7)', yAxisID: 'y' },
        { label: 'Full-contact validation (0–5)', data: punches.map(p => p.validated), backgroundColor: 'rgba(16,185,129,0.7)', yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { title: { display: true, text: 'Force in lab ≠ proven in real fights', color: '#8b9cb8', font: { size: 11 } } },
      scales: {
        y: { position: 'left', title: { display: true, text: 'Newtons' }, grid: { color: '#2d3a52' } },
        y1: { position: 'right', min: 0, max: 5, grid: { drawOnChartArea: false } },
        x: { ticks: { font: { size: 9 } } }
      }
    }
  });
}

function renderTechniqueVisualGrid(containerId, techniques, category) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const catColor = CAT_COLORS[category];
  el.innerHTML = techniques.map(t => `
    <div class="tech-viz-card" style="--cat-color:${catColor}">
      <div class="tech-viz-diagram">${TECHNIQUE_SVG[t.id] || ''}</div>
      <div class="tech-viz-meta">
        <div class="tech-viz-header">
          <span class="tech-viz-rank">#${t.rank}</span>
          <span class="tech-viz-name">${t.name}</span>
          ${typeof tierBadge === 'function' ? tierBadge(t.tier) : ''}
        </div>
        <div class="tech-viz-bar"><div class="tech-viz-bar-fill" style="width:${scoreToPercent(t.score)}%"></div></div>
        <div class="tech-viz-tags">
          <span>${t.style}</span>
          <span>${t.range}</span>
          <span>→ ${t.target}</span>
        </div>
        <div class="tech-viz-scores">
          <span title="Effectiveness">Eff: <strong>${t.score}/5</strong></span>
          <span title="Street safety">Safe: <strong>${t.streetSafety}/5</strong></span>
          ${t.koPotential !== undefined ? `<span>KO: <strong>${t.koPotential}/5</strong></span>` : ''}
          ${t.controlPotential !== undefined ? `<span>Control: <strong>${t.controlPotential}/5</strong></span>` : ''}
        </div>
      </div>
    </div>`).join('');
}

function renderAllTechniqueVisualizations() {
  if (!evidenceData) return;
  renderTechniqueBarChart('strikingBarChart', evidenceData.strikingTechniques, CAT_COLORS.striking, 'Strike');
  renderTechniqueBarChart('kickingBarChart', evidenceData.kickingTechniques, CAT_COLORS.kicking, 'Kick');
  renderTechniqueBarChart('grapplingBarChart', evidenceData.grapplingTechniques, CAT_COLORS.grappling, 'Grapple');
  renderTechniqueCompareChart();
  renderTechniqueBubbleChart();
  renderPunchStyleChart();
  renderTechniqueVisualGrid('striking-viz-grid', evidenceData.strikingTechniques, 'striking');
  renderTechniqueVisualGrid('kicking-viz-grid', evidenceData.kickingTechniques, 'kicking');
  renderTechniqueVisualGrid('grappling-viz-grid', evidenceData.grapplingTechniques, 'grappling');
}