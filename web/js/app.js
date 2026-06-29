const CHART_DEFAULTS = {
  color: '#8b9cb8',
  borderColor: '#2d3a52',
  font: { family: "'Instrument Sans', system-ui, sans-serif" }
};

Chart.defaults.color = CHART_DEFAULTS.color;
Chart.defaults.borderColor = CHART_DEFAULTS.borderColor;
Chart.defaults.font.family = CHART_DEFAULTS.font.family;

let evidenceData = null;
let adversarialData = null;

async function loadData() {
  const paths = [
    ['data/evidence.json', 'data/adversarial-3x7-round2.json'],
    ['../data/evidence.json', '../data/adversarial-3x7-round2.json']
  ];
  for (const [evPath, advPath] of paths) {
    try {
      const [ev, adv] = await Promise.all([
        fetch(evPath).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }),
        fetch(advPath).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      ]);
      evidenceData = ev;
      adversarialData = adv;
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

function renderHeroStats() {
  const el = document.getElementById('hero-stats');
  const m = evidenceData.avoidanceAndAwareness.multiAttacker;
  const e = evidenceData.avoidanceAndAwareness.eaaa;
  el.innerHTML = `
    <div class="stat-card"><div class="stat-value">${e.rctCompletedRapeReduction12mo}%</div><div class="stat-label">EAAA Rape Reduction (RCT)</div></div>
    <div class="stat-card"><div class="stat-value">${m.reactiveEscapeRate}%</div><div class="stat-label">Multi-Attacker Escape Rate</div></div>
    <div class="stat-card"><div class="stat-value">N/A</div><div class="stat-label">Proactive Avoidance Metric</div></div>
    <div class="stat-card"><div class="stat-value">3×7</div><div class="stat-label">Adversarial Voting Rounds</div></div>
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
    <p><strong>Missing metric:</strong> ${g.missingMetric}</p>
    <p><strong>Status:</strong> ${g.status}</p>
    <p>${g.explanation}</p>
    <p style="margin-top:1rem"><strong>Proxy metrics available:</strong></p>
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
  const c = evidenceData.avoidanceAndAwareness.eaaa.curriculumBreakdown;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Assess (Detection)', 'Acknowledge', 'Act (2hr physical)', 'Sexuality/Relationships'],
      datasets: [{
        label: '% of Curriculum',
        data: [c.assess, c.acknowledge, c.act, c.sexualityRelationships],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'],
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
  new Chart(ctx, {
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

function renderFindings() {
  const el = document.getElementById('adversarial-findings');
  el.innerHTML = adversarialData.adversarialFindings.map(f => `
    <div class="card">
      <h3>${f.id}: ${f.confidence} confidence ${f.allVotersAgree ? '✓ Unanimous' : ''}</h3>
      <p style="color:var(--text-muted);margin-top:0.5rem">${f.finding}</p>
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

function renderAll() {
  renderHeroStats();
  renderSpectrum();
  renderDataGap();
  renderMultiAttackerChart();
  renderEAAAChart();
  renderAdversarialRankings();
  renderHeatmap();
  renderRadarChart();
  renderTechniqueList('striking-list', evidenceData.strikingTechniques);
  renderTechniqueList('kicking-list', evidenceData.kickingTechniques);
  renderTechniqueList('grappling-list', evidenceData.grapplingTechniques);
  renderCrimeStats();
  renderFindings();
  renderStack();
  renderLEChart();
}

document.addEventListener('DOMContentLoaded', loadData);