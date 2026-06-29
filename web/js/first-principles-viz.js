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
    <svg viewBox="0 0 420 280" class="fp-svg" role="img" aria-label="First principles rebuild pyramid">
      <text x="210" y="18" text-anchor="middle" fill="#8b9cb8" font-size="10" font-weight="700">REBUILD FROM TRUTH — NOT TRADITION</text>
      <polygon points="210,35 370,95 50,95" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="2"/>
      <text x="210" y="72" text-anchor="middle" fill="#10b981" font-size="9" font-weight="700">8 AXIOMS</text>
      <text x="210" y="86" text-anchor="middle" fill="#8b9cb8" font-size="7">physics · biology · crime data</text>
      <polygon points="210,100 340,155 80,155" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="2"/>
      <text x="210" y="132" text-anchor="middle" fill="#3b82f6" font-size="9" font-weight="700">8 DERIVED PRINCIPLES</text>
      <text x="210" y="146" text-anchor="middle" fill="#8b9cb8" font-size="7">logic + evidence only</text>
      <polygon points="210,160 310,215 110,215" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="2"/>
      <text x="210" y="192" text-anchor="middle" fill="#8b5cf6" font-size="9" font-weight="700">3×7 ADVERSARIAL FILTER</text>
      <text x="210" y="206" text-anchor="middle" fill="#8b9cb8" font-size="7">survives hostile review</text>
      <rect x="90" y="222" width="240" height="48" rx="8" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="2"/>
      <text x="210" y="242" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="700">SITE RECOMMENDATIONS</text>
      <text x="210" y="258" text-anchor="middle" fill="#8b9cb8" font-size="7">AAA · EAAA · escape · burst · weapon compliance</text>
      <line x1="210" y1="95" x2="210" y2="100" stroke="#2d3a52" stroke-width="1" stroke-dasharray="3"/>
      <line x1="210" y1="155" x2="210" y2="160" stroke="#2d3a52" stroke-width="1" stroke-dasharray="3"/>
      <line x1="210" y1="215" x2="210" y2="222" stroke="#2d3a52" stroke-width="1" stroke-dasharray="3"/>
    </svg>`;
}

function renderFPNhiSummary() {
  const el = document.getElementById('fp-nhi-summary');
  const fp = evidenceData?.firstPrinciples;
  if (!el || !fp) return;
  el.innerHTML = `<p>${fp.nhiSummary}</p>`;
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