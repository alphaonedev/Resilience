/** OODA Loop — Boyd decision cycle visualizations */

function getOoda() {
  return evidenceData?.avoidanceAndAwareness?.situationalAwareness?.oodaLoop;
}

function renderOodaIntro() {
  const o = getOoda();
  const el = document.getElementById('ooda-intro');
  if (!el || !o) return;
  el.innerHTML = `
    <div class="ooda-def-hero">
      <div class="ooda-def-badge">
        <span class="tier tier-c">Tier C framework</span>
        <span class="ooda-acronym">${o.acronym}</span>
      </div>
      <h3>${o.name}</h3>
      <p class="ooda-oneline">${o.definition.oneSentence}</p>
      <p class="ooda-plain">${o.definition.plainEnglish}</p>
      <p class="ooda-notlinear"><strong>Not linear:</strong> ${o.definition.notLinear}</p>
      <p class="ooda-origin"><em>${o.origin.creator}</em> — ${o.origin.role}. ${o.origin.context}</p>
    </div>`;
}

function renderOodaLoopDiagram() {
  const o = getOoda();
  const el = document.getElementById('ooda-loop-diagram');
  if (!el || !o?.phases) return;

  const phases = o.phases;
  const positions = [
    { x: 200, y: 45, anchor: 'middle' },
    { x: 355, y: 200, anchor: 'start' },
    { x: 200, y: 355, anchor: 'middle' },
    { x: 45, y: 200, anchor: 'end' }
  ];

  el.innerHTML = `
    <svg viewBox="0 0 400 400" class="ooda-loop-svg" role="img" aria-label="OODA Loop cycle: Observe, Orient, Decide, Act">
      <defs>
        <marker id="oodaArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#6b7280"/>
        </marker>
        <filter id="oodaGlow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="200" cy="200" r="155" fill="none" stroke="#2d3a52" stroke-width="2" stroke-dasharray="8 6"/>
      <path d="M 200 75 A 125 125 0 0 1 325 200" fill="none" stroke="#6b7280" stroke-width="2.5" marker-end="url(#oodaArrow)"/>
      <path d="M 325 200 A 125 125 0 0 1 200 325" fill="none" stroke="#6b7280" stroke-width="2.5" marker-end="url(#oodaArrow)"/>
      <path d="M 200 325 A 125 125 0 0 1 75 200" fill="none" stroke="#6b7280" stroke-width="2.5" marker-end="url(#oodaArrow)"/>
      <path d="M 75 200 A 125 125 0 0 1 200 75" fill="none" stroke="#6b7280" stroke-width="2.5" marker-end="url(#oodaArrow)"/>
      <circle cx="200" cy="200" r="52" fill="#111827" stroke="#3b82f6" stroke-width="2"/>
      <text x="200" y="192" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="800">TEMPO</text>
      <text x="200" y="208" text-anchor="middle" fill="#8b9cb8" font-size="8">Faster loop wins</text>
      <text x="200" y="222" text-anchor="middle" fill="#8b9cb8" font-size="7">Continuous cycle</text>
      ${phases.map((p, i) => {
        const pos = positions[i];
        return `
          <g filter="url(#oodaGlow)">
            <circle cx="${pos.x}" cy="${pos.y}" r="38"
              fill="${p.color}22" stroke="${p.color}" stroke-width="2.5"/>
            <text x="${pos.x}" y="${pos.y - 6}" text-anchor="${pos.anchor}" fill="${p.color}" font-size="10" font-weight="800">${p.name.toUpperCase()}</text>
            <text x="${pos.x}" y="${pos.y + 10}" text-anchor="${pos.anchor}" fill="#8b9cb8" font-size="14" font-weight="700">${p.letter}</text>
          </g>`;
      }).join('')}
      <text x="200" y="385" text-anchor="middle" fill="#10b981" font-size="8">Act changes the world → new Observe for everyone</text>
    </svg>
    <p class="ooda-diagram-caption">Clockwise cycle. Each phase feeds the next. Skilled defenders compress Orient+Decide through rehearsal.</p>`;
}

function renderOodaPhases() {
  const o = getOoda();
  const el = document.getElementById('ooda-phases');
  if (!el || !o) return;
  el.innerHTML = `
    <h4>The four phases — in plain English</h4>
    <div class="ooda-phases-grid">
      ${o.phases.map(p => `
        <article class="ooda-phase-card" style="--ooda-color:${p.color}">
          <header class="ooda-phase-header">
            <span class="ooda-phase-letter">${p.letter}</span>
            <h5>${p.name}</h5>
          </header>
          <p class="ooda-phase-summary">${p.summary}</p>
          <p>${p.detail}</p>
          <ul class="ooda-examples">${p.civilianExamples.map(e => `<li>${e}</li>`).join('')}</ul>
          <p class="ooda-failure"><strong>Failure mode:</strong> ${p.failureMode}</p>
          <span class="ooda-map">${p.resilienceMap}</span>
        </article>`).join('')}
    </div>`;
}

function renderOodaBoydInsights() {
  const o = getOoda();
  const el = document.getElementById('ooda-boyd-insights');
  if (!el || !o) return;
  el.innerHTML = `
    <h4>Boyd's insights — what matters for survival</h4>
    <div class="ooda-insights-grid">
      ${o.boydInsights.map(i => `
        <div class="ooda-insight-card">
          <strong>${i.insight}</strong>
          <p>${i.plainEnglish}</p>
          <span class="ooda-insight-ev">${i.resilienceEvidence}</span>
        </div>`).join('')}
    </div>`;
}

function renderOodaTempo() {
  const o = getOoda();
  const el = document.getElementById('ooda-tempo');
  if (!el || !o?.tempoComparison) return;
  el.innerHTML = `
    <h4>${o.tempoComparison.title}</h4>
    ${o.tempoComparison.scenarios.map(s => `
      <div class="ooda-tempo-card">
        <h5>${s.scenario}</h5>
        <div class="ooda-tempo-row">
          <span class="ooda-tempo-label ooda-tempo-atk">Aggressor</span>
          <p>${s.aggressor}</p>
        </div>
        <div class="ooda-tempo-row">
          <span class="ooda-tempo-label ooda-tempo-def">Defender</span>
          <p>${s.defender}</p>
        </div>
        <p class="ooda-tempo-verdict">${s.resilienceVerdict}</p>
      </div>`).join('')}`;
}

function renderOodaReactionTime() {
  const o = getOoda();
  const el = document.getElementById('ooda-reaction');
  const fs = evidenceData?.fightScience?.reactionTime;
  if (!el || !o) return;

  const metrics = fs?.metrics || [];
  el.innerHTML = `
    <h4>OODA vs reaction-time science</h4>
    <p class="chart-explainer">${o.reactionTimeLink.plainEnglish}</p>
    <div class="ooda-reaction-bars">
      ${metrics.map(m => {
        const msNum = parseInt(String(m.timeMs).replace(/[^0-9]/g, ''), 10) || 1500;
        const pct = Math.min(100, msNum / 15);
        return `
          <div class="ooda-reaction-row">
            <span class="ooda-reaction-label">${m.type}</span>
            <div class="ooda-reaction-bar-wrap">
              <div class="ooda-reaction-bar" style="width:${pct}%"></div>
            </div>
            <span class="ooda-reaction-ms">${m.timeMs} ms</span>
          </div>
          <p class="ooda-reaction-ctx">${m.context}</p>`;
      }).join('')}
    </div>
    <p class="ooda-reaction-total"><strong>Full OODA under surprise:</strong> ${o.reactionTimeLink.oodaTotalMs} ms (Tier ${o.reactionTimeLink.tier})</p>`;
}

function renderOodaMapping() {
  const o = getOoda();
  const el = document.getElementById('ooda-mapping');
  if (!el || !o) return;
  el.innerHTML = `
    <h4>OODA × Cooper × EAAA</h4>
    <table class="fp-reject-table ooda-table">
      <thead><tr><th>Cooper</th><th>OODA phase</th><th>EAAA unit</th></tr></thead>
      <tbody>${o.cooperEaaaMapping.map(r => `
        <tr class="ooda-map-row ooda-map-${r.cooper.toLowerCase()}">
          <td><span class="cooper-inline-pill cooper-${r.cooper.toLowerCase()}">${r.cooper}</span></td>
          <td>${r.ooda}</td>
          <td>${r.eaaa}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;
}

function renderOodaTraining() {
  const o = getOoda();
  const limits = document.getElementById('ooda-honest-limits');
  const drills = document.getElementById('ooda-training');
  if (drills && o?.trainingDrills) {
    drills.innerHTML = `
      <h4>Compress your loop — training drills</h4>
      <ol class="ooda-drill-list">${o.trainingDrills.map(d => `
        <li>
          <strong>${d.drill}</strong> (${d.minutes} min) — <em>${d.oodaPhase}</em>
          <p>${d.plainEnglish}</p>
        </li>`).join('')}</ol>`;
  }
  if (limits) limits.textContent = o?.honestLimits || '';
}

function renderAllOodaVisualizations() {
  if (!getOoda()) return;
  renderOodaIntro();
  renderOodaLoopDiagram();
  renderOodaPhases();
  renderOodaBoydInsights();
  renderOodaTempo();
  renderOodaReactionTime();
  renderOodaMapping();
  renderOodaTraining();
}