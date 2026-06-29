/** Fight science — force, knockouts, reaction time, range, ground physics */

const FS_COLORS = { linear: '#3b82f6', rotational: '#ef4444', ground: '#8b5cf6', force: '#f59e0b' };

const FIGHT_SCIENCE_SVG = {
  kineticChain: `<svg viewBox="0 0 480 140" class="fs-svg" role="img" aria-label="Kinetic chain">
    <text x="240" y="16" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="700">KINETIC CHAIN — FLOOR TO FIST</text>
    <circle cx="40" cy="70" r="22" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="2"/>
    <text x="40" y="68" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="700">FOOT</text>
    <text x="40" y="78" text-anchor="middle" fill="#8b9cb8" font-size="6">push</text>
    <line x1="62" y1="70" x2="98" y2="70" stroke="#f59e0b" stroke-width="2" marker-end="url(#fsA)"/>
    <circle cx="120" cy="70" r="22" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="2"/>
    <text x="120" y="68" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="700">HIP</text>
    <text x="120" y="78" text-anchor="middle" fill="#8b9cb8" font-size="6">40-50%</text>
    <line x1="142" y1="70" x2="178" y2="70" stroke="#f59e0b" stroke-width="2" marker-end="url(#fsA)"/>
    <circle cx="200" cy="70" r="22" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="2"/>
    <text x="200" y="68" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="700">TORSO</text>
    <line x1="222" y1="70" x2="258" y2="70" stroke="#f59e0b" stroke-width="2" marker-end="url(#fsA)"/>
    <circle cx="280" cy="70" r="22" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="2"/>
    <text x="280" y="68" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="700">SHOULDER</text>
    <line x1="302" y1="70" x2="338" y2="70" stroke="#f59e0b" stroke-width="2" marker-end="url(#fsA)"/>
    <circle cx="360" cy="70" r="22" fill="rgba(239,68,68,0.25)" stroke="#ef4444" stroke-width="2"/>
    <text x="360" y="68" text-anchor="middle" fill="#ef4444" font-size="7" font-weight="700">FIST</text>
    <text x="360" y="78" text-anchor="middle" fill="#8b9cb8" font-size="6">2-3kN</text>
    <line x1="382" y1="70" x2="430" y2="70" stroke="#ef4444" stroke-width="3" marker-end="url(#fsR)"/>
    <circle cx="450" cy="70" r="14" fill="#6b7280"/>
    <text x="450" y="74" text-anchor="middle" fill="#fff" font-size="6">JAW</text>
    <text x="240" y="125" text-anchor="middle" fill="#8b9cb8" font-size="8">Impulse = effective mass × Δvelocity — arm-only punches leak most of the chain</text>
    <defs>
      <marker id="fsA" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#f59e0b"/></marker>
      <marker id="fsR" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#ef4444"/></marker>
    </defs>
  </svg>`,
  knockout: `<svg viewBox="0 0 400 200" class="fs-svg" role="img" aria-label="Knockout mechanics">
    <text x="200" y="16" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">KNOCKOUT = RAPID HEAD ACCELERATION</text>
    <circle cx="100" cy="90" r="30" fill="none" stroke="#8b9cb8" stroke-width="2"/>
    <text x="100" y="88" text-anchor="middle" fill="#3b82f6" font-size="8">LINEAR</text>
    <text x="100" y="100" text-anchor="middle" fill="#8b9cb8" font-size="7">straight shot</text>
    <line x1="55" y1="90" x2="25" y2="90" stroke="#3b82f6" stroke-width="4" marker-end="url(#fsB)"/>
    <text x="100" y="135" text-anchor="middle" fill="#8b9cb8" font-size="7">70-100G linear</text>
    <circle cx="300" cy="90" r="30" fill="none" stroke="#8b9cb8" stroke-width="2"/>
    <text x="300" y="88" text-anchor="middle" fill="#ef4444" font-size="8">ROTATION</text>
    <text x="300" y="100" text-anchor="middle" fill="#8b9cb8" font-size="7">hook / fall</text>
    <path d="M270 90 Q300 50 330 90" fill="none" stroke="#ef4444" stroke-width="3" marker-end="url(#fsR2)"/>
    <text x="300" y="135" text-anchor="middle" fill="#ef4444" font-size="7">worse KO correlation</text>
    <rect x="30" y="155" width="340" height="36" rx="6" fill="#1a2332" stroke="#2d3a52"/>
    <text x="200" y="170" text-anchor="middle" fill="#8b9cb8" font-size="8">Brainstem shear — not 'hurt enough'</text>
    <text x="200" y="184" text-anchor="middle" fill="#10b981" font-size="7">64% street KOs in first 10 sec (n=154)</text>
    <defs><marker id="fsB" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#3b82f6"/></marker><marker id="fsR2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#ef4444"/></marker></defs>
  </svg>`,
  reaction: `<svg viewBox="0 0 420 160" class="fs-svg" role="img" aria-label="Reaction time">
    <text x="210" y="16" text-anchor="middle" fill="#3b82f6" font-size="10" font-weight="700">ACTION BEATS REACTION</text>
    <rect x="20" y="35" width="380" height="22" rx="4" fill="#1a2332"/>
    <rect x="20" y="35" width="76" height="22" rx="4" fill="#10b981" opacity="0.8"/>
    <text x="58" y="50" text-anchor="middle" fill="#fff" font-size="8">ATTACKER ACTS</text>
    <rect x="96" y="35" width="152" height="22" rx="0" fill="#ef4444" opacity="0.5"/>
    <text x="172" y="50" text-anchor="middle" fill="#fff" font-size="8">YOU PROCESS (200-600ms)</text>
    <rect x="248" y="35" width="152" height="22" rx="4" fill="#f59e0b" opacity="0.6"/>
    <text x="324" y="50" text-anchor="middle" fill="#fff" font-size="8">YOUR RESPONSE (too late?)</text>
    <text x="20" y="80" fill="#8b9cb8" font-size="8">0ms</text>
    <text x="96" y="80" fill="#8b9cb8" font-size="8">~0</text>
    <text x="248" y="80" fill="#8b9cb8" font-size="8">400-600ms</text>
    <text x="380" y="80" fill="#8b9cb8" font-size="8">800ms+</text>
    <line x1="20" y1="90" x2="400" y2="90" stroke="#2d3a52" stroke-width="1"/>
    <text x="210" y="115" text-anchor="middle" fill="#10b981" font-size="8">Pre-committed exit / hands-up = you already acted</text>
    <text x="210" y="132" text-anchor="middle" fill="#ef4444" font-size="8">Chambered technique from cold = always behind</text>
    <text x="210" y="150" text-anchor="middle" fill="#8b9cb8" font-size="7">Tueller ~1.5s @ 21ft knife — same math for punches at arm's reach</text>
  </svg>`,
  range: `<svg viewBox="0 0 440 120" class="fs-svg" role="img" aria-label="Range zones">
    <text x="220" y="14" text-anchor="middle" fill="#8b5cf6" font-size="9" font-weight="700">RANGE ZONES — WHAT DOMINATES WHERE</text>
    <rect x="10" y="30" width="70" height="40" rx="4" fill="rgba(16,185,129,0.2)" stroke="#10b981"/>
    <text x="45" y="48" text-anchor="middle" fill="#10b981" font-size="6">ESCAPE</text>
    <text x="45" y="60" text-anchor="middle" fill="#8b9cb8" font-size="5">10m+</text>
    <rect x="85" y="30" width="75" height="40" rx="4" fill="rgba(245,158,11,0.2)" stroke="#f59e0b"/>
    <text x="122" y="48" text-anchor="middle" fill="#f59e0b" font-size="6">KICK</text>
    <text x="122" y="60" text-anchor="middle" fill="#8b9cb8" font-size="5">1.5-2m</text>
    <rect x="165" y="30" width="90" height="40" rx="4" fill="rgba(239,68,68,0.25)" stroke="#ef4444"/>
    <text x="210" y="48" text-anchor="middle" fill="#ef4444" font-size="6">PUNCH/KO</text>
    <text x="210" y="60" text-anchor="middle" fill="#8b9cb8" font-size="5">0.5-1.2m</text>
    <rect x="260" y="30" width="75" height="40" rx="4" fill="rgba(239,68,68,0.35)" stroke="#ef4444" stroke-width="2"/>
    <text x="297" y="48" text-anchor="middle" fill="#fff" font-size="6">CLINCH</text>
    <text x="297" y="60" text-anchor="middle" fill="#8b9cb8" font-size="5">knife zone</text>
    <rect x="340" y="30" width="90" height="40" rx="4" fill="rgba(139,92,246,0.25)" stroke="#8b5cf6"/>
    <text x="385" y="48" text-anchor="middle" fill="#8b5cf6" font-size="6">GROUND</text>
    <text x="385" y="60" text-anchor="middle" fill="#8b9cb8" font-size="5">62-73%</text>
    <line x1="10" y1="85" x2="430" y2="85" stroke="#2d3a52" stroke-width="2"/>
    <text x="220" y="105" text-anchor="middle" fill="#8b9cb8" font-size="7">Closer = faster fight end + worse weapon risk — exit range is the only safe zone</text>
  </svg>`
};

function renderFightScienceDiagrams() {
  const map = {
    'fs-kinetic-chain': FIGHT_SCIENCE_SVG.kineticChain,
    'fs-knockout': FIGHT_SCIENCE_SVG.knockout,
    'fs-reaction': FIGHT_SCIENCE_SVG.reaction,
    'fs-range': FIGHT_SCIENCE_SVG.range
  };
  Object.entries(map).forEach(([id, svg]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = svg;
  });
}

function renderForceScienceChart() {
  const ctx = document.getElementById('forceScienceChart');
  const fs = evidenceData?.fightScience;
  if (!ctx || !fs) return;

  const d = fs.forceData;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.map(x => x.technique),
      datasets: [
        {
          label: 'Peak force (N)',
          data: d.map(x => x.peakForceN),
          backgroundColor: d.map(x => x.fightValidated ? '#10b981' : x.labValidated ? '#3b82f6' : '#6b7280'),
          borderRadius: 4,
          yAxisID: 'y'
        },
        {
          label: 'Effective mass (kg)',
          data: d.map(x => x.effectiveMassKg),
          backgroundColor: 'rgba(245,158,11,0.5)',
          borderRadius: 4,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            afterBody: (items) => {
              const i = items[0].dataIndex;
              const x = d[i];
              return [`Fight validated: ${x.fightValidated ? 'Yes' : 'No'}`, `Source: ${x.source}`];
            }
          }
        }
      },
      scales: {
        y: { position: 'left', title: { display: true, text: 'Newtons' }, grid: { color: '#2d3a52' } },
        y1: { position: 'right', min: 0, max: 10, title: { display: true, text: 'Eff. mass (kg)' }, grid: { drawOnChartArea: false } },
        x: { ticks: { font: { size: 9 } } }
      }
    }
  });
}

function renderKOTimelineChart() {
  const ctx = document.getElementById('koTimelineChart');
  const fs = evidenceData?.fightScience;
  if (!ctx || !fs) return;

  const b = fs.fightDuration.buckets;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: b.map(x => x.window),
      datasets: [{
        data: b.map(x => x.pct),
        backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#6b7280'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right' },
        tooltip: { callbacks: { label: c => `${c.label}: ${c.raw}% — ${b[c.dataIndex].outcome}` } }
      }
    }
  });
}

function renderReactionTimeChart() {
  const ctx = document.getElementById('reactionTimeChart');
  const fs = evidenceData?.fightScience;
  if (!ctx || !fs) return;

  const m = fs.reactionTime.metrics;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: m.map(x => x.type),
      datasets: [{
        label: 'Time (ms)',
        data: m.map(x => parseInt(x.timeMs.split('–')[0]) || parseInt(x.timeMs)),
        backgroundColor: ['#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: { title: { display: true, text: 'Milliseconds (lower bound)' }, grid: { color: '#2d3a52' } }, y: { ticks: { font: { size: 9 } } } }
    }
  });
}

function renderGroundScienceChart() {
  const ctx = document.getElementById('groundScienceChart');
  const fs = evidenceData?.fightScience;
  if (!ctx || !fs) return;

  const g = fs.groundScience;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['LAPD ground %', 'Street ground %', 'Street (excl quick KO) %', 'Return to standing %'],
      datasets: [{
        label: '% of fights / outcomes',
        data: [g.lapdGroundPct, g.streetGroundPct, g.streetGroundExclQuickKO, g.returnToStandingPct],
        backgroundColor: ['#3b82f6', '#8b5cf6', '#8b5cf6', '#10b981'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: `Myth debunked: NOT ${g.mythDebunked.split(' ')[0]}%`, color: '#ef4444', font: { size: 11 } }
      },
      scales: { y: { max: 100, grid: { color: '#2d3a52' } } }
    }
  });
}

function renderUfcStreetChart() {
  const ctx = document.getElementById('ufcStreetChart');
  const fs = evidenceData?.fightScience;
  if (!ctx || !fs) return;

  const u = fs.ufcVsStreet;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['UFC KO/TKO finishes', 'UFC submissions', 'Street dirty fighting', 'Street indecisive'],
      datasets: [{
        data: [
          Math.round((u.ufcKoTkoCount / u.ufcTotalFights) * 100),
          Math.round(u.ufcSubmissionPct),
          fs.streetFightBehavior?.dirtyFightingRate || u.streetDirtyFightingPct,
          fs.fightDuration.indecisiveOutcomePct
        ],
        backgroundColor: ['#ef4444', '#3b82f6', '#f59e0b', '#6b7280'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { max: 60, title: { display: true, text: '%' }, grid: { color: '#2d3a52' } } }
    }
  });
}

function renderSciencePrinciples() {
  const el = document.getElementById('fs-principles-grid');
  const fs = evidenceData?.fightScience;
  if (!el || !fs) return;

  el.innerHTML = fs.keyPrinciples.map(p => `
    <div class="fs-principle-card">
      <span class="tier tier-${p.tier.replace('+', 'plus').toLowerCase()}" style="font-size:0.65rem">${p.tier}</span>
      <h4>${p.title}</h4>
      <p>${p.text}</p>
    </div>`).join('');
}

function renderKineticChainCards() {
  const el = document.getElementById('fs-kinetic-cards');
  const fs = evidenceData?.fightScience;
  if (!el || !fs) return;

  const k = fs.kineticChain;
  el.innerHTML = `
    <p class="chart-explainer">${k.plainEnglish}</p>
    <p class="fs-formula">${k.formula}</p>
    <div class="fs-chain-steps">${k.sequence.map((s, i) => `
      <div class="fs-chain-step">
        <span class="fs-chain-num">${i + 1}</span>
        <div><strong>${s.link}</strong><span>${s.contribution}</span></div>
      </div>`).join('')}
    </div>`;
}

function renderKOTargets() {
  const el = document.getElementById('fs-ko-targets');
  const fs = evidenceData?.fightScience;
  if (!el || !fs) return;

  const ko = fs.knockoutMechanics;
  el.innerHTML = `
    <p>${ko.plainEnglish}</p>
    <div class="fs-ko-thresholds">
      <div class="fs-threshold"><strong>Linear:</strong> ${ko.linearAcceleration.thresholdG} G — ${ko.linearAcceleration.description}</div>
      <div class="fs-threshold"><strong>Rotational:</strong> ${ko.rotationalAcceleration.thresholdRadS2} rad/s² — ${ko.rotationalAcceleration.description}</div>
    </div>
    <div class="fs-target-grid">${ko.targets.map(t => `
      <div class="fs-target-card" style="--ko:${t.koPotential * 20}%">
        <span class="fs-ko-pot">${t.koPotential}/5 KO</span>
        <strong>${t.target}</strong>
        <span>${t.mechanism}</span>
      </div>`).join('')}
    </div>`;
}

function renderRangeZoneCards() {
  const el = document.getElementById('fs-range-cards');
  const fs = evidenceData?.fightScience;
  if (!el || !fs) return;

  el.innerHTML = fs.rangeZones.zones.map(z => `
    <div class="fs-range-card">
      <div class="fs-range-dist">${z.distance}</div>
      <h4>${z.name}</h4>
      <p><strong>Dominant:</strong> ${z.dominant}</p>
      <p class="fs-range-sci">${z.science}</p>
    </div>`).join('');
}

function renderAllFightScienceVisualizations() {
  if (!evidenceData?.fightScience) return;
  renderFightScienceDiagrams();
  renderKineticChainCards();
  renderKOTargets();
  renderRangeZoneCards();
  renderSciencePrinciples();
  renderForceScienceChart();
  renderKOTimelineChart();
  renderReactionTimeChart();
  renderGroundScienceChart();
  renderUfcStreetChart();
  const summary = document.getElementById('fs-nhi-summary');
  if (summary) summary.innerHTML = `<p>${evidenceData.fightScience.nhiSummary}</p>`;
  const react = document.getElementById('fs-reaction-implication');
  if (react) react.textContent = evidenceData.fightScience.reactionTime.implication;
}