/** Okinawan karate NHI reconciliation visualizations */

const KARATE_ALIGN_COLORS = { STRONG: '#10b981', 'HIGH': '#10b981', 'MEDIUM-HIGH': '#3b82f6', 'PARTIAL': '#f59e0b', CONDITIONAL: '#f59e0b', CONFIRMED: '#10b981' };

function renderKarateExecutive() {
  const k = evidenceData?.karateNhiAnalysis;
  const el = document.getElementById('karate-executive');
  if (!el || !k) return;
  el.innerHTML = `<p>${k.executiveSummary}</p>`;
}

function renderKarateMasters() {
  const el = document.getElementById('karate-masters');
  const k = evidenceData?.karateNhiAnalysis;
  if (!el || !k) return;
  el.innerHTML = k.masterAnalysis.map(m => `
    <div class="karate-master-card" style="--align-color:${KARATE_ALIGN_COLORS[m.resilienceAlignment.split(' ')[0]] || '#8b5cf6'}">
      <div class="karate-master-header">
        <h4>${m.master}</h4>
        <span class="karate-align-badge">${m.resilienceAlignment} alignment</span>
      </div>
      <p class="karate-teaching"><strong>Taught:</strong> ${m.coreTeaching}</p>
      <p class="karate-aligns"><strong>✓ Resilience agrees:</strong> ${m.aligns.join(' · ')}</p>
      <p class="karate-tensions"><strong>⚠ Tensions:</strong> ${m.tensions.join(' · ')}</p>
      <p class="karate-verdict"><strong>NHI:</strong> ${m.nhiVerdict}</p>
    </div>`).join('');
}

function renderKaratePrinciples() {
  const ctx = document.getElementById('karatePrinciplesChart');
  const el = document.getElementById('karate-principles-table');
  const k = evidenceData?.karateNhiAnalysis;
  if (!k) return;

  if (el) {
    el.innerHTML = `<table class="fp-reject-table karate-table">
      <thead><tr><th>Karate principle</th><th>Match</th><th>Resilience evidence</th><th>Tier</th></tr></thead>
      <tbody>${k.principleReconciliation.map(p => `
        <tr>
          <td>${p.karatePrinciple}</td>
          <td><span class="karate-match karate-match-${p.resilienceMatch.toLowerCase().replace(/[^a-z]/g, '')}">${p.resilienceMatch}</span></td>
          <td>${p.evidence}</td>
          <td><span class="tier tier-${p.tier.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase() || 'b'}">${p.tier}</span></td>
        </tr>`).join('')}
      </tbody></table>`;
  }

  if (ctx) {
    const matchScore = { STRONG: 5, 'HIGH': 5, 'MEDIUM-HIGH': 4, PARTIAL: 3, CONDITIONAL: 2 };
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: k.principleReconciliation.map(p => p.karatePrinciple.substring(0, 28)),
        datasets: [{
          label: 'Alignment strength',
          data: k.principleReconciliation.map(p => matchScore[p.resilienceMatch.split(' ')[0]] || 3),
          backgroundColor: k.principleReconciliation.map(p => KARATE_ALIGN_COLORS[p.resilienceMatch.split(' ')[0]] || '#6b7280'),
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: { x: { min: 0, max: 5 }, y: { ticks: { font: { size: 9 } } } }
      }
    });
  }
}

function renderKarateTechniques() {
  const el = document.getElementById('karate-techniques');
  const k = evidenceData?.karateNhiAnalysis;
  if (!el || !k) return;
  el.innerHTML = k.techniqueReconciliation.map(t => `
    <div class="karate-tech-card">
      <h5>${t.technique}</h5>
      <p><strong>Karate claim:</strong> ${t.karateClaim}</p>
      <p><strong>Resilience data:</strong> ${t.resilienceRank}</p>
      <p class="karate-tech-verdict">${t.verdict}</p>
      ${typeof tierBadge === 'function' ? tierBadge(t.tier.replace(/[^A-D+]/g, '') || 'B') : `<span class="tier">${t.tier}</span>`}
    </div>`).join('');
}

function renderKarateDrift() {
  const el = document.getElementById('karate-drift');
  const k = evidenceData?.karateNhiAnalysis;
  if (!el || !k) return;
  const d = k.driftProblem;
  el.innerHTML = `
    <h4>${d.title}</h4>
    <ul>${d.drifts.map(x => `<li>${x}</li>`).join('')}</ul>
    <p class="karate-recovery"><strong>Recovery path:</strong> ${d.recoveryPath}</p>`;
}

function renderKarateStack() {
  const el = document.getElementById('karate-synthesis-stack');
  const k = evidenceData?.karateNhiAnalysis;
  if (!el || !k) return;
  el.innerHTML = k.synthesisStack.order.map(s => `
    <div class="karate-stack-item">
      <span class="karate-stack-pri">P${s.priority}</span>
      <div>
        <strong>${s.layer}</strong>
        <p>${s.why}</p>
        <span class="karate-stack-hours">${s.hours}</span>
      </div>
    </div>`).join('');
}

function renderKarateFinal() {
  const k = evidenceData?.karateNhiAnalysis;
  if (!k) return;
  const v = document.getElementById('karate-final-verdict');
  const l = document.getElementById('karate-honest-limits');
  const h = document.getElementById('karate-historical');
  if (v) v.innerHTML = `<p>${k.nhiFinalVerdict}</p>`;
  if (l) l.textContent = k.honestLimits;
  if (h) h.innerHTML = `<p>${k.historicalContext.plainEnglish}</p><p style="font-size:0.85rem;margin-top:0.5rem"><em>Note: ${k.historicalContext.note}</em></p>`;
}

function renderAllKarateNhiVisualizations() {
  if (!evidenceData?.karateNhiAnalysis) return;
  renderKarateExecutive();
  renderKarateMasters();
  renderKaratePrinciples();
  renderKarateTechniques();
  renderKarateDrift();
  renderKarateStack();
  renderKarateFinal();
}