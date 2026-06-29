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

function renderOnePunchOneKick() {
  const op = evidenceData?.karateNhiAnalysis?.onePunchOneKick;
  if (!op) return;

  const el = document.getElementById('karate-one-punch-kick');
  if (el) {
    const p = op.techniques.straightPunch;
    const k = op.techniques.frontKick;
    el.innerHTML = `
      <div class="karate-opk-quote">
        <blockquote>"${op.sources[0].quote}"</blockquote>
        <cite>— ${op.sources[0].figure}</cite>
      </div>
      <div class="karate-opk-duo">
        <div class="karate-opk-card">
          <h4>Straight Punch</h4>
          <p>${p.karateNames.join(' · ')}</p>
          <p>${p.plainEnglish}</p>
          <span class="karate-opk-stat">${p.peakForceN}N lab · Resilience score ${p.resilienceScore}/5</span>
        </div>
        <div class="karate-opk-card">
          <h4>Front Kick</h4>
          <p>${k.karateNames.join(' · ')}</p>
          <p>${k.plainEnglish}</p>
          <span class="karate-opk-stat">Teep ${k.resilienceScore}</span>
        </div>
      </div>
      <div class="karate-opk-combos">
        <h5>Classic combos → Resilience mapping</h5>
        ${op.combos.map(c => `<div class="karate-combo-row"><strong>${c.sequence}</strong><span>${c.resilienceFit} — ${c.mapsTo}</span><em>${c.exitRequired}</em></div>`).join('')}
      </div>`;
  }

  const audit = document.getElementById('karate-claims-audit');
  if (audit) {
    audit.innerHTML = `<table class="fp-reject-table karate-table"><thead><tr><th>Claim</th><th>Verdict</th><th>Evidence</th></tr></thead><tbody>
      ${op.claimsAudit.map(c => `<tr><td>${c.claim}</td><td class="karate-match-${c.verdict.includes('CONFIRM') ? 'strong' : c.verdict.includes('REJECT') ? 'partial' : 'partial'}">${c.verdict}</td><td>${c.evidence}</td></tr>`).join('')}
    </tbody></table>`;
  }

  const drill = document.getElementById('karate-minimal-drill');
  if (drill) {
    drill.innerHTML = `
      <p class="fp-tagline" style="font-size:0.95rem!important">${op.minimalWeaponsStack.oneSentence}</p>
      <ol class="fp-rebuild-list">${op.minimalWeaponsStack.order.map(s => `<li><strong>${s.skill}</strong> (${s.hours}) — Tier ${s.tier}</li>`).join('')}</ol>`;
  }

  const why = document.getElementById('karate-opk-why');
  if (why && op.whyTheseTwo) {
    const w = op.whyTheseTwo;
    why.innerHTML = `
      <h4>Why Straight Punch + Front Kick Cover the Contact Phase</h4>
      <p class="chart-explainer">${w.plainEnglish}</p>
      <div class="karate-opk-duo">
        <div class="karate-opk-card">
          <h4>Straight Punch</h4>
          <ul class="karate-opk-list">${w.straightPunch.map(x => `<li>${x}</li>`).join('')}</ul>
        </div>
        <div class="karate-opk-card">
          <h4>Front Kick</h4>
          <ul class="karate-opk-list">${w.frontKick.map(x => `<li>${x}</li>`).join('')}</ul>
        </div>
      </div>`;
  }

  const drills = document.getElementById('karate-opk-drills');
  if (drills && op.drillProgression) {
    const d = op.drillProgression;
    drills.innerHTML = `
      <h4>${d.title}</h4>
      <p class="chart-explainer"><strong>Prerequisite:</strong> ${d.prerequisite}</p>
      ${d.phases.map(p => `
        <div class="karate-drill-phase">
          <h5>${p.phase}</h5>
          <span class="karate-drill-meta">${p.daily || ''}${p.daily && p.weekly ? ' · ' : ''}${p.weekly || ''}</span>
          <ul class="karate-opk-list">${p.drills.map(x => `<li>${x}</li>`).join('')}</ul>
          <p class="karate-drill-test"><strong>Exit test:</strong> ${p.exitTest}</p>
        </div>`).join('')}
      <p class="karate-drill-maint"><strong>Maintenance:</strong> ${d.maintenance}</p>`;
  }

  const bunkai = document.getElementById('karate-opk-bubishi');
  if (bunkai && op.bubishiMotobuCounters) {
    const b = op.bubishiMotobuCounters;
    bunkai.innerHTML = `
      <p class="chart-explainer">${b.principle}</p>
      <table class="fp-reject-table karate-table">
        <thead><tr><th>Attack</th><th>Motobu/Bubishi</th><th>Minimal weapon</th><th>Fit</th></tr></thead>
        <tbody>${b.counters.map(c => `
          <tr>
            <td>${c.attack}</td>
            <td>${c.motobuBubishi}</td>
            <td><strong>${c.minimalWeapon}</strong></td>
            <td><span class="karate-match karate-match-${c.resilienceFit.toLowerCase().includes('strong') ? 'strong' : 'partial'}">${c.resilienceFit.split(' ')[0]}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <p class="karate-drill-test" style="margin-top:0.75rem">${b.trainingNote}</p>`;
  }

  const videos = document.getElementById('karate-opk-videos');
  if (videos && op.videoResources) {
    videos.innerHTML = `<ul class="karate-video-list">${op.videoResources.map(v => `
      <li>
        <a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.title}</a>
        <span class="karate-video-creator">${v.creator}</span>
        <p>${v.focus}</p>
        <span class="karate-opk-stat">Tier ${v.tier}</span>
      </li>`).join('')}</ul>`;
  }

  const v = document.getElementById('karate-opk-verdict');
  if (v) v.innerHTML = `<p>${op.nhiVerdict}</p><p style="font-size:0.85rem;margin-top:0.75rem;color:var(--text-muted)">${op.honestLimits}</p>`;
}

function renderAllKarateNhiVisualizations() {
  if (!evidenceData?.karateNhiAnalysis) return;
  renderKarateExecutive();
  renderKarateMasters();
  renderKaratePrinciples();
  renderKarateTechniques();
  renderKarateDrift();
  renderKarateStack();
  renderOnePunchOneKick();
  renderKarateFinal();
}