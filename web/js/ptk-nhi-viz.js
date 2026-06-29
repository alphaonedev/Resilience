/** Pekiti-Tirsia Kali (PTK) self-defense NHI visualizations */

const PTK_ALIGN = { STRONG: '#10b981', HIGH: '#10b981', PARTIAL: '#f59e0b', CONFIRMED: '#10b981', REJECTED: '#ef4444', UNMEASURED: '#6b7280' };

function renderPtkExecutive() {
  const p = evidenceData?.ptkNhiAnalysis;
  const el = document.getElementById('ptk-executive');
  if (!el || !p) return;
  el.innerHTML = `<p>${p.executiveSummary}</p>`;
}

function renderPtkHistorical() {
  const p = evidenceData?.ptkNhiAnalysis;
  const el = document.getElementById('ptk-historical');
  if (!el || !p?.historicalContext) return;
  const h = p.historicalContext;
  el.innerHTML = `<p>${h.plainEnglish}</p><p style="font-size:0.85rem;margin-top:0.5rem"><em>Note: ${h.note}</em></p>`;
}

function renderPtkExperts() {
  const p = evidenceData?.ptkNhiAnalysis;
  const el = document.getElementById('ptk-experts');
  if (!el || !p) return;
  el.innerHTML = `
    <blockquote class="ptk-core-rule">"${p.corePhilosophy}"</blockquote>
    ${p.expertAnalysis.map(e => `
      <div class="ptk-expert-card">
        <div class="ptk-expert-header">
          <h4>${e.expert}</h4>
          <span class="ptk-align-badge">${e.resilienceAlignment} alignment</span>
        </div>
        <p class="ptk-teaching"><strong>Taught:</strong> ${e.coreTeaching}</p>
        <p class="ptk-aligns"><strong>✓ Resilience agrees:</strong> ${e.aligns.join(' · ')}</p>
        <p class="ptk-tensions"><strong>⚠ Tensions:</strong> ${e.tensions.join(' · ')}</p>
        <p class="ptk-verdict"><strong>NHI:</strong> ${e.nhiVerdict}</p>
      </div>`).join('')}`;
}

function renderPtkThreeTier() {
  const p = evidenceData?.ptkNhiAnalysis;
  const el = document.getElementById('ptk-three-tier');
  if (!el || !p) return;
  el.innerHTML = `<div class="ptk-tier-grid">${p.threeTierStrategy.map(t => `
    <div class="ptk-tier-card" style="--tier-color:${PTK_ALIGN[t.resilienceMatch.split(' ')[0]] || '#8b5cf6'}">
      <span class="ptk-tier-label">Tier ${t.tier}</span>
      <p><strong>PTK:</strong> ${t.ptk}</p>
      <p><strong>Resilience:</strong> ${t.resilienceMap}</p>
      <span class="ptk-match ptk-match-${t.resilienceMatch.toLowerCase().replace(/[^a-z]/g, '')}">${t.resilienceMatch}</span>
      <p class="ptk-tier-ev">${t.evidence}</p>
    </div>`).join('')}
  </div>`;
}

function renderPtkTactics() {
  const ctx = document.getElementById('ptkTacticsChart');
  const el = document.getElementById('ptk-tactics-table');
  const p = evidenceData?.ptkNhiAnalysis;
  if (!p) return;

  if (el) {
    el.innerHTML = `<table class="fp-reject-table ptk-table">
      <thead><tr><th>Tactic</th><th>Match</th><th>Evidence</th><th>Tier</th></tr></thead>
      <tbody>${p.tacticReconciliation.map(t => `
        <tr>
          <td>${t.tactic}</td>
          <td><span class="ptk-match ptk-match-${t.resilienceMatch.toLowerCase().replace(/[^a-z]/g, '')}">${t.resilienceMatch}</span></td>
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
        labels: p.tacticReconciliation.map(t => t.tactic.substring(0, 26)),
        datasets: [{
          label: 'Alignment',
          data: p.tacticReconciliation.map(t => score[t.resilienceMatch.split(' ')[0]] || 3),
          backgroundColor: p.tacticReconciliation.map(t => PTK_ALIGN[t.resilienceMatch.split(' ')[0]] || '#6b7280'),
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

function renderPtkAngles() {
  const p = evidenceData?.ptkNhiAnalysis;
  const el = document.getElementById('ptk-angles');
  if (!el || !p?.fiveAnglesFramework) return;
  el.innerHTML = `<table class="fp-reject-table ptk-table">
    <thead><tr><th>Angle</th><th>Weapon</th><th>Empty Hand</th><th>Resilience Rank</th><th>Tier</th></tr></thead>
    <tbody>${p.fiveAnglesFramework.map(a => `
      <tr>
        <td><strong>${a.angle}</strong></td>
        <td>${a.weapon}</td>
        <td>${a.emptyHand}</td>
        <td>${a.resilienceRank}</td>
        <td><span class="tier tier-${a.tier.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase()}">${a.tier}</span></td>
      </tr>`).join('')}
    </tbody></table>`;
}

function renderPtkTechniques() {
  const p = evidenceData?.ptkNhiAnalysis;
  const el = document.getElementById('ptk-techniques');
  if (!el || !p?.explicitTechniques) return;
  el.innerHTML = p.explicitTechniques.map(t => `
    <div class="ptk-tech-card">
      <h5>${t.name}</h5>
      <p class="ptk-tech-role">${t.role}</p>
      <ol class="ptk-exec-list">${t.execution.map(s => `<li>${s}</li>`).join('')}</ol>
      <p><strong>Targets:</strong> ${t.targets.join(' · ')}</p>
      <p><strong>Scenario:</strong> ${t.scenario}</p>
      <p><strong>Data:</strong> ${t.resilienceRank}</p>
      <p class="ptk-verdict-line">${t.verdict} <span class="tier tier-${t.tier.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase()}">${t.tier}</span></p>
    </div>`).join('');
}

function renderPtkScenarios() {
  const p = evidenceData?.ptkNhiAnalysis;
  const el = document.getElementById('ptk-scenarios');
  if (!el || !p?.scenarioResponses) return;
  el.innerHTML = `<table class="fp-reject-table ptk-table">
    <thead><tr><th>Scenario</th><th>Response</th><th>Match</th><th>Tier</th></tr></thead>
    <tbody>${p.scenarioResponses.map(s => `
      <tr>
        <td>${s.scenario}</td>
        <td>${s.response}</td>
        <td class="ptk-match-${s.resilienceMatch.toLowerCase().includes('strong') ? 'strong' : 'partial'}">${s.resilienceMatch}</td>
        <td><span class="tier tier-${s.tier.replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase()}">${s.tier}</span></td>
      </tr>`).join('')}
    </tbody></table>`;
}

function renderPtkIntegration() {
  const p = evidenceData?.ptkNhiAnalysis;
  const el = document.getElementById('ptk-integration');
  if (!el || !p?.integrationStack) return;
  el.innerHTML = p.integrationStack.map(c => `
    <div class="ptk-compare-card">
      <h5>+ ${c.system}</h5>
      <p><strong>Overlap:</strong> ${c.overlap}</p>
      <p><strong>PTK adds:</strong> ${c.ptkAdds}</p>
      <p class="ptk-fit">${c.resilienceFit}</p>
    </div>`).join('');
}

function renderPtkClaimsDrillsStack() {
  const p = evidenceData?.ptkNhiAnalysis;
  if (!p) return;

  const audit = document.getElementById('ptk-claims-audit');
  if (audit) {
    audit.innerHTML = `<table class="fp-reject-table ptk-table"><thead><tr><th>Claim</th><th>Verdict</th><th>Evidence</th></tr></thead><tbody>
      ${p.claimsAudit.map(c => {
        const cls = c.verdict.includes('CONFIRM') ? 'strong' : c.verdict.includes('REJECT') || c.verdict.includes('UNMEAS') ? 'reject' : 'partial';
        return `<tr><td>${c.claim}</td><td class="ptk-match-${cls}">${c.verdict}</td><td>${c.evidence}</td></tr>`;
      }).join('')}
    </tbody></table>`;
  }

  const drills = document.getElementById('ptk-drills');
  if (drills && p.drillProgression) {
    const d = p.drillProgression;
    drills.innerHTML = `
      <h4>${d.title}</h4>
      <p class="chart-explainer"><strong>Prerequisite:</strong> ${d.prerequisite}</p>
      ${d.phases.map(ph => `
        <div class="ptk-drill-phase">
          <h5>${ph.phase}</h5>
          <span class="ptk-drill-meta">${ph.daily || ''}${ph.daily && ph.weekly ? ' · ' : ''}${ph.weekly || ''}</span>
          <ul class="ptk-list">${ph.drills.map(x => `<li>${x}</li>`).join('')}</ul>
          <p class="ptk-drill-test"><strong>Exit test:</strong> ${ph.exitTest}</p>
        </div>`).join('')}
      <p class="ptk-drill-maint"><strong>Maintenance:</strong> ${d.maintenance}</p>`;
  }

  const stack = document.getElementById('ptk-synthesis-stack');
  if (stack && p.synthesisStack) {
    stack.innerHTML = p.synthesisStack.order.map(s => `
      <div class="ptk-stack-item">
        <span class="ptk-stack-pri">P${s.priority}</span>
        <div><strong>${s.layer}</strong><p>${s.why}</p><span class="ptk-stack-hours">${s.hours}</span></div>
      </div>`).join('');
  }

  const videos = document.getElementById('ptk-videos');
  if (videos && p.videoResources) {
    videos.innerHTML = `<ul class="ptk-video-list">${p.videoResources.map(v => `
      <li><a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.title}</a>
        <span class="ptk-video-creator">${v.creator}</span>
        <p>${v.focus}</p><span class="ptk-stat">Tier ${v.tier}</span></li>`).join('')}</ul>`;
  }
}

function renderPtkFinal() {
  const p = evidenceData?.ptkNhiAnalysis;
  if (!p) return;
  const v = document.getElementById('ptk-final-verdict');
  const l = document.getElementById('ptk-honest-limits');
  if (v) v.innerHTML = `<p>${p.nhiFinalVerdict}</p>`;
  if (l) l.textContent = p.honestLimits;
}

function renderAllPtkNhiVisualizations() {
  if (!evidenceData?.ptkNhiAnalysis) return;
  renderPtkExecutive();
  renderPtkHistorical();
  renderPtkExperts();
  renderPtkThreeTier();
  renderPtkTactics();
  renderPtkAngles();
  renderPtkTechniques();
  renderPtkScenarios();
  renderPtkIntegration();
  renderPtkClaimsDrillsStack();
  renderPtkFinal();
}