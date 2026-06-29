/** First principles — axioms → derived conclusions */

function renderFirstPrinciplesIntro() {
  const fp = evidenceData?.firstPrinciples;
  const el = document.getElementById('fp-intro');
  if (!el || !fp) return;
  el.innerHTML = `
    <p class="fp-tagline">${fp.tagline}</p>
    <p>${fp.method}</p>`;
}

function renderAxiomCards() {
  const el = document.getElementById('fp-axioms');
  const fp = evidenceData?.firstPrinciples;
  if (!el || !fp) return;
  el.innerHTML = fp.axioms.map(a => `
    <div class="fp-card fp-card-axiom">
      <span class="fp-id">${a.id}</span>
      <h4>${a.axiom}</h4>
      <p>${a.firstPrinciples}</p>
      <p class="fp-destroys"><strong>Destroys:</strong> ${a.destroys}</p>
    </div>`).join('');
}

function renderDerivedLadder() {
  const el = document.getElementById('fp-derived');
  const fp = evidenceData?.firstPrinciples;
  if (!el || !fp) return;
  el.innerHTML = fp.derivedPrinciples.map((d, i) => `
    <div class="fp-derived-row">
      <span class="fp-step-num">${i + 1}</span>
      <div class="fp-derived-body">
        <div class="fp-from-tags">${d.from.map(id => `<span>${id}</span>`).join('')}</div>
        <h4>${d.principle}</h4>
        <p class="fp-evidence">${d.evidence}</p>
      </div>
    </div>`).join('');
}

function renderRejectedTable() {
  const el = document.getElementById('fp-rejected');
  const fp = evidenceData?.firstPrinciples;
  if (!el || !fp) return;
  let html = '<table class="fp-reject-table"><thead><tr><th>Industry assumption</th><th>First-principles reality</th><th>Proof</th></tr></thead><tbody>';
  fp.rejectedAssumptions.forEach(r => {
    html += `<tr><td>${r.assumption}</td><td>${r.reality}</td><td><span class="tier tier-${r.tier.replace('+', 'plus').toLowerCase()}">${r.tier}</span></td></tr>`;
  });
  html += '</tbody></table>';
  el.innerHTML = html;
}

function renderRebuildOrder() {
  const el = document.getElementById('fp-rebuild');
  const fp = evidenceData?.firstPrinciples;
  if (!el || !fp) return;
  el.innerHTML = `<ol class="fp-rebuild-list">${fp.rebuildOrder.map(s => `<li>${s}</li>`).join('')}</ol>`;
}

function renderFPDiagram() {
  const el = document.getElementById('fp-pyramid-diagram');
  if (!el) return;
  el.innerHTML = `
    <svg viewBox="0 0 800 440" class="fp-svg" role="img" aria-label="First principles rebuild pyramid">
      <text x="400" y="36" text-anchor="middle" fill="#e8edf5" font-size="20" font-weight="800" letter-spacing="0.04em">REBUILD FROM TRUTH — NOT TRADITION</text>
      <text x="400" y="58" text-anchor="middle" fill="#8b9cb8" font-size="13">Strip gym tradition → derive only from what cannot be argued away</text>
      <polygon points="400,78 700,168 100,168" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="2.5"/>
      <text x="400" y="128" text-anchor="middle" fill="#10b981" font-size="18" font-weight="800">8 AXIOMS</text>
      <text x="400" y="152" text-anchor="middle" fill="#8b9cb8" font-size="14">physics · biology · crime data</text>
      <line x1="400" y1="168" x2="400" y2="178" stroke="#2d3a52" stroke-width="2" stroke-dasharray="5 4"/>
      <polygon points="400,178 640,258 160,258" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="2.5"/>
      <text x="400" y="222" text-anchor="middle" fill="#3b82f6" font-size="18" font-weight="800">8 DERIVED PRINCIPLES</text>
      <text x="400" y="246" text-anchor="middle" fill="#8b9cb8" font-size="14">logic + evidence only</text>
      <line x1="400" y1="258" x2="400" y2="268" stroke="#2d3a52" stroke-width="2" stroke-dasharray="5 4"/>
      <polygon points="400,268 580,348 220,348" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="2.5"/>
      <text x="400" y="312" text-anchor="middle" fill="#8b5cf6" font-size="18" font-weight="800">3×7 ADVERSARIAL FILTER</text>
      <text x="400" y="336" text-anchor="middle" fill="#8b9cb8" font-size="14">survives hostile review</text>
      <line x1="400" y1="348" x2="400" y2="358" stroke="#2d3a52" stroke-width="2" stroke-dasharray="5 4"/>
      <rect x="120" y="358" width="560" height="72" rx="12" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="400" y="392" text-anchor="middle" fill="#f59e0b" font-size="18" font-weight="800">SITE RECOMMENDATIONS</text>
      <text x="400" y="418" text-anchor="middle" fill="#e8edf5" font-size="14">AAA · EAAA · escape · burst · weapon compliance</text>
    </svg>`;
}

function renderFPNhiSummary() {
  const el = document.getElementById('fp-nhi-summary');
  const fp = evidenceData?.firstPrinciples;
  if (!el || !fp) return;

  const d = fp.nhiSummaryDistill;
  if (!d) {
    el.innerHTML = `<p>${fp.nhiSummary}</p>`;
    return;
  }

  el.innerHTML = `
    <div class="fp-nhi-distill">
      <p class="fp-nhi-lead">${d.lead}</p>

      <div class="fp-nhi-question-split">
        <p class="fp-nhi-wrong">${d.wrongQuestion}</p>
        <p class="fp-nhi-right">${d.rightApproach}</p>
      </div>

      <ul class="fp-nhi-questions">
        ${d.coreQuestions.map(q => `
          <li>
            <strong class="fp-nhi-q">${q.question}</strong>
            <span class="fp-nhi-a">${q.answer}</span>
          </li>`).join('')}
      </ul>

      <h4 class="fp-nhi-heading">${d.siteRebuildTitle}</h4>
      <ul class="fp-nhi-rebuild">
        ${d.siteRebuild.map(s => `<li>${s}</li>`).join('')}
      </ul>

      <h4 class="fp-nhi-heading">${d.traditionTitle}</h4>
      <div class="fp-nhi-tradition">
        <p class="fp-nhi-tradition-label">${d.traditionConfirmed.label}</p>
        <ul class="fp-nhi-tradition-list">
          ${d.traditionConfirmed.items.map(i => `<li>${i}</li>`).join('')}
        </ul>
        <p class="fp-nhi-tradition-reject">${d.traditionRejected}</p>
      </div>
    </div>`;
}

function renderAllFirstPrinciplesVisualizations() {
  if (!evidenceData?.firstPrinciples) return;
  renderFirstPrinciplesIntro();
  renderFPDiagram();
  renderAxiomCards();
  renderDerivedLadder();
  renderRejectedTable();
  renderRebuildOrder();
  renderFPNhiSummary();
}