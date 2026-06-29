/** EAAA / Empowerment Self-Defense definition visualizations */

function getEaaa() {
  return evidenceData?.avoidanceAndAwareness?.eaaa;
}

const EAAA_UNIT_COLORS = {
  yellow: '#facc15',
  orange: '#f97316',
  red: '#ef4444',
  purple: '#8b5cf6'
};

function renderEaaaDefinition() {
  const e = getEaaa();
  const el = document.getElementById('eaaa-definition');
  if (!el || !e) return;

  el.innerHTML = `
    <div class="eaaa-def-hero">
      <div class="eaaa-def-badge">
        <span class="tier tier-aplus">Tier A+</span>
        <span class="eaaa-def-acronym">${e.acronym}</span>
      </div>
      <h3>${e.fullName}</h3>
      <p class="eaaa-def-oneline">${e.definition.oneSentence}</p>
    </div>
    <div class="eaaa-def-grid">
      <div class="eaaa-def-card eaaa-is">
        <h4>What it is</h4>
        <p>${e.definition.whatItIs}</p>
      </div>
      <div class="eaaa-def-card eaaa-isnot">
        <h4>What it is not</h4>
        <p>${e.definition.whatItIsNot}</p>
      </div>
    </div>`;
}

function renderEaaaEsdRelationship() {
  const e = getEaaa();
  const el = document.getElementById('eaaa-esd-relationship');
  if (!el || !e?.empowermentSelfDefense) return;
  const esd = e.empowermentSelfDefense;
  el.innerHTML = `
    <h4>${esd.fieldName} — how EAAA fits</h4>
    <p class="chart-explainer">${esd.plainEnglish}</p>
    <div class="eaaa-esd-duo">
      <div class="eaaa-esd-card eaaa-esd-field">
        <span class="eaaa-esd-label">The field</span>
        <strong>Empowerment Self-Defense (ESD)</strong>
        <p>${esd.fieldDefinition}</p>
      </div>
      <div class="eaaa-esd-arrow" aria-hidden="true">→</div>
      <div class="eaaa-esd-card eaaa-esd-program">
        <span class="eaaa-esd-label">The proven program</span>
        <strong>EAAA (SARE)</strong>
        <p>${esd.eaaaRelationship}</p>
      </div>
    </div>`;
}

function renderEaaaMeta() {
  const e = getEaaa();
  const el = document.getElementById('eaaa-meta');
  if (!el || !e) return;

  el.innerHTML = `
    <div class="eaaa-meta-grid">
      <div class="eaaa-meta-item">
        <span class="eaaa-meta-label">Created by</span>
        <strong>${e.creator.leadResearcher}</strong>
        <p>${e.creator.institution} · ${e.creator.centre}</p>
      </div>
      <div class="eaaa-meta-item">
        <span class="eaaa-meta-label">Who was studied</span>
        <p>${e.whoStudied}</p>
      </div>
      <div class="eaaa-meta-item">
        <span class="eaaa-meta-label">Study design</span>
        <p>${e.studyDesign.type}, n=${e.studyDesign.sampleSize}</p>
        <p class="eaaa-outcome-stat"><strong>${e.rctCompletedRapeReduction12mo}%</strong> fewer completed assaults (12 mo)</p>
        <p class="eaaa-outcome-stat"><strong>${e.realWorldCompletedRapeReduction6mo}%</strong> in real-world rollout (6 mo)</p>
      </div>
      <div class="eaaa-meta-item">
        <span class="eaaa-meta-label">Time commitment</span>
        <p><strong>${e.totalProgramHours} hours</strong> total · <strong>${e.actUnitPhysicalHours} hours</strong> physical in Act unit (${e.physicalTechniquesShare}% of curriculum)</p>
      </div>
    </div>`;
}

function renderEaaaFourUnits() {
  const e = getEaaa();
  const el = document.getElementById('eaaa-four-units');
  if (!el || !e?.fourUnits) return;

  el.innerHTML = `
    <h4>The four units — what each actually teaches</h4>
    <div class="eaaa-units-grid">
      ${e.fourUnits.map(u => `
        <article class="eaaa-unit-card eaaa-unit-${u.cooperColor}" style="--eaaa-unit-color:${EAAA_UNIT_COLORS[u.cooperColor] || '#3b82f6'}">
          <header class="eaaa-unit-header">
            <span class="eaaa-unit-bar"></span>
            <div>
              <h5>${u.name}</h5>
              <span class="eaaa-unit-meta">${u.percent}% · ~${u.approxHours}h${u.physicalHours ? ` (${u.physicalHours}h physical)` : ''}</span>
            </div>
            ${u.cooperColor !== 'purple' ? `<span class="cooper-inline-pill cooper-${u.cooperColor}">Cooper ${u.cooperColor.charAt(0).toUpperCase() + u.cooperColor.slice(1)}</span>` : ''}
          </header>
          <p><strong>Teaches:</strong> ${u.teaches}</p>
          <p class="eaaa-unit-plain">${u.plainEnglish}</p>
          <span class="eaaa-unit-map">${u.resilienceMap}</span>
        </article>`).join('')}
    </div>`;
}

function renderEaaaResilienceConnection() {
  const e = getEaaa();
  const el = document.getElementById('eaaa-resilience-connection');
  if (!el || !e?.resilienceConnection) return;
  const r = e.resilienceConnection;
  el.innerHTML = `
    <h4>How EAAA connects to this site</h4>
    <ul class="eaaa-connection-list">
      <li><strong>AAA Exit Protocol:</strong> ${r.aaaExitProtocol}</li>
      <li><strong>Adversarial voting:</strong> ${r.whyItWonAdversarial}</li>
      <li><strong>Cooper colors:</strong> ${r.cooperMapping}</li>
    </ul>
    <div class="eaaa-physical-skills">
      <strong>Physical skills inside Act unit (2 hours):</strong>
      ${e.physicalSkillsInActUnit.join(' · ')}
    </div>`;
}

function renderEaaaLimitsAndSources() {
  const e = getEaaa();
  const limits = document.getElementById('eaaa-honest-limits');
  const sources = document.getElementById('eaaa-sources');
  if (limits) limits.textContent = e?.honestLimits || '';
  if (sources && e?.whereToLearn) {
    sources.innerHTML = `
      <h4>Official program resources</h4>
      <ul class="eaaa-sources-list">
        ${e.whereToLearn.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name}</a> — ${s.note}</li>`).join('')}
        ${e.studyDesign?.sources?.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.citation}</a> — ${s.finding}</li>`).join('') || ''}
      </ul>`;
  }
}

function renderAllEaaaVisualizations() {
  if (!getEaaa()) return;
  renderEaaaDefinition();
  renderEaaaEsdRelationship();
  renderEaaaMeta();
  renderEaaaFourUnits();
  renderEaaaResilienceConnection();
  renderEaaaLimitsAndSources();
}