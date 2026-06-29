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
        legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 12 } },
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
  if (v) v.innerHTML = `<p>${h.nhiUltimateVerdict}</p>`;
  if (l) l.textContent = h.honestLimits;
}

function renderHolisticFlowSvg() {
  const el = document.getElementById('holistic-flow-svg');
  const h = evidenceData?.holisticSurvivalSystem;
  if (!el || !h) return;
  el.innerHTML = `
    <svg viewBox="0 0 520 280" class="holistic-flow-diagram" role="img" aria-label="Resilience One System flow">
      <defs>
        <marker id="holArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#10b981"/></marker>
      </defs>
      <rect x="10" y="20" width="120" height="56" rx="10" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="2"/>
      <text x="70" y="44" text-anchor="middle" fill="#10b981" font-size="11" font-weight="800">L0 MIND</text>
      <text x="70" y="60" text-anchor="middle" fill="#8b9cb8" font-size="8">3 min/day · A+</text>
      <line x1="130" y1="48" x2="168" y2="48" stroke="#10b981" stroke-width="2" marker-end="url(#holArr)"/>
      <rect x="168" y="20" width="120" height="56" rx="10" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="2"/>
      <text x="228" y="44" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="800">L1 AVOID</text>
      <text x="228" y="60" text-anchor="middle" fill="#8b9cb8" font-size="8">Leave first</text>
      <line x1="288" y1="48" x2="326" y2="48" stroke="#3b82f6" stroke-width="2" marker-end="url(#holArr)"/>
      <rect x="326" y="20" width="120" height="56" rx="10" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="2"/>
      <text x="386" y="44" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="800">L2 BURST</text>
      <text x="386" y="60" text-anchor="middle" fill="#8b9cb8" font-size="8">3–5 strikes · optional</text>
      <line x1="446" y1="48" x2="484" y2="48" stroke="#f59e0b" stroke-width="2" marker-end="url(#holArr)"/>
      <rect x="484" y="20" width="26" height="56" rx="0" fill="none" stroke="none"/>
      <rect x="350" y="100" width="160" height="48" rx="10" fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="2"/>
      <text x="430" y="122" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="800">L3 ESCAPE</text>
      <text x="430" y="138" text-anchor="middle" fill="#8b9cb8" font-size="8">Sprint always</text>
      <line x1="386" y1="76" x2="386" y2="92" stroke="#f59e0b" stroke-width="2"/>
      <line x1="386" y1="92" x2="430" y2="92" stroke="#ef4444" stroke-width="2"/>
      <line x1="430" y1="92" x2="430" y2="100" stroke="#ef4444" stroke-width="2" marker-end="url(#holArr)"/>
      <path d="M228 76 L228 200 L70 200 L70 76" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.5"/>
      <text x="70" y="218" fill="#6ee7b7" font-size="8">L1 skip L2 — leave early (best path)</text>
      <rect x="10" y="170" width="200" height="44" rx="8" fill="rgba(239,68,68,0.1)" stroke="#ef4444" stroke-opacity="0.5"/>
      <text x="110" y="190" text-anchor="middle" fill="#fca5a5" font-size="9" font-weight="700">Gun / knife parallel rule</text>
      <text x="110" y="206" text-anchor="middle" fill="#8b9cb8" font-size="8">Comply → distance → run</text>
      <rect x="240" y="170" width="270" height="44" rx="8" fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-opacity="0.4"/>
      <text x="375" y="198" text-anchor="middle" fill="#a7f3d0" font-size="9">7 skills: palm · cross · teep · calf · 3 knees · wrist · sprawl</text>
      <text x="260" y="248" fill="#fde047" font-size="10" font-weight="700">See early → Leave → Burst if trapped → Sprint</text>
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