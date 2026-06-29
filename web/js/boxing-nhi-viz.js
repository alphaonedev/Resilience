/** Boxing legends NHI reconciliation visualizations */

const BOX_ALIGN_COLORS = { STRONG: '#10b981', HIGH: '#10b981', 'MEDIUM-HIGH': '#3b82f6', PARTIAL: '#f59e0b', CONDITIONAL: '#f59e0b', CONFIRMED: '#10b981', REJECTED: '#ef4444' };

function renderBoxingExecutive() {
  const b = evidenceData?.boxingNhiAnalysis;
  const el = document.getElementById('boxing-executive');
  if (!el || !b) return;
  el.innerHTML = `<p>${b.executiveSummary}</p>`;
}

function renderBoxingLegends() {
  const el = document.getElementById('boxing-legends');
  const b = evidenceData?.boxingNhiAnalysis;
  if (!el || !b) return;
  el.innerHTML = b.legendAnalysis.map(m => `
    <div class="boxing-legend-card" style="--align-color:${BOX_ALIGN_COLORS[m.resilienceAlignment.split(' ')[0]] || '#ef4444'}">
      <div class="boxing-legend-header">
        <h4>${m.legend}</h4>
        <span class="boxing-align-badge">${m.resilienceAlignment} alignment</span>
      </div>
      <p class="boxing-teaching"><strong>Taught:</strong> ${m.coreTeaching}</p>
      <p class="boxing-aligns"><strong>✓ Resilience agrees:</strong> ${m.aligns.join(' · ')}</p>
      <p class="boxing-tensions"><strong>⚠ Tensions:</strong> ${m.tensions.join(' · ')}</p>
      <p class="boxing-verdict"><strong>NHI:</strong> ${m.nhiVerdict}</p>
    </div>`).join('');
}

function renderBoxingPrinciples() {
  const ctx = document.getElementById('boxingPrinciplesChart');
  const el = document.getElementById('boxing-principles-table');
  const b = evidenceData?.boxingNhiAnalysis;
  if (!b) return;

  if (el) {
    el.innerHTML = `<table class="fp-reject-table boxing-table">
      <thead><tr><th>Boxing principle</th><th>Match</th><th>Resilience evidence</th><th>Tier</th></tr></thead>
      <tbody>${b.principleReconciliation.map(p => `
        <tr>
          <td>${p.boxingPrinciple}</td>
          <td><span class="boxing-match boxing-match-${p.resilienceMatch.toLowerCase().replace(/[^a-z]/g, '')}">${p.resilienceMatch}</span></td>
          <td>${p.evidence}</td>
          <td><span class="tier tier-${p.tier.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase() || 'b'}">${p.tier}</span></td>
        </tr>`).join('')}
      </tbody></table>`;
  }

  if (ctx) {
    const matchScore = { STRONG: 5, HIGH: 5, 'MEDIUM-HIGH': 4, PARTIAL: 3, CONDITIONAL: 2 };
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: b.principleReconciliation.map(p => p.boxingPrinciple.substring(0, 28)),
        datasets: [{
          label: 'Alignment strength',
          data: b.principleReconciliation.map(p => matchScore[p.resilienceMatch.split(' ')[0]] || 3),
          backgroundColor: b.principleReconciliation.map(p => BOX_ALIGN_COLORS[p.resilienceMatch.split(' ')[0]] || '#6b7280'),
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

function renderBoxingTechniques() {
  const el = document.getElementById('boxing-techniques');
  const b = evidenceData?.boxingNhiAnalysis;
  if (!el || !b) return;
  el.innerHTML = b.techniqueReconciliation.map(t => `
    <div class="boxing-tech-card">
      <h5>${t.technique}</h5>
      <p><strong>Legend claim:</strong> ${t.legendClaim}</p>
      <p><strong>Resilience data:</strong> ${t.resilienceRank}</p>
      <p class="boxing-tech-verdict">${t.verdict}</p>
      ${typeof tierBadge === 'function' ? tierBadge(t.tier.replace(/[^A-D+]/g, '') || 'B') : `<span class="tier">${t.tier}</span>`}
    </div>`).join('');
}

function renderBoxingClaimsAndLimits() {
  const b = evidenceData?.boxingNhiAnalysis;
  if (!b) return;

  const audit = document.getElementById('boxing-claims-audit');
  if (audit) {
    audit.innerHTML = `<table class="fp-reject-table boxing-table"><thead><tr><th>Claim</th><th>Verdict</th><th>Evidence</th></tr></thead><tbody>
      ${b.claimsAudit.map(c => {
        const cls = c.verdict.includes('CONFIRM') ? 'strong' : c.verdict.includes('REJECT') ? 'reject' : 'partial';
        return `<tr><td>${c.claim}</td><td class="boxing-match-${cls}">${c.verdict}</td><td>${c.evidence}</td></tr>`;
      }).join('')}
    </tbody></table>`;
  }

  const lim = document.getElementById('boxing-limitations');
  if (lim && b.limitations) {
    const l = b.limitations;
    lim.innerHTML = `
      <h4>${l.title}</h4>
      <ul class="boxing-opk-list">${l.items.map(x => `<li>${x}</li>`).join('')}</ul>
      <p class="boxing-hybrid-note"><strong>Hybrid path:</strong> ${l.hybridNote}</p>`;
  }

  const tips = document.getElementById('boxing-survival-tips');
  if (tips && b.survivalTips) {
    tips.innerHTML = `<ol class="fp-rebuild-list">${b.survivalTips.map(s =>
      `<li><strong>${s.tip}</strong> → ${s.mapsTo} <span class="boxing-tip-tier">Tier ${s.tier}</span></li>`
    ).join('')}</ol>`;
  }
}

function renderBoxingDrillsAndVideos() {
  const b = evidenceData?.boxingNhiAnalysis;
  if (!b) return;

  const drills = document.getElementById('boxing-drill-progression');
  if (drills && b.drillProgression) {
    const d = b.drillProgression;
    drills.innerHTML = `
      <h4>${d.title}</h4>
      <p class="chart-explainer"><strong>Prerequisite:</strong> ${d.prerequisite}</p>
      ${d.phases.map(p => `
        <div class="boxing-drill-phase">
          <h5>${p.phase}</h5>
          <span class="boxing-drill-meta">${p.daily || ''}${p.daily && p.weekly ? ' · ' : ''}${p.weekly || ''}</span>
          <ul class="boxing-opk-list">${p.drills.map(x => `<li>${x}</li>`).join('')}</ul>
          <p class="boxing-drill-test"><strong>Exit test:</strong> ${p.exitTest}</p>
        </div>`).join('')}
      <p class="boxing-drill-maint"><strong>Maintenance:</strong> ${d.maintenance}</p>`;
  }

  const videos = document.getElementById('boxing-videos');
  if (videos && b.videoResources) {
    videos.innerHTML = `<ul class="boxing-video-list">${b.videoResources.map(v => `
      <li>
        <a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.title}</a>
        <span class="boxing-video-creator">${v.creator}</span>
        <p>${v.focus}</p>
        <span class="boxing-opk-stat">Tier ${v.tier}</span>
      </li>`).join('')}</ul>`;
  }
}

function renderBoxingStackAndFinal() {
  const b = evidenceData?.boxingNhiAnalysis;
  if (!b) return;

  const stack = document.getElementById('boxing-synthesis-stack');
  if (stack && b.synthesisStack) {
    stack.innerHTML = b.synthesisStack.order.map(s => `
      <div class="boxing-stack-item">
        <span class="boxing-stack-pri">P${s.priority}</span>
        <div>
          <strong>${s.layer}</strong>
          <p>${s.why}</p>
          <span class="boxing-stack-hours">${s.hours}</span>
        </div>
      </div>`).join('');
  }

  const h = document.getElementById('boxing-historical');
  if (h && b.historicalContext) {
    h.innerHTML = `<p>${b.historicalContext.plainEnglish}</p><p style="font-size:0.85rem;margin-top:0.5rem"><em>Note: ${b.historicalContext.note}</em></p>`;
  }

  const v = document.getElementById('boxing-final-verdict');
  const l = document.getElementById('boxing-honest-limits');
  if (v) v.innerHTML = `<p>${b.nhiFinalVerdict}</p>`;
  if (l) l.textContent = b.honestLimits;
}

function renderAllBoxingNhiVisualizations() {
  if (!evidenceData?.boxingNhiAnalysis) return;
  renderBoxingExecutive();
  renderBoxingLegends();
  renderBoxingPrinciples();
  renderBoxingTechniques();
  renderBoxingClaimsAndLimits();
  renderBoxingDrillsAndVideos();
  renderBoxingStackAndFinal();
}