/** Resilience One System — full-spectrum holistic distill */

const HOLISTIC_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

function renderHolisticExecutive() {
  const h = evidenceData?.holisticSurvivalSystem;
  const el = document.getElementById('holistic-executive');
  if (!el || !h) return;

  const d = h.executiveDistill;
  if (!d) {
    el.innerHTML = `
      <p class="holistic-one-sentence">${h.oneSentence}</p>
      <p style="margin-top:1rem">${h.executiveSummary}</p>`;
    return;
  }

  const tierCls = t => `tier tier-${t.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase() || 'b'}`;

  el.innerHTML = `
    <blockquote class="holistic-one-sentence">${h.oneSentence}</blockquote>

    <p class="holistic-distill-intro">${d.sourcesIntro}</p>
    <ul class="holistic-distill-sources">${d.sources.map(s => `<li>${s}</li>`).join('')}</ul>

    <p class="holistic-distill-verdict"><strong>${d.verdict}</strong></p>

    <div class="holistic-gain-split">
      <div class="holistic-gain-item holistic-gain-habits">
        <span class="holistic-gain-pct">${d.gainSplit.habitsPercent}%</span>
        <span class="holistic-gain-lbl">${d.gainSplit.habitsLabel}</span>
      </div>
      <div class="holistic-gain-item holistic-gain-physical">
        <span class="holistic-gain-pct">${d.gainSplit.physicalPercent}%</span>
        <span class="holistic-gain-lbl">${d.gainSplit.physicalLabel}</span>
      </div>
    </div>

    <ul class="holistic-layer-bullets">
      ${d.layerBullets.map((l, i) => `
        <li class="holistic-layer-bullet" style="--layer-color:${HOLISTIC_COLORS[i] || '#10b981'}">
          <div class="holistic-layer-bullet-head">
            <span class="holistic-layer-bullet-num">L${l.layer}</span>
            <strong class="holistic-layer-bullet-name">${l.name}</strong>
            <span class="${tierCls(l.tier)}">${l.tier}</span>
          </div>
          <p class="holistic-layer-bullet-action">${l.action}</p>
          <p class="holistic-layer-bullet-ev">${l.evidence}</p>
        </li>`).join('')}
    </ul>

    <div class="holistic-weapon-rule">
      <span class="holistic-weapon-label">${d.weaponRule.label}</span>
      <p class="holistic-weapon-text">${d.weaponRule.text}</p>
      <span class="holistic-weapon-tier">${d.weaponRule.tier}</span>
    </div>

    <div class="holistic-distill-cut">
      <p class="holistic-cut-head"><strong>Distilled to:</strong> ${d.distilledTo}</p>
      <ul class="holistic-cut-list">${d.rejected.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>

    <p class="holistic-training-order">${d.trainingOrder}</p>`;
}

function renderHolisticHero() {
  const h = evidenceData?.holisticSurvivalSystem;
  const el = document.getElementById('holistic-hero');
  if (!el || !h) return;
  const t = h.timeToLearn;
  el.innerHTML = `
    <div class="holistic-hero-badge">AI NHI Ultimate Distill · Tier ${h.tier}</div>
    <h3>${h.name}</h3>
    <p class="holistic-acronym">${h.acronym}</p>
    <p class="holistic-tagline">${h.tagline}</p>
    <div class="holistic-hero-stats">
      <div class="holistic-stat"><div class="val">${t.dailyMinutes}m</div><div class="lbl">Daily — Layer 0 MIND</div></div>
      <div class="holistic-stat"><div class="val">${t.weeklyMinutes}m</div><div class="lbl">Weekly — full habit stack</div></div>
      <div class="holistic-stat"><div class="val">7</div><div class="lbl">Physical skills max (Layer 2)</div></div>
      <div class="holistic-stat"><div class="val">${t.habitsAutomatic}</div><div class="lbl">To habits automatic</div></div>
    </div>
    <p class="holistic-learn-note">${t.plainEnglish}</p>`;
}

function renderHolisticLayers() {
  const h = evidenceData?.holisticSurvivalSystem;
  const el = document.getElementById('holistic-layers');
  if (!el || !h?.fourLayers) return;
  el.innerHTML = h.fourLayers.map((l, i) => `
    <div class="holistic-layer-card" style="--layer-color:${HOLISTIC_COLORS[i] || '#10b981'}">
      <div class="holistic-layer-header">
        <span class="holistic-layer-num">Layer ${l.layer}</span>
        <span class="holistic-layer-name">${l.name}</span>
        <span class="holistic-layer-pct">~${l.percentOfGain}% of gain</span>
        <span class="tier tier-${l.tier.replace('+', 'plus').toLowerCase()}">${l.tier}</span>
      </div>
      <p class="holistic-layer-what"><strong>${l.what}</strong></p>
      <p class="holistic-layer-time">Daily: ${l.daily} · Weekly: ${l.weekly}</p>
      <ul class="holistic-skill-list">${(Array.isArray(l.skills) && typeof l.skills[0] === 'string'
        ? l.skills.map(s => `<li>${s}</li>`)
        : l.skills.map(s => `<li><strong>${s.skill}</strong> — ${s.why} <em>(${s.from})</em></li>`)
      ).join('')}</ul>
      <p class="holistic-layer-ev">${l.evidence}</p>
      <p class="holistic-layer-src">Distilled from: ${l.sourcesDistilled.join(' · ')}</p>
    </div>`).join('');
}

function renderHolisticLayersChart() {
  const ctx = document.getElementById('holisticLayersChart');
  const h = evidenceData?.holisticSurvivalSystem;
  if (!ctx || !h?.fourLayers) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: h.fourLayers.map(l => `L${l.layer} ${l.name}`),
      datasets: [{
        data: h.fourLayers.map(l => l.percentOfGain),
        backgroundColor: HOLISTIC_COLORS,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 13, family: "'Instrument Sans', system-ui, sans-serif" },
            padding: 18,
            boxWidth: 14,
            boxHeight: 14
          }
        },
        tooltip: { callbacks: { label: c => `~${c.raw}% of survival gain` } }
      }
    }
  });
}

function renderHolisticWeaponRule() {
  const h = evidenceData?.holisticSurvivalSystem;
  const el = document.getElementById('holistic-weapons');
  if (!el || !h?.weaponParallelRule) return;
  const w = h.weaponParallelRule;
  el.innerHTML = `
    <p class="chart-explainer">${w.plainEnglish}</p>
    <table class="fp-reject-table holistic-table">
      <thead><tr><th>Threat</th><th>Response</th><th>Never</th><th>Tier</th></tr></thead>
      <tbody>${w.rules.map(r => `
        <tr>
          <td>${r.threat}</td>
          <td>${r.response}</td>
          <td class="holistic-never">${r.never}</td>
          <td><span class="tier tier-${r.tier.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase() || 'a'}">${r.tier}</span></td>
        </tr>`).join('')}
      </tbody>
    </table>`;
}

function renderHolisticScenarioTree() {
  const h = evidenceData?.holisticSurvivalSystem;
  const el = document.getElementById('holistic-scenarios');
  if (!el || !h?.scenarioTree) return;
  el.innerHTML = h.scenarioTree.map(s => `
    <div class="holistic-scenario-card">
      <span class="holistic-scenario-sit">${s.situation}</span>
      <p class="holistic-scenario-res">${s.response}</p>
      <span class="holistic-scenario-sec">${typeof s.seconds === 'number' ? s.seconds + ' sec' : s.seconds}</span>
    </div>`).join('');
}

function renderHolisticWhatWeCut() {
  const h = evidenceData?.holisticSurvivalSystem;
  const el = document.getElementById('holistic-cut');
  if (!el || !h?.whatWeCut) return;
  el.innerHTML = `
    <h4>${h.whatWeCut.title}</h4>
    <table class="fp-reject-table holistic-table">
      <thead><tr><th>Cut from training</th><th>Why</th><th>Tier</th></tr></thead>
      <tbody>${h.whatWeCut.rejected.map(r => `
        <tr><td>${r.cut}</td><td>${r.why}</td><td><span class="tier tier-${r.tier.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase() || 'a'}">${r.tier}</span></td></tr>`).join('')}
      </tbody>
    </table>`;
}

function renderHolisticEightWeek() {
  const h = evidenceData?.holisticSurvivalSystem;
  const el = document.getElementById('holistic-eight-week');
  if (!el || !h?.eightWeekOptional) return;
  const e = h.eightWeekOptional;
  el.innerHTML = `
    <h4>${e.title}</h4>
    ${e.weeks.map(w => `
      <div class="holistic-week-row">
        <span class="holistic-week-label">Weeks ${w.week}</span>
        <div>
          <strong>${w.focus}</strong>
          <span class="holistic-week-meta">${w.daily} · Exit test: ${w.test}</span>
        </div>
      </div>`).join('')}`;
}

function renderHolisticProbability() {
  const h = evidenceData?.holisticSurvivalSystem;
  const el = document.getElementById('holistic-probability');
  if (!el || !h?.probabilityLogic) return;
  el.innerHTML = h.probabilityLogic.map((p, i) => `
    <div class="holistic-prob-step">
      <span class="holistic-prob-num">${i + 1}</span>
      <div>
        <strong>${p.step}</strong>
        <p>${p.effect}</p>
        <span class="holistic-prob-cum">${p.cumulative}</span>
      </div>
    </div>`).join('');
}

function renderHolisticFinal() {
  const h = evidenceData?.holisticSurvivalSystem;
  if (!h) return;
  const v = document.getElementById('holistic-final-verdict');
  const l = document.getElementById('holistic-honest-limits');
  const d = h.ultimateVerdictDistill;

  if (v) {
    if (!d) {
      v.innerHTML = `<p>${h.nhiUltimateVerdict}</p>`;
    } else {
      const tierCls = t => `tier tier-${t.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase() || 'b'}`;
      v.innerHTML = `
        <div class="holistic-final-distill">
          <p class="holistic-final-lead">${d.lead}</p>

          <h4 class="holistic-final-heading">${d.fourLayersTitle}</h4>
          <ul class="holistic-final-layers">
            ${d.fourLayers.map(l => `
              <li>
                <span class="holistic-final-layer-name">${l.name}</span>
                <span class="holistic-final-layer-detail">${l.detail}</span>
                <span class="${tierCls(l.tier)}">${l.tier}</span>
              </li>`).join('')}
          </ul>

          <h4 class="holistic-final-heading">${d.contributionsTitle}</h4>
          <ul class="holistic-final-contribs">
            ${d.contributions.map(c => `
              <li><strong>${c.system}</strong> — ${c.gives}</li>`).join('')}
          </ul>

          <h4 class="holistic-final-heading">${d.priorityTitle}</h4>
          <div class="holistic-final-priority-grid">
            <div class="holistic-final-priority holistic-priority-found">
              <span class="holistic-priority-label">${d.prioritiesFoundation.label}</span>
              <ul>${d.prioritiesFoundation.items.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
            <div class="holistic-final-priority holistic-priority-optional">
              <span class="holistic-priority-label">${d.prioritiesOptional.label}</span>
              <ul>${d.prioritiesOptional.items.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
          </div>

          <h4 class="holistic-final-heading">${d.stepsTitle}</h4>
          <ol class="holistic-final-steps">
            ${d.steps.map((s, i) => `
              <li class="${i === d.steps.length - 1 ? 'holistic-final-step-closer' : ''}">${s}</li>`).join('')}
          </ol>
        </div>`;
    }
  }

  if (l) l.textContent = h.honestLimits;
}

function renderHolisticFlowSvg() {
  const el = document.getElementById('holistic-flow-svg');
  const h = evidenceData?.holisticSurvivalSystem;
  if (!el || !h) return;
  el.innerHTML = `
    <svg viewBox="0 0 900 360" class="holistic-flow-diagram" role="img" aria-label="Resilience One System flow">
      <defs>
        <marker id="holArr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill="#10b981"/></marker>
        <marker id="holArrB" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill="#3b82f6"/></marker>
        <marker id="holArrO" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill="#f59e0b"/></marker>
        <marker id="holArrR" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill="#ef4444"/></marker>
      </defs>
      <text x="450" y="28" text-anchor="middle" fill="#8b9cb8" font-size="13" font-weight="600">Primary escalation path →</text>
      <rect x="30" y="48" width="175" height="72" rx="12" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="2.5"/>
      <text x="117" y="78" text-anchor="middle" fill="#10b981" font-size="16" font-weight="800">L0 MIND</text>
      <text x="117" y="98" text-anchor="middle" fill="#e8edf5" font-size="12">Assess · Acknowledge</text>
      <text x="117" y="114" text-anchor="middle" fill="#8b9cb8" font-size="11">3 min/day · Tier A+</text>
      <line x1="205" y1="84" x2="248" y2="84" stroke="#10b981" stroke-width="2.5" marker-end="url(#holArr)"/>
      <rect x="248" y="48" width="175" height="72" rx="12" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="2.5"/>
      <text x="335" y="78" text-anchor="middle" fill="#3b82f6" font-size="16" font-weight="800">L1 AVOID</text>
      <text x="335" y="98" text-anchor="middle" fill="#e8edf5" font-size="12">Boundaries · exits</text>
      <text x="335" y="114" text-anchor="middle" fill="#8b9cb8" font-size="11">Leave first</text>
      <line x1="423" y1="84" x2="466" y2="84" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#holArrB)"/>
      <rect x="466" y="48" width="175" height="72" rx="12" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="553" y="78" text-anchor="middle" fill="#f59e0b" font-size="16" font-weight="800">L2 BURST</text>
      <text x="553" y="98" text-anchor="middle" fill="#e8edf5" font-size="12">3–5 strikes max</text>
      <text x="553" y="114" text-anchor="middle" fill="#8b9cb8" font-size="11">Only if trapped</text>
      <line x1="641" y1="84" x2="684" y2="84" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#holArrO)"/>
      <rect x="684" y="48" width="186" height="72" rx="12" fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="2.5"/>
      <text x="777" y="78" text-anchor="middle" fill="#ef4444" font-size="16" font-weight="800">L3 ESCAPE</text>
      <text x="777" y="98" text-anchor="middle" fill="#e8edf5" font-size="12">Sprint always</text>
      <text x="777" y="114" text-anchor="middle" fill="#8b9cb8" font-size="11">People · light · space</text>
      <path d="M335 120 L335 168 L117 168 L117 120" fill="none" stroke="#6ee7b7" stroke-width="2" stroke-dasharray="6 4" opacity="0.75"/>
      <text x="226" y="188" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="600">Best path: L1 → L3 — skip burst, leave early</text>
      <rect x="30" y="210" width="280" height="56" rx="10" fill="rgba(239,68,68,0.1)" stroke="#ef4444" stroke-opacity="0.55"/>
      <text x="170" y="234" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="700">Gun / knife parallel rule</text>
      <text x="170" y="254" text-anchor="middle" fill="#8b9cb8" font-size="11">Comply → distance → run (never disarm heroics)</text>
      <rect x="330" y="210" width="540" height="56" rx="10" fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-opacity="0.45"/>
      <text x="600" y="234" text-anchor="middle" fill="#a7f3d0" font-size="13" font-weight="600">7 skills only: palm · cross · teep · calf kick · 3 knees · wrist release · sprawl</text>
      <text x="600" y="254" text-anchor="middle" fill="#8b9cb8" font-size="11">Optional Layer 2 — after brain habits are automatic</text>
      <text x="450" y="310" text-anchor="middle" fill="#fde047" font-size="14" font-weight="700">See early → Leave → Burst if trapped → Sprint</text>
      <text x="450" y="338" text-anchor="middle" fill="#8b9cb8" font-size="12">Everything else on this site explains why these four layers work</text>
    </svg>`;
}

function renderAllHolisticSurvivalVisualizations() {
  if (!evidenceData?.holisticSurvivalSystem) return;
  renderHolisticExecutive();
  renderHolisticHero();
  renderHolisticLayers();
  renderHolisticLayersChart();
  renderHolisticWeaponRule();
  renderHolisticScenarioTree();
  renderHolisticWhatWeCut();
  renderHolisticEightWeek();
  renderHolisticProbability();
  renderHolisticFlowSvg();
  renderHolisticFinal();
}