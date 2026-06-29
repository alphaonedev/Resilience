/** Kicking experts NHI reconciliation visualizations */

const KICK_ALIGN_COLORS = { STRONG: '#10b981', HIGH: '#10b981', 'MEDIUM-HIGH': '#3b82f6', PARTIAL: '#f59e0b', CONDITIONAL: '#f59e0b', CONFIRMED: '#10b981', REJECTED: '#ef4444' };

function renderKickingExecutive() {
  const k = evidenceData?.kickingNhiAnalysis;
  const el = document.getElementById('kicking-executive');
  if (!el || !k) return;

  const d = k.executiveSummaryDistill;
  if (!d) {
    el.innerHTML = `<p>${k.executiveSummary}</p>`;
    return;
  }

  el.innerHTML = `
    <div class="kicking-nhi-distill">
      <p class="kicking-nhi-lead">${d.lead}</p>
      <h4 class="kicking-nhi-heading">${d.consensusTitle}</h4>
      <ul class="kicking-nhi-list">${d.consensus.map(t => `<li>${t}</li>`).join('')}</ul>
      <h4 class="kicking-nhi-heading">${d.rankingsTitle}</h4>
      <ul class="kicking-nhi-list kicking-nhi-list-rank">${d.rankings.map(t => `<li>${t}</li>`).join('')}</ul>
      <h4 class="kicking-nhi-heading">${d.resilienceAddsTitle}</h4>
      <ul class="kicking-nhi-list">${d.resilienceAdds.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>`;
}

function renderKickingExperts() {
  const el = document.getElementById('kicking-experts');
  const k = evidenceData?.kickingNhiAnalysis;
  if (!el || !k) return;
  el.innerHTML = k.expertAnalysis.map(m => `
    <div class="kicking-expert-card" style="--align-color:${KICK_ALIGN_COLORS[m.resilienceAlignment.split(' ')[0]] || '#22c55e'}">
      <div class="kicking-expert-header">
        <h4>${m.expert}</h4>
        <span class="kicking-align-badge">${m.resilienceAlignment} alignment</span>
      </div>
      <p class="kicking-teaching"><strong>Taught:</strong> ${m.coreTeaching}</p>
      <p class="kicking-aligns"><strong>✓ Resilience agrees:</strong> ${m.aligns.join(' · ')}</p>
      <p class="kicking-tensions"><strong>⚠ Tensions:</strong> ${m.tensions.join(' · ')}</p>
      <p class="kicking-verdict"><strong>NHI:</strong> ${m.nhiVerdict}</p>
    </div>`).join('');
}

function renderKickingPrinciples() {
  const ctx = document.getElementById('kickingPrinciplesChart');
  const el = document.getElementById('kicking-principles-table');
  const k = evidenceData?.kickingNhiAnalysis;
  if (!k) return;

  if (el) {
    el.innerHTML = `<table class="fp-reject-table kicking-table">
      <thead><tr><th>Kicking principle</th><th>Match</th><th>Resilience evidence</th><th>Tier</th></tr></thead>
      <tbody>${k.principleReconciliation.map(p => `
        <tr>
          <td>${p.kickingPrinciple}</td>
          <td><span class="kicking-match kicking-match-${p.resilienceMatch.toLowerCase().replace(/[^a-z]/g, '')}">${p.resilienceMatch}</span></td>
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
        labels: k.principleReconciliation.map(p => p.kickingPrinciple.substring(0, 28)),
        datasets: [{
          label: 'Alignment strength',
          data: k.principleReconciliation.map(p => matchScore[p.resilienceMatch.split(' ')[0]] || 3),
          backgroundColor: k.principleReconciliation.map(p => KICK_ALIGN_COLORS[p.resilienceMatch.split(' ')[0]] || '#6b7280'),
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

function renderKickingTechniques() {
  const el = document.getElementById('kicking-techniques');
  const k = evidenceData?.kickingNhiAnalysis;
  if (!el || !k) return;
  el.innerHTML = k.techniqueReconciliation.map(t => `
    <div class="kicking-tech-card">
      <h5>${t.technique}</h5>
      <p><strong>Expert claim:</strong> ${t.expertClaim}</p>
      <p><strong>Resilience data:</strong> ${t.resilienceRank}</p>
      <p class="kicking-tech-verdict">${t.verdict}</p>
      ${typeof tierBadge === 'function' ? tierBadge(t.tier.replace(/[^A-D+]/g, '') || 'B') : `<span class="tier">${t.tier}</span>`}
    </div>`).join('');
}

function renderKickingConsensus() {
  const k = evidenceData?.kickingNhiAnalysis;
  if (!k?.expertConsensus) return;

  const el = document.getElementById('kicking-consensus');
  if (el) {
    const c = k.expertConsensus;
    el.innerHTML = `
      <h4>${c.title}</h4>
      <div class="kicking-top-kicks">${c.topKicks.map(t => `
        <div class="kicking-top-kick-card">
          <span class="kicking-top-rank">#${t.rank}</span>
          <div>
            <strong>${t.kick}</strong>
            <p class="kicking-experts-line">${t.experts.join(' · ')}</p>
            <p>${t.role}</p>
            <span class="kicking-stat">${t.resilienceRank} · Tier ${t.tier}</span>
          </div>
        </div>`).join('')}
      </div>
      <div class="kicking-avoid-box">
        <h5>Avoid as primary</h5>
        ${c.avoidPrimary.map(a => `<p><strong>${a.kick}</strong> — ${a.why}. <em>${a.exception}</em></p>`).join('')}
      </div>
      <ul class="kicking-rules-list">${c.rules.map(r => `<li>${r}</li>`).join('')}</ul>`;
  }
}

function renderKickingClaimsDrillsVideos() {
  const k = evidenceData?.kickingNhiAnalysis;
  if (!k) return;

  const audit = document.getElementById('kicking-claims-audit');
  if (audit) {
    audit.innerHTML = `<table class="fp-reject-table kicking-table"><thead><tr><th>Claim</th><th>Verdict</th><th>Evidence</th></tr></thead><tbody>
      ${k.claimsAudit.map(c => {
        const cls = c.verdict.includes('CONFIRM') ? 'strong' : c.verdict.includes('REJECT') ? 'reject' : 'partial';
        return `<tr><td>${c.claim}</td><td class="kicking-match-${cls}">${c.verdict}</td><td>${c.evidence}</td></tr>`;
      }).join('')}
    </tbody></table>`;
  }

  const drills = document.getElementById('kicking-drill-progression');
  if (drills && k.drillProgression) {
    const d = k.drillProgression;
    drills.innerHTML = `
      <h4>${d.title}</h4>
      <p class="chart-explainer"><strong>Prerequisite:</strong> ${d.prerequisite}</p>
      ${d.phases.map(p => `
        <div class="kicking-drill-phase">
          <h5>${p.phase}</h5>
          <span class="kicking-drill-meta">${p.daily || ''}${p.daily && p.weekly ? ' · ' : ''}${p.weekly || ''}</span>
          <ul class="kicking-list">${p.drills.map(x => `<li>${x}</li>`).join('')}</ul>
          <p class="kicking-drill-test"><strong>Exit test:</strong> ${p.exitTest}</p>
        </div>`).join('')}
      <p class="kicking-drill-maint"><strong>Maintenance:</strong> ${d.maintenance}</p>`;
  }

  const videos = document.getElementById('kicking-videos');
  if (videos && k.videoResources) {
    videos.innerHTML = `<ul class="kicking-video-list">${k.videoResources.map(v => `
      <li>
        <a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.title}</a>
        <span class="kicking-video-creator">${v.creator}</span>
        <p>${v.focus}</p>
        <span class="kicking-stat">Tier ${v.tier}</span>
      </li>`).join('')}</ul>`;
  }

  const stack = document.getElementById('kicking-synthesis-stack');
  if (stack && k.synthesisStack) {
    stack.innerHTML = k.synthesisStack.order.map(s => `
      <div class="kicking-stack-item">
        <span class="kicking-stack-pri">P${s.priority}</span>
        <div>
          <strong>${s.layer}</strong>
          <p>${s.why}</p>
          <span class="kicking-stack-hours">${s.hours}</span>
        </div>
      </div>`).join('');
  }
}

function renderKickingFinal() {
  const k = evidenceData?.kickingNhiAnalysis;
  if (!k) return;

  const h = document.getElementById('kicking-historical');
  if (h && k.historicalContext) {
    h.innerHTML = `<p>${k.historicalContext.plainEnglish}</p><p style="font-size:0.85rem;margin-top:0.5rem"><em>Note: ${k.historicalContext.note}</em></p>`;
  }

  const v = document.getElementById('kicking-final-verdict');
  const l = document.getElementById('kicking-honest-limits');
  if (v) v.innerHTML = `<p>${k.nhiFinalVerdict}</p>`;
  if (l) l.textContent = k.honestLimits;
}

function renderAllKickingNhiVisualizations() {
  if (!evidenceData?.kickingNhiAnalysis) return;
  renderKickingExecutive();
  renderKickingExperts();
  renderKickingPrinciples();
  renderKickingTechniques();
  renderKickingConsensus();
  renderKickingClaimsDrillsVideos();
  renderKickingFinal();
}