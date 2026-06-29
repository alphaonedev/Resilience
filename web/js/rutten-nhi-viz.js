/** Bas Rutten Lethal Street Fighting NHI visualizations */

const RUT_ALIGN = { STRONG: '#10b981', HIGH: '#10b981', PARTIAL: '#f59e0b', CONFIRMED: '#10b981', REJECTED: '#ef4444', UNMEASURED: '#6b7280' };

function renderRuttenExecutive() {
  const r = evidenceData?.ruttenNhiAnalysis;
  const el = document.getElementById('rutten-executive');
  if (!el || !r) return;
  el.innerHTML = `<p>${r.executiveSummary}</p>`;
}

function renderRuttenHistorical() {
  const r = evidenceData?.ruttenNhiAnalysis;
  const el = document.getElementById('rutten-historical');
  if (!el || !r?.historicalContext) return;
  const h = r.historicalContext;
  el.innerHTML = `<p>${h.plainEnglish}</p><p style="font-size:0.85rem;margin-top:0.5rem"><em>Note: ${h.note}</em></p>`;
}

function renderRuttenThreeTier() {
  const r = evidenceData?.ruttenNhiAnalysis;
  const el = document.getElementById('rutten-three-tier');
  if (!el || !r) return;
  el.innerHTML = `
    <blockquote class="rutten-core-rule">"${r.coreRule}"</blockquote>
    <div class="rutten-tier-grid">${r.threeTierStrategy.map(t => `
      <div class="rutten-tier-card" style="--tier-color:${RUT_ALIGN[t.resilienceMatch.split(' ')[0]] || '#f97316'}">
        <span class="rutten-tier-label">Tier ${t.tier}</span>
        <p><strong>Rutten:</strong> ${t.rutten}</p>
        <p><strong>Resilience:</strong> ${t.resilienceMap}</p>
        <span class="rutten-match rutten-match-${t.resilienceMatch.toLowerCase().replace(/[^a-z]/g, '')}">${t.resilienceMatch}</span>
        <p class="rutten-tier-ev">${t.evidence}</p>
      </div>`).join('')}
    </div>`;
}

function renderRuttenTactics() {
  const ctx = document.getElementById('ruttenTacticsChart');
  const el = document.getElementById('rutten-tactics-table');
  const r = evidenceData?.ruttenNhiAnalysis;
  if (!r) return;

  if (el) {
    el.innerHTML = `<table class="fp-reject-table rutten-table">
      <thead><tr><th>Tactic</th><th>Match</th><th>Evidence</th><th>Tier</th></tr></thead>
      <tbody>${r.tacticReconciliation.map(t => `
        <tr>
          <td>${t.tactic}</td>
          <td><span class="rutten-match rutten-match-${t.resilienceMatch.toLowerCase().replace(/[^a-z]/g, '')}">${t.resilienceMatch}</span></td>
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
        labels: r.tacticReconciliation.map(t => t.tactic.substring(0, 24)),
        datasets: [{
          label: 'Alignment',
          data: r.tacticReconciliation.map(t => score[t.resilienceMatch.split(' ')[0]] || 3),
          backgroundColor: r.tacticReconciliation.map(t => RUT_ALIGN[t.resilienceMatch.split(' ')[0]] || '#6b7280'),
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

function renderRuttenArsenal() {
  const r = evidenceData?.ruttenNhiAnalysis;
  const el = document.getElementById('rutten-arsenal');
  if (!el || !r?.techniqueArsenal) return;
  const a = r.techniqueArsenal;
  el.innerHTML = `
    ${a.emphasized.map(c => `
      <div class="rutten-arsenal-card">
        <h5>${c.category}</h5>
        <p>${c.techniques.join(' · ')}</p>
        <p><strong>Data:</strong> ${c.resilienceRank}</p>
        <p class="rutten-verdict-line">${c.verdict}</p>
      </div>`).join('')}
    <p class="rutten-curriculum-note"><strong>Resilience distill:</strong> ${a.curriculumNote}</p>`;
}

function renderRuttenMindsetSpirit() {
  const r = evidenceData?.ruttenNhiAnalysis;
  if (!r) return;

  const m = document.getElementById('rutten-mindset');
  if (m) {
    m.innerHTML = `<table class="fp-reject-table rutten-table"><thead><tr><th>Mindset</th><th>Match</th><th>Evidence</th></tr></thead><tbody>
      ${r.mindsetReconciliation.map(x => `
        <tr><td>${x.mindset}</td><td class="rutten-match-${x.resilienceMatch.toLowerCase().includes('strong') ? 'strong' : 'partial'}">${x.resilienceMatch}</td><td>${x.evidence}</td></tr>`).join('')}
    </tbody></table>`;
  }

  const s = document.getElementById('rutten-spiritual');
  if (s && r.spiritualDimension) {
    const sp = r.spiritualDimension;
    s.innerHTML = `
      <p><strong>Rutten:</strong> ${sp.ruttenTeaching}</p>
      <p><strong>Resilience view:</strong> ${sp.resilienceView}</p>
      <span class="rutten-stat">Tier ${sp.tier} · ${sp.note}</span>`;
  }
}

function renderRuttenComparisons() {
  const r = evidenceData?.ruttenNhiAnalysis;
  const el = document.getElementById('rutten-comparisons');
  if (!el || !r?.legendComparisons) return;
  el.innerHTML = r.legendComparisons.map(c => `
    <div class="rutten-compare-card">
      <h5>vs ${c.legend}</h5>
      <p><strong>Overlap:</strong> ${c.ruttenOverlap}</p>
      <p><strong>Rutten adds:</strong> ${c.ruttenAdds}</p>
      <p class="rutten-fit">${c.resilienceFit}</p>
    </div>`).join('');
}

function renderRuttenClaimsDrillsStack() {
  const r = evidenceData?.ruttenNhiAnalysis;
  if (!r) return;

  const audit = document.getElementById('rutten-claims-audit');
  if (audit) {
    audit.innerHTML = `<table class="fp-reject-table rutten-table"><thead><tr><th>Claim</th><th>Verdict</th><th>Evidence</th></tr></thead><tbody>
      ${r.claimsAudit.map(c => {
        const cls = c.verdict.includes('CONFIRM') ? 'strong' : c.verdict.includes('REJECT') || c.verdict.includes('UNMEAS') ? 'reject' : 'partial';
        return `<tr><td>${c.claim}</td><td class="rutten-match-${cls}">${c.verdict}</td><td>${c.evidence}</td></tr>`;
      }).join('')}
    </tbody></table>`;
  }

  const drills = document.getElementById('rutten-drills');
  if (drills && r.drillProgression) {
    const d = r.drillProgression;
    drills.innerHTML = `
      <h4>${d.title}</h4>
      <p class="chart-explainer"><strong>Prerequisite:</strong> ${d.prerequisite}</p>
      ${d.phases.map(p => `
        <div class="rutten-drill-phase">
          <h5>${p.phase}</h5>
          <span class="rutten-drill-meta">${p.daily || ''}${p.daily && p.weekly ? ' · ' : ''}${p.weekly || ''}</span>
          <ul class="rutten-list">${p.drills.map(x => `<li>${x}</li>`).join('')}</ul>
          <p class="rutten-drill-test"><strong>Exit test:</strong> ${p.exitTest}</p>
        </div>`).join('')}
      <p class="rutten-drill-maint"><strong>Maintenance:</strong> ${d.maintenance}</p>`;
  }

  const stack = document.getElementById('rutten-synthesis-stack');
  if (stack && r.synthesisStack) {
    stack.innerHTML = r.synthesisStack.order.map(s => `
      <div class="rutten-stack-item">
        <span class="rutten-stack-pri">P${s.priority}</span>
        <div><strong>${s.layer}</strong><p>${s.why}</p><span class="rutten-stack-hours">${s.hours}</span></div>
      </div>`).join('');
  }

  const videos = document.getElementById('rutten-videos');
  if (videos && r.videoResources) {
    videos.innerHTML = `<ul class="rutten-video-list">${r.videoResources.map(v => `
      <li><a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.title}</a>
        <span class="rutten-video-creator">${v.creator}</span>
        <p>${v.focus}</p><span class="rutten-stat">Tier ${v.tier}</span></li>`).join('')}</ul>`;
  }
}

function renderRuttenFinal() {
  const r = evidenceData?.ruttenNhiAnalysis;
  if (!r) return;
  const v = document.getElementById('rutten-final-verdict');
  const l = document.getElementById('rutten-honest-limits');
  if (v) v.innerHTML = `<p>${r.nhiFinalVerdict}</p>`;
  if (l) l.textContent = r.honestLimits;
}

function renderAllRuttenNhiVisualizations() {
  if (!evidenceData?.ruttenNhiAnalysis) return;
  renderRuttenExecutive();
  renderRuttenHistorical();
  renderRuttenThreeTier();
  renderRuttenTactics();
  renderRuttenArsenal();
  renderRuttenMindsetSpirit();
  renderRuttenComparisons();
  renderRuttenClaimsDrillsStack();
  renderRuttenFinal();
}