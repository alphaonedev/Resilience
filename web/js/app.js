const CHART_DEFAULTS = {
  color: '#8b9cb8',
  borderColor: '#2d3a52',
  font: { family: "'Instrument Sans', system-ui, sans-serif" }
};

Chart.defaults.color = CHART_DEFAULTS.color;
Chart.defaults.borderColor = CHART_DEFAULTS.borderColor;
Chart.defaults.font.family = CHART_DEFAULTS.font.family;

let evidenceData = null;
let adversarialRounds = { 2: null, 3: null };
let adversarialData = null;
let activeAdversarialRound = 3;

async function loadData() {
  const bases = ['data/', '../data/'];
  for (const base of bases) {
    try {
      const [ev, r2, r3] = await Promise.all([
        fetch(`${base}evidence.json`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }),
        fetch(`${base}adversarial-3x7-round2.json`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }),
        fetch(`${base}adversarial-3x7-round3.json`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      ]);
      evidenceData = ev;
      adversarialRounds = { 2: r2, 3: r3 };
      adversarialData = adversarialRounds[activeAdversarialRound];
      renderAll();
      return;
    } catch (_) { /* try next path */ }
  }
  document.body.insertAdjacentHTML('afterbegin',
    '<div style="background:#f59e0b22;border:1px solid #f59e0b;padding:1rem;text-align:center">Serve via local server: <code>cd web && python3 -m http.server 8080</code></div>');
}

function tierBadge(tier) {
  const cls = tier.replace('+', 'plus').toLowerCase();
  return `<span class="tier tier-${cls}">${tier}</span>`;
}

function renderEvidenceTiersGuide() {
  const g = evidenceData?.evidenceTiersGuide;
  const el = document.getElementById('evidence-tiers-guide');
  if (!el || !g) return;

  const tierColors = {
    aplus: '#10b981',
    a: '#3b82f6',
    b: '#8b5cf6',
    c: '#f59e0b',
    d: '#ef4444'
  };

  el.innerHTML = `
    <div class="etg-head">
      <div class="etg-head-text">
        <h2 class="etg-title">${g.title}</h2>
        <p class="etg-subtitle">${g.subtitle}</p>
        <p class="etg-intro">${g.intro}</p>
      </div>
    </div>

    <div class="etg-spectrum" aria-hidden="true">
      <span class="etg-spectrum-label">${g.spectrumLabel}</span>
      <div class="etg-spectrum-bar">
        ${g.tiers.map(t => `<span class="etg-spectrum-seg etg-${t.id}" style="--etg-color:${tierColors[t.id]}"></span>`).join('')}
      </div>
      <div class="etg-spectrum-grades">
        ${g.tiers.map(t => `<span class="etg-spectrum-grade etg-${t.id}" style="color:${tierColors[t.id]}">${t.grade}</span>`).join('')}
      </div>
    </div>

    <div class="etg-grid" role="list">
      ${g.tiers.map(t => `
        <article class="etg-card etg-${t.id}" role="listitem" style="--etg-color:${tierColors[t.id]}">
          <header class="etg-card-head">
            ${tierBadge(t.grade.replace('plus', '+'))}
            <h3 class="etg-card-label">${t.label}</h3>
          </header>
          <p class="etg-card-plain">${t.plainEnglish}</p>
          <dl class="etg-card-meta">
            <div class="etg-meta-row">
              <dt>Technical</dt>
              <dd>${t.technical}</dd>
            </div>
            <div class="etg-meta-row etg-meta-example">
              <dt>Example on this site</dt>
              <dd>${t.example}</dd>
            </div>
            <div class="etg-meta-row etg-meta-trust">
              <dt>How to use it</dt>
              <dd>${t.whenToTrust}</dd>
            </div>
          </dl>
        </article>`).join('')}
    </div>

    <footer class="etg-foot">
      <p>${g.footnote}</p>
    </footer>`;
}

function renderHeroStats() {
  const el = document.getElementById('hero-stats');
  const m = evidenceData.avoidanceAndAwareness.multiAttacker;
  const e = evidenceData.avoidanceAndAwareness.eaaa;
  el.innerHTML = `
    <div class="stat-card"><div class="stat-value">${e.rctCompletedRapeReduction12mo}%</div><div class="stat-label">Fewer assaults after awareness training</div></div>
    <div class="stat-card"><div class="stat-value">${m.reactiveEscapeRate}%</div><div class="stat-label">Escaped when already outnumbered</div></div>
    <div class="stat-card"><div class="stat-value">?</div><div class="stat-label">"Left before fight" — not measured</div></div>
    <div class="stat-card"><div class="stat-value">7</div><div class="stat-label">Evidence-ranked strategies tested</div></div>
  `;
}

function renderSpectrum() {
  const el = document.getElementById('violence-spectrum');
  const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#f59e0b', '#ef4444', '#dc2626'];
  el.innerHTML = evidenceData.violenceDomains.map((d, i) => {
    const realness = Math.round((1 - d.abstraction) * 100);
    return `
      <div class="spectrum-row">
        <span class="spectrum-label">${d.name}</span>
        <div class="spectrum-bar"><div class="spectrum-fill" style="width:${realness}%;background:${colors[i]}"></div></div>
        <span class="spectrum-pct">${realness}%</span>
      </div>`;
  }).join('');
}

function renderDataGap() {
  const g = evidenceData.avoidanceAndAwareness.dataGap;
  document.getElementById('data-gap-content').innerHTML = `
    <p><strong>In plain English:</strong> Nobody has scientifically measured how often people <em>sense</em> a bad situation — like a group spreading out to surround them — and quietly leave before anything happens. Crime statistics only count people who got hurt, not people who walked away safe.</p>
    <p><strong>Status:</strong> ${g.status}</p>
    <p>${g.explanation}</p>
    <p style="margin-top:1rem"><strong>What we use instead (best available substitutes):</strong></p>
    <ul style="margin-left:1.25rem;color:var(--text-muted)">
      ${g.proxyMetrics.map(p => `<li>${p}</li>`).join('')}
    </ul>`;
}

function renderMultiAttackerChart() {
  const ctx = document.getElementById('multiAttackerChart');
  const o = evidenceData.avoidanceAndAwareness.multiAttacker.outcomesWhenOutnumbered;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Escaped', 'Defeated One+', 'Incapacitated', 'No Clear Outcome'],
      datasets: [{
        data: [o.escaped, o.defeatedAtLeastOne, o.incapacitated, o.noClearOutcome],
        backgroundColor: ['#10b981', '#3b82f6', '#ef4444', '#6b7280'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { padding: 16 } },
        title: { display: true, text: 'When Already Outnumbered (n=154 street fights)', color: '#8b9cb8' }
      }
    }
  });
}

function renderEAAAChart() {
  const ctx = document.getElementById('eaaaChart');
  if (!ctx) return;
  const c = evidenceData.avoidanceAndAwareness.eaaa.curriculumBreakdown;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Assess (Detection)', 'Acknowledge', 'Act (2hr physical)', 'Sexuality/Relationships'],
      datasets: [{
        label: '% of Curriculum',
        data: [c.assess, c.acknowledge, c.act, c.sexualityRelationships],
        backgroundColor: ['#facc15', '#f97316', '#ef4444', '#8b5cf6'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { max: 30, grid: { color: '#2d3a52' } },
        y: { grid: { display: false } }
      }
    }
  });
}

function setAdversarialRound(round) {
  if (!adversarialRounds[round]) return;
  activeAdversarialRound = round;
  adversarialData = adversarialRounds[round];
  document.querySelectorAll('.adv-round-btn').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.round) === round);
  });
  renderAdversarialProfile();
  renderAdversarialRankings();
  renderHeatmap();
  if (window._radarChart) {
    window._radarChart.destroy();
    window._radarChart = null;
  }
  renderRadarChart();
  renderFindings();
  renderStack();
}

function renderAdversarialProfile() {
  const el = document.getElementById('adversarial-profile');
  if (!el || !adversarialData) return;
  const wp = adversarialData.weightingProfile;
  const c7 = adversarialData.criteria.find(c => c.id === 'C7');
  const c6 = adversarialData.criteria.find(c => c.id === 'C6');
  if (wp) {
    el.innerHTML = `
      <div class="adv-profile-banner adv-profile-fight">
        <span class="adv-profile-label">Round ${adversarialData.round} — ${wp.name}</span>
        <p>${wp.plainEnglish}</p>
        <p class="adv-profile-meta"><strong>C6 ${c6?.name}:</strong> weight ${c6?.weight} · <strong>C7 ${c7?.name}:</strong> weight ${c7?.weight} (${wp.c7Policy})</p>
        ${wp.round2Winner && wp.round3Winner ? `<p class="adv-profile-compare">Round 2 winner: ${wp.round2Winner} → Round 3 winner: ${wp.round3Winner}</p>` : ''}
      </div>`;
  } else {
    el.innerHTML = `
      <div class="adv-profile-banner adv-profile-medical">
        <span class="adv-profile-label">Round ${adversarialData.round} — Medical-weighted profile</span>
        <p>Proactive avoidance and medical victimization RCT weighted highest. EAAA wins because it is the only program with assault-reduction trial proof.</p>
        <p class="adv-profile-meta"><strong>C7 Medical Victimization RCT:</strong> weight ${c7?.weight ?? 1.25}</p>
      </div>`;
  }
}

function renderAdversarialRankings() {
  const el = document.getElementById('adversarial-rankings');
  const sorted = Object.entries(adversarialData.scores)
    .sort((a, b) => a[1].rank - b[1].rank);
  el.innerHTML = sorted.map(([name, s]) => `
    <div class="ranking-item">
      <span class="rank-num">#${s.rank}</span>
      <div>
        <strong>${name}</strong>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem">${s.verdict}</p>
      </div>
      <span class="rank-score">${s.weightedTotal.toFixed(2)}</span>
      ${tierBadge(s.tier)}
    </div>`).join('');
}

function scoreClass(v) {
  if (v >= 8) return 'score-high';
  if (v >= 5) return 'score-mid';
  return 'score-low';
}

function renderHeatmap() {
  const el = document.getElementById('heatmap-table');
  const criteria = adversarialData.criteria;
  const interventions = adversarialData.interventions;
  let html = '<table><thead><tr><th>Intervention</th>';
  criteria.forEach(c => { html += `<th>${c.name.split(' ').slice(0, 2).join(' ')}…</th>`; });
  html += '<th>Weighted</th></tr></thead><tbody>';
  interventions.forEach(name => {
    const s = adversarialData.scores[name];
    html += `<tr><td class="intervention">${name}</td>`;
    s.consensus.forEach(v => { html += `<td class="${scoreClass(v)}">${v.toFixed(1)}</td>`; });
    html += `<td class="${scoreClass(s.weightedTotal)}"><strong>${s.weightedTotal.toFixed(2)}</strong></td></tr>`;
  });
  html += '</tbody></table>';
  el.innerHTML = html;
}

function renderRadarChart() {
  const ctx = document.getElementById('radarChart');
  const top3 = Object.entries(adversarialData.scores)
    .sort((a, b) => a[1].rank - b[1].rank)
    .slice(0, 3);
  const labels = adversarialData.criteria.map(c => c.id);
  if (window._radarChart) window._radarChart.destroy();
  window._radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: adversarialData.criteria.map(c => c.name.substring(0, 20) + '…'),
      datasets: top3.map(([name, s], i) => ({
        label: name.substring(0, 25),
        data: s.consensus,
        borderColor: ['#10b981', '#3b82f6', '#8b5cf6'][i],
        backgroundColor: ['rgba(16,185,129,0.15)', 'rgba(59,130,246,0.15)', 'rgba(139,92,246,0.15)'][i],
        borderWidth: 2
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0, max: 10,
          ticks: { stepSize: 2 },
          grid: { color: '#2d3a52' },
          pointLabels: { font: { size: 10 } }
        }
      }
    }
  });
}

function renderTechniqueList(id, techniques) {
  const el = document.getElementById(id);
  el.innerHTML = techniques.map(t => {
    const dots = Array(5).fill(0).map((_, i) =>
      `<span class="dot ${i < t.score ? 'filled' : ''}"></span>`).join('');
    return `<li><span class="tech-rank">${t.rank}</span><span class="tech-name">${t.name}</span><span class="tech-score">${dots}</span>${tierBadge(t.tier)}</li>`;
  }).join('');
}

function renderCrimeStats() {
  const ctx = document.getElementById('crimeStatsChart');
  const stats = evidenceData.crimeStatistics.slice(0, 6);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: stats.map(s => s.metric.substring(0, 35) + '…'),
      datasets: [{
        label: '%',
        data: stats.map(s => s.value),
        backgroundColor: stats.map(s => s.tier === 'A' || s.tier === 'A+' ? '#3b82f6' : '#8b5cf6'),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: { grid: { color: '#2d3a52' } }, y: { grid: { display: false } } }
    }
  });
}

const FINDING_PLAIN = {
  'AF-1': 'Nobody counts near-misses. We are honest about that hole in the data.',
  'AF-2': 'The EAAA "spot danger early" training is the closest thing to proof that awareness saves people.',
  'AF-3': 'Military stay-alert rules make sense — but civilians should know they are not medically proven.',
  'AF-4': 'If you are already surrounded, running beats fighting — 22% vs 11% in real footage.',
  'AF-5': 'Best combo: awareness training + alert habits + simple boxing/wrestling — not one martial art alone.'
};

function renderFindings() {
  const el = document.getElementById('adversarial-findings');
  el.innerHTML = adversarialData.adversarialFindings.map(f => `
    <div class="card">
      <h3>${f.id} ${f.allVotersAgree ? '· All reviewers agreed' : ''}</h3>
      <p style="margin-top:0.5rem">${f.finding}</p>
      <p style="color:var(--text-muted);margin-top:0.5rem;font-size:0.9rem"><strong>Plain English:</strong> ${f.plainEnglish || FINDING_PLAIN[f.id] || ''}</p>
    </div>`).join('');
}

function renderStack() {
  const el = document.getElementById('recommended-stack');
  el.innerHTML = adversarialData.recommendedStack.map(s => `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
        <span style="font-family:var(--font-mono);color:var(--accent);font-weight:700">P${s.priority}</span>
        ${tierBadge(s.tier)}
      </div>
      <h3>${s.component}</h3>
      <p style="color:var(--text-muted);font-size:0.875rem;margin-top:0.5rem">${s.hours} hours/training</p>
    </div>`).join('');
}

function renderLEChart() {
  const ctx = document.getElementById('leChart');
  const m = evidenceData.lawEnforcementBJJ.mariettaPD;
  const s = evidenceData.lawEnforcementBJJ.stPaulPD;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['UOF Reduction', 'Suspect Injury ↓', 'Officer Injury ↓', 'Strike Use ↓'],
      datasets: [
        { label: 'Marietta PD (BJJ)', data: [m.bjjOfficersLessUOF, m.suspectHospitalizationReduction, null, null], backgroundColor: '#10b981' },
        { label: 'St. Paul PD (BJJ DT)', data: [s.uofReduction, s.arresteeInjuryReduction, s.officerInjuryReduction, s.strikeReduction], backgroundColor: '#3b82f6' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: { y: { max: 70, grid: { color: '#2d3a52' } } }
    }
  });
}

function renderMinimalSystemConclusion() {
  const m = evidenceData?.minimalSystem;
  if (!m) return;
  const o = m.outcomes;

  document.getElementById('aaa-hero').innerHTML = `
    <div class="aaa-hero-badge">AI NHI Recommended · Tier ${m.tier}</div>
    <h3>${m.name}</h3>
    <p class="aaa-acronym">${m.acronym}</p>
    <p style="color:var(--text-muted);max-width:560px;margin:0 auto;font-size:0.95rem">${m.tagline}</p>
    <div class="aaa-hero-stats">
      <div class="aaa-hero-stat"><div class="val">${m.dailyMinutes} min</div><div class="lbl">Per day — Assess & Acknowledge</div></div>
      <div class="aaa-hero-stat"><div class="val">${m.weeklyMinutes} min</div><div class="lbl">Per week — drills & rehearsal</div></div>
      <div class="aaa-hero-stat"><div class="val">${o.assaultReduction12mo}%</div><div class="lbl">Fewer assaults after full EAAA program</div></div>
      <div class="aaa-hero-stat"><div class="val">${o.escapeWhenOutnumbered}%</div><div class="lbl">Escaped when already outnumbered</div></div>
    </div>`;

  document.getElementById('nhi-verdict-text').innerHTML = `<p>${m.nhiVerdict}</p>`;
  document.getElementById('aaa-honest-limits').textContent = m.honestLimits;

  document.getElementById('aaa-flow-diagram').innerHTML = `
    <svg viewBox="0 0 420 200" class="aaa-flow-svg" role="img" aria-label="AAA Exit Protocol flow with Cooper colors">
      <defs>
        <marker id="aaaArrY" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#facc15"/></marker>
        <marker id="aaaArrO" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#f97316"/></marker>
        <marker id="aaaArrR" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#ef4444"/></marker>
      </defs>
      <circle cx="70" cy="100" r="52" fill="rgba(250,204,21,0.18)" stroke="#facc15" stroke-width="2"/>
      <text x="70" y="82" text-anchor="middle" fill="#fde047" font-size="8" font-weight="700">YELLOW</text>
      <text x="70" y="96" text-anchor="middle" fill="#facc15" font-size="11" font-weight="800">ASSESS</text>
      <text x="70" y="110" text-anchor="middle" fill="#8b9cb8" font-size="8">2 min/day</text>
      <text x="70" y="124" text-anchor="middle" fill="#8b9cb8" font-size="7">Relaxed alert</text>
      <line x1="122" y1="100" x2="158" y2="100" stroke="#f97316" stroke-width="2" marker-end="url(#aaaArrO)"/>
      <circle cx="210" cy="100" r="52" fill="rgba(249,115,22,0.18)" stroke="#f97316" stroke-width="2"/>
      <text x="210" y="82" text-anchor="middle" fill="#fb923c" font-size="8" font-weight="700">ORANGE</text>
      <text x="210" y="96" text-anchor="middle" fill="#f97316" font-size="11" font-weight="800">ACKNOWLEDGE</text>
      <text x="210" y="110" text-anchor="middle" fill="#8b9cb8" font-size="8">1 min/day</text>
      <text x="210" y="124" text-anchor="middle" fill="#8b9cb8" font-size="7">Specific threat</text>
      <line x1="262" y1="100" x2="298" y2="100" stroke="#ef4444" stroke-width="2" marker-end="url(#aaaArrR)"/>
      <circle cx="350" cy="100" r="52" fill="rgba(239,68,68,0.22)" stroke="#ef4444" stroke-width="3"/>
      <text x="350" y="82" text-anchor="middle" fill="#f87171" font-size="8" font-weight="700">RED</text>
      <text x="350" y="96" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="800">ACT</text>
      <text x="350" y="110" text-anchor="middle" fill="#fecaca" font-size="8">LEAVE</text>
      <text x="350" y="124" text-anchor="middle" fill="#8b9cb8" font-size="7">Decisive action</text>
      <rect x="60" y="168" width="300" height="24" rx="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" stroke-opacity="0.4"/>
      <text x="210" y="184" text-anchor="middle" fill="#fca5a5" font-size="9">If contact → Red burst → distance → run</text>
    </svg>`;

  document.getElementById('aaa-compound-layers').innerHTML = `
    <div class="aaa-compound-list">
      ${m.compoundLogic.map((l, i) => `
        <div class="aaa-compound-item">
          <span class="aaa-compound-num">${i + 1}</span>
          <div>
            <strong>${l.layer}</strong>
            <span>${l.effect}</span>
            <div class="aaa-compound-evidence">${l.evidence}</div>
          </div>
        </div>`).join('')}
    </div>`;

  const calDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const calTasks = [
    ['Daily AAA', 'Assess + Acknowledge', m.dailyMinutes],
    ['Scenario', m.weeklyRoutine[0].action.substring(0, 42) + '…', m.weeklyRoutine[0].minutes],
    ['Exit audit', 'Two exits at one familiar place', m.weeklyRoutine[1].minutes],
    ['Verbal drill', '"Stop. No. I\'m leaving."', m.weeklyRoutine[2].minutes],
    ['—', 'Rest or repeat a drill', 0],
    ['—', 'Rest or optional run burst', m.weeklyRoutine[3]?.minutes || 0],
    ['Review', 'Did I leave early once this week?', 2]
  ];
  document.getElementById('aaa-weekly-calendar').innerHTML = calDays.map((d, i) => {
    const [task, desc, mins] = calTasks[i];
    return `<div class="aaa-cal-row"><span class="aaa-cal-day">${d}</span><span class="aaa-cal-task"><strong>${task}</strong> — ${desc}</span><span class="aaa-cal-mins">${mins ? mins + 'm' : '—'}</span></div>`;
  }).join('');

  document.getElementById('aaa-daily-routine').innerHTML = m.dailyRoutine.map(r => `
    <div class="aaa-routine-card cooper-routine-card cooper-${r.cooperColor || 'yellow'}">
      <div class="cooper-routine-bar"></div>
      <div class="aaa-step-label">${r.step} · ${r.minutes} min <span class="cooper-inline-pill cooper-${r.cooperColor}">${(r.cooperColor || 'yellow').charAt(0).toUpperCase() + (r.cooperColor || 'yellow').slice(1)}</span></div>
      <h4>${r.action}</h4>
      <p>${r.plainEnglish}</p>
    </div>`).join('');

  document.getElementById('aaa-weekly-routine').innerHTML = m.weeklyRoutine.map(r => `
    <div class="aaa-routine-card">
      <div class="aaa-step-label">${r.step} · ${r.minutes} min</div>
      <h4>${r.action}</h4>
      <p>${r.plainEnglish}</p>
    </div>`).join('');

  document.getElementById('aaa-contact-protocol').innerHTML = m.ifContact.map(c => `
    <div class="aaa-contact-step cooper-contact-step cooper-${c.cooperColor || 'red'}">
      <span class="aaa-contact-pri">${c.priority}</span>
      <div>
        <h4 style="margin:0 0 0.25rem;font-size:0.9rem">${c.action}</h4>
        <span class="aaa-mins" style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted)">${typeof c.seconds === 'number' ? c.seconds + ' sec' : c.seconds}</span>
      </div>
    </div>`).join('');

  const op = m.optionalPhysical;
  document.getElementById('aaa-optional-physical').innerHTML = `
    <h4>Optional physical layer — ${op.hours} hours total (${op.source})</h4>
    <p>Add only after AAA habits feel automatic: ${op.skills.join(', ')}.</p>
    <p style="margin-top:0.5rem;font-size:0.9rem;color:var(--text-muted)">${op.note}</p>`;

  const ctx = document.getElementById('aaaOutcomesChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Assault reduction (EAAA trial)',
          'Injury reduction — verbal resistance (NCVS)',
          'Escape when outnumbered',
          'Defeat when outnumbered (don\'t do this)'
        ],
        datasets: [{
          label: '% outcome',
          data: [o.assaultReduction12mo, o.verbalResistanceInjuryReduction, o.escapeWhenOutnumbered, o.defeatWhenOutnumbered],
          backgroundColor: ['#10b981', '#3b82f6', '#10b981', '#ef4444'],
          borderRadius: 6
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
              label: c => c.raw + '%' + (c.dataIndex === 1 ? ' lower injury odds' : c.dataIndex === 0 ? ' fewer assaults' : '')
            }
          }
        },
        scales: { x: { max: 60, grid: { color: '#2d3a52' } }, y: { grid: { display: false } } }
      }
    });
  }
}

function renderAll() {
  if (typeof renderAllFirstPrinciplesVisualizations === 'function') {
    renderAllFirstPrinciplesVisualizations();
  }
  renderHeroStats();
  renderSpectrum();
  renderDataGap();
  renderMultiAttackerChart();
  renderEAAAChart();
  renderAdversarialProfile();
  renderAdversarialRankings();
  renderHeatmap();
  renderRadarChart();
  if (typeof renderAllSystemVisualizations === 'function') {
    renderAllSystemVisualizations();
  }
  if (typeof renderAllTechniqueVisualizations === 'function') {
    renderAllTechniqueVisualizations();
  }
  if (typeof renderAllKarateNhiVisualizations === 'function') {
    renderAllKarateNhiVisualizations();
  }
  if (typeof renderAllBoxingNhiVisualizations === 'function') {
    renderAllBoxingNhiVisualizations();
  }
  if (typeof renderAllKickingNhiVisualizations === 'function') {
    renderAllKickingNhiVisualizations();
  }
  if (typeof renderAllRuttenNhiVisualizations === 'function') {
    renderAllRuttenNhiVisualizations();
  }
  if (typeof renderAllMuayThaiNhiVisualizations === 'function') {
    renderAllMuayThaiNhiVisualizations();
  }
  if (typeof renderAllPtkNhiVisualizations === 'function') {
    renderAllPtkNhiVisualizations();
  }
  if (typeof renderAllDualSystemsVisualizations === 'function') {
    renderAllDualSystemsVisualizations();
  }
  if (typeof renderAllHolisticSurvivalVisualizations === 'function') {
    renderAllHolisticSurvivalVisualizations();
  }
  if (typeof renderAllCooperColorVisualizations === 'function') {
    renderAllCooperColorVisualizations();
  }
  if (typeof renderAllEaaaVisualizations === 'function') {
    renderAllEaaaVisualizations();
  }
  if (typeof renderAllOodaVisualizations === 'function') {
    renderAllOodaVisualizations();
  }
  if (typeof renderAllPostureVisualizations === 'function') {
    renderAllPostureVisualizations();
  }
  if (typeof renderAllFightScienceVisualizations === 'function') {
    renderAllFightScienceVisualizations();
  }
  if (typeof renderAllFitnessVisualizations === 'function') {
    renderAllFitnessVisualizations();
  }
  renderCrimeStats();
  renderFindings();
  renderEvidenceTiersGuide();
  renderStack();
  renderLEChart();
  renderMinimalSystemConclusion();
}

function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const overlay = document.getElementById('nav-overlay');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    nav.querySelectorAll('.nav-dropdown.open').forEach(d => {
      d.classList.remove('open');
      d.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
    });
  };

  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  overlay?.addEventListener('click', closeMenu);

  nav.querySelectorAll('.nav-dropdown-trigger').forEach(btn => {
    btn.addEventListener('click', e => {
      if (window.innerWidth > 1024) return;
      e.preventDefault();
      const parent = btn.closest('.nav-dropdown');
      const wasOpen = parent?.classList.contains('open');
      nav.querySelectorAll('.nav-dropdown.open').forEach(d => {
        d.classList.remove('open');
        d.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
      if (parent && !wasOpen) {
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  nav.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) closeMenu();
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMenu();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  loadData();
});