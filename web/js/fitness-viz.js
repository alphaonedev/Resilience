/** Victim fitness research — proxies, gaps, and survival correlations */

function renderFitnessDataGap() {
  const el = document.getElementById('fitness-data-gap');
  const d = evidenceData?.victimFitnessResearch?.dataGap;
  if (!el || !d) return;
  el.innerHTML = `
    <h4>Data gap: ${d.status}</h4>
    <p><strong>Missing:</strong> ${d.missingMetric}</p>
    <p>${d.explanation}</p>
    <p style="margin-top:0.75rem"><strong>What research uses instead:</strong></p>
    <ul>${d.proxyMetrics.map(p => `<li>${p}</li>`).join('')}</ul>`;
}

function renderDisabilityChart() {
  const ctx = document.getElementById('disabilityVictimChart');
  const d = evidenceData?.victimFitnessResearch?.disabilityProxy;
  if (!ctx || !d) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['No disability', 'Any disability', ...d.byDisabilityType.map(t => t.type)],
      datasets: [{
        label: 'Violent victimization per 1,000 (age 12+)',
        data: [
          d.violentVictimizationPer1000.withoutDisability,
          d.violentVictimizationPer1000.withDisability,
          ...d.byDisabilityType.map(t => t.ratePer1000)
        ],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6', '#06b6d4', '#6b7280'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, grid: { color: '#2d3a52' } }, x: { ticks: { font: { size: 9 } } } }
    }
  });
}

function renderEscapeMobilityChart() {
  const ctx = document.getElementById('escapeMobilityChart');
  const e = evidenceData?.victimFitnessResearch?.escapeAndMobility;
  if (!ctx || !e) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Escaped (outnumbered)', 'Defeated (outnumbered)', 'Indecisive / other'],
      datasets: [{
        data: [e.outnumbered.escapeRate, e.outnumbered.defeatRate, e.outnumbered.indecisiveRate],
        backgroundColor: ['#10b981', '#ef4444', '#6b7280'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

function renderFitnessInferenceChart() {
  const ctx = document.getElementById('fitnessInferenceChart');
  const m = evidenceData?.victimFitnessResearch?.fitnessInferenceMatrix;
  if (!ctx || !m) return;

  const tierScore = { 'A+': 5, A: 4, B: 3, C: 2, D: 1 };
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: m.map(x => x.capacity),
      datasets: [{
        label: 'Evidence tier for survival link',
        data: m.map(x => tierScore[x.evidenceTier] || 2),
        backgroundColor: m.map(x => ({ 'A+': '#10b981', A: '#3b82f6', B: '#8b5cf6', C: '#f59e0b' }[x.evidenceTier] || '#6b7280')),
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: { min: 0, max: 5, ticks: { stepSize: 1 }, title: { display: true, text: 'Evidence strength' } } }
    }
  });
}

function renderFitnessCards() {
  const ageEl = document.getElementById('fitness-age-cards');
  const resEl = document.getElementById('fitness-resistance-cards');
  const infEl = document.getElementById('fitness-inference-cards');
  const v = evidenceData?.victimFitnessResearch;
  if (!v) return;

  if (ageEl) {
    ageEl.innerHTML = v.ageAndCapacity.findings.map(f => `
      <div class="fitness-card">
        <p><strong>${f.finding}</strong></p>
        <p class="fitness-implication">→ ${f.implication}</p>
      </div>`).join('');
  }

  if (resEl) {
    resEl.innerHTML = v.resistanceOutcomes.completion.map(r => `
      <div class="fitness-card">
        <h5>${r.behavior}</h5>
        <p><strong>Outcome:</strong> ${r.effect}</p>
        <p class="fitness-implication">${r.injuryNote}</p>
      </div>`).join('');
  }

  if (infEl) {
    infEl.innerHTML = v.fitnessInferenceMatrix.map(row => `
      <div class="fitness-card fitness-card-matrix" style="--fitness-tier:${({ 'A+': '#10b981', A: '#3b82f6', B: '#8b5cf6', C: '#f59e0b' }[row.evidenceTier] || '#6b7280')}">
        <div class="fitness-card-header">
          <h5>${row.capacity}</h5>
          <span class="tier tier-${row.evidenceTier.replace('+', 'plus').toLowerCase()}" style="font-size:0.65rem">${row.evidenceTier}</span>
        </div>
        <p><strong>Survival link:</strong> ${row.survivalLink}</p>
        <p class="fitness-implication">${row.data}</p>
      </div>`).join('');
  }

  const eaaa = document.getElementById('fitness-eaaa-note');
  if (eaaa) {
    const e = v.eaaaPhysicalNote;
    eaaa.innerHTML = `
      <h4>EAAA trial — closest to a fitness question (Tier ${e.tier})</h4>
      <p>${e.plainEnglish}</p>
      <p><strong>Physical hours:</strong> ${e.physicalHours} of ${e.totalHours} total · <strong>Assault reduction:</strong> ${e.assaultReduction}</p>
      <p style="font-size:0.85rem;color:var(--text-muted)">Mediators measured: ${e.mediators.join(', ')}. Not measured: ${e.notMeasured}.</p>`;
  }

  const summary = document.getElementById('fitness-nhi-summary');
  if (summary) summary.innerHTML = `<p>${v.nhiSummary}</p>`;

  const limits = document.getElementById('fitness-honest-limits');
  if (limits) limits.textContent = v.honestLimits;

  const dis = document.getElementById('fitness-disability-plain');
  if (dis && v.disabilityProxy) {
    dis.innerHTML = `<p>${v.disabilityProxy.plainEnglish}</p><p style="margin-top:0.5rem;font-size:0.85rem"><strong>Caveat:</strong> ${v.disabilityProxy.caveat}</p>`;
  }
}

function renderAllFitnessVisualizations() {
  if (!evidenceData?.victimFitnessResearch) return;
  renderFitnessDataGap();
  renderFitnessCards();
  renderDisabilityChart();
  renderEscapeMobilityChart();
  renderFitnessInferenceChart();
}