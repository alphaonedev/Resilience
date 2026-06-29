/** Muay Thai self-defense NHI visualizations */

const MT_ALIGN = { STRONG: '#10b981', HIGH: '#10b981', PARTIAL: '#f59e0b', CONFIRMED: '#10b981', REJECTED: '#ef4444', UNMEASURED: '#6b7280' };

function renderMuayThaiExecutive() {
  const m = evidenceData?.muayThaiNhiAnalysis;
  const el = document.getElementById('muaythai-executive');
  if (!el || !m) return;
  el.innerHTML = `<p>${m.executiveSummary}</p>`;
}

function renderMuayThaiHistorical() {
  const m = evidenceData?.muayThaiNhiAnalysis;
  const el = document.getElementById('muaythai-historical');
  if (!el || !m?.historicalContext) return;
  const h = m.historicalContext;
  el.innerHTML = `<p>${h.plainEnglish}</p><p style="font-size:0.85rem;margin-top:0.5rem"><em>Note: ${h.note}</em></p>`;
}

function renderMuayThaiExperts() {
  const m = evidenceData?.muayThaiNhiAnalysis;
  const el = document.getElementById('muaythai-experts');
  if (!el || !m) return;
  el.innerHTML = `
    <blockquote class="muaythai-core-rule">"${m.corePhilosophy}"</blockquote>
    ${m.expertAnalysis.map(e => `
      <div class="muaythai-expert-card">
        <div class="muaythai-expert-header">
          <h4>${e.expert}</h4>
          <span class="muaythai-align-badge">${e.resilienceAlignment} alignment</span>
        </div>
        <p class="muaythai-teaching"><strong>Taught:</strong> ${e.coreTeaching}</p>
        <p class="muaythai-aligns"><strong>✓ Resilience agrees:</strong> ${e.aligns.join(' · ')}</p>
        <p class="muaythai-tensions"><strong>⚠ Tensions:</strong> ${e.tensions.join(' · ')}</p>
        <p class="muaythai-verdict"><strong>NHI:</strong> ${e.nhiVerdict}</p>
      </div>`).join('')}`;
}

function renderMuayThaiThreeTier() {
  const m = evidenceData?.muayThaiNhiAnalysis;
  const el = document.getElementById('muaythai-three-tier');
  if (!el || !m) return;
  el.innerHTML = `<div class="muaythai-tier-grid">${m.threeTierStrategy.map(t => `
    <div class="muaythai-tier-card" style="--tier-color:${MT_ALIGN[t.resilienceMatch.split(' ')[0]] || '#d97706'}">
      <span class="muaythai-tier-label">Tier ${t.tier}</span>
      <p><strong>Muay Thai:</strong> ${t.muayThai}</p>
      <p><strong>Resilience:</strong> ${t.resilienceMap}</p>
      <span class="muaythai-match muaythai-match-${t.resilienceMatch.toLowerCase().replace(/[^a-z]/g, '')}">${t.resilienceMatch}</span>
      <p class="muaythai-tier-ev">${t.evidence}</p>
    </div>`).join('')}
  </div>`;
}

function renderMuayThaiTactics() {
  const ctx = document.getElementById('muayThaiTacticsChart');
  const el = document.getElementById('muaythai-tactics-table');
  const m = evidenceData?.muayThaiNhiAnalysis;
  if (!m) return;

  if (el) {
    el.innerHTML = `<table class="fp-reject-table muaythai-table">
      <thead><tr><th>Tactic</th><th>Match</th><th>Evidence</th><th>Tier</th></tr></thead>
      <tbody>${m.tacticReconciliation.map(t => `
        <tr>
          <td>${t.tactic}</td>
          <td><span class="muaythai-match muaythai-match-${t.resilienceMatch.toLowerCase().replace(/[^a-z]/g, '')}">${t.resilienceMatch}</span></td>
          <td>${t.evidence}</td>
          <td><span class="tier tier-${t.tier.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase() || 'b'}">${t.tier}</span></td>
        </tr>`).join('')}
      </tbody></table>`;
  }

  if (ctx) {
    const score = { STRONG: 5, HIGH: 5, PARTIAL: 3 };
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: m.tacticReconciliation.map(t => t.tactic.substring(0, 26)),
        datasets: [{
          label: 'Alignment',
          data: m.tacticReconciliation.map(t => score[t.resilienceMatch.split(' ')[0]] || 3),
          backgroundColor: m.tacticReconciliation.map(t => MT_ALIGN[t.resilienceMatch.split(' ')[0]] || '#6b7280'),
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: { x: { min: 0, max: 5 }, y: { ticks: { font: { size: 8 } } } }
      }
    });
  }
}

function renderMuayThaiTechniques() {
  const m = evidenceData?.muayThaiNhiAnalysis;
  const el = document.getElementById('muaythai-techniques');
  if (!el || !m?.explicitTechniques) return;
  el.innerHTML = m.explicitTechniques.map(t => `
    <div class="muaythai-tech-card">
      <h5>${t.name}</h5>
      <p class="muaythai-tech-role">${t.role}</p>
      <ol class="muaythai-exec-list">${t.execution.map(s => `<li>${s}</li>`).join('')}</ol>
      <p><strong>Targets:</strong> ${t.targets.join(' · ')}</p>
      <p><strong>Scenario:</strong> ${t.scenario}</p>
      <p><strong>Data:</strong> ${t.resilienceRank}</p>
      <p class="muaythai-verdict-line">${t.verdict} <span class="tier tier-${t.tier.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase()}">${t.tier}</span></p>
    </div>`).join('');
}

function renderMuayThaiScenarios() {
  const m = evidenceData?.muayThaiNhiAnalysis;
  const el = document.getElementById('muaythai-scenarios');
  if (!el || !m?.scenarioResponses) return;
  el.innerHTML = `<table class="fp-reject-table muaythai-table">
    <thead><tr><th>Scenario</th><th>Response</th><th>Match</th><th>Tier</th></tr></thead>
    <tbody>${m.scenarioResponses.map(s => `
      <tr>
        <td>${s.scenario}</td>
        <td>${s.response}</td>
        <td class="muaythai-match-${s.resilienceMatch.toLowerCase().includes('strong') ? 'strong' : 'partial'}">${s.resilienceMatch}</td>
        <td><span class="tier tier-${s.tier.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase()}">${s.tier}</span></td>
      </tr>`).join('')}
    </tbody></table>`;
}

function renderMuayThaiIntegration() {
  const m = evidenceData?.muayThaiNhiAnalysis;
  const el = document.getElementById('muaythai-integration');
  if (!el || !m?.integrationStack) return;
  el.innerHTML = m.integrationStack.map(c => `
    <div class="muaythai-compare-card">
      <h5>+ ${c.system}</h5>
      <p><strong>Overlap:</strong> ${c.overlap}</p>
      <p><strong>Muay Thai adds:</strong> ${c.muayThaiAdds}</p>
      <p class="muaythai-fit">${c.resilienceFit}</p>
    </div>`).join('');
}

function renderMuayThaiClaimsDrillsStack() {
  const m = evidenceData?.muayThaiNhiAnalysis;
  if (!m) return;

  const audit = document.getElementById('muaythai-claims-audit');
  if (audit) {
    audit.innerHTML = `<table class="fp-reject-table muaythai-table"><thead><tr><th>Claim</th><th>Verdict</th><th>Evidence</th></tr></thead><tbody>
      ${m.claimsAudit.map(c => {
        const cls = c.verdict.includes('CONFIRM') ? 'strong' : c.verdict.includes('REJECT') || c.verdict.includes('UNMEAS') ? 'reject' : 'partial';
        return `<tr><td>${c.claim}</td><td class="muaythai-match-${cls}">${c.verdict}</td><td>${c.evidence}</td></tr>`;
      }).join('')}
    </tbody></table>`;
  }

  const drills = document.getElementById('muaythai-drills');
  if (drills && m.drillProgression) {
    const d = m.drillProgression;
    drills.innerHTML = `
      <h4>${d.title}</h4>
      <p class="chart-explainer"><strong>Prerequisite:</strong> ${d.prerequisite}</p>
      ${d.phases.map(p => `
        <div class="muaythai-drill-phase">
          <h5>${p.phase}</h5>
          <span class="muaythai-drill-meta">${p.daily || ''}${p.daily && p.weekly ? ' · ' : ''}${p.weekly || ''}</span>
          <ul class="muaythai-list">${p.drills.map(x => `<li>${x}</li>`).join('')}</ul>
          <p class="muaythai-drill-test"><strong>Exit test:</strong> ${p.exitTest}</p>
        </div>`).join('')}
      <p class="muaythai-drill-maint"><strong>Maintenance:</strong> ${d.maintenance}</p>`;
  }

  const stack = document.getElementById('muaythai-synthesis-stack');
  if (stack && m.synthesisStack) {
    stack.innerHTML = m.synthesisStack.order.map(s => `
      <div class="muaythai-stack-item">
        <span class="muaythai-stack-pri">P${s.priority}</span>
        <div><strong>${s.layer}</strong><p>${s.why}</p><span class="muaythai-stack-hours">${s.hours}</span></div>
      </div>`).join('');
  }

  const videos = document.getElementById('muaythai-videos');
  if (videos && m.videoResources) {
    videos.innerHTML = `<ul class="muaythai-video-list">${m.videoResources.map(v => `
      <li><a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.title}</a>
        <span class="muaythai-video-creator">${v.creator}</span>
        <p>${v.focus}</p><span class="muaythai-stat">Tier ${v.tier}</span></li>`).join('')}</ul>`;
  }
}

function renderMuayThaiFinal() {
  const m = evidenceData?.muayThaiNhiAnalysis;
  if (!m) return;
  const v = document.getElementById('muaythai-final-verdict');
  const l = document.getElementById('muaythai-honest-limits');
  if (v) v.innerHTML = `<p>${m.nhiFinalVerdict}</p>`;
  if (l) l.textContent = m.honestLimits;
}

function renderAllMuayThaiNhiVisualizations() {
  if (!evidenceData?.muayThaiNhiAnalysis) return;
  renderMuayThaiExecutive();
  renderMuayThaiHistorical();
  renderMuayThaiExperts();
  renderMuayThaiThreeTier();
  renderMuayThaiTactics();
  renderMuayThaiTechniques();
  renderMuayThaiScenarios();
  renderMuayThaiIntegration();
  renderMuayThaiClaimsDrillsStack();
  renderMuayThaiFinal();
}