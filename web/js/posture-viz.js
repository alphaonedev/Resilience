/** Stance, footwork, guard, vitals, and weapon-response visualizations */

const POSTURE_COLORS = { good: '#10b981', bad: '#ef4444', warn: '#f59e0b', neutral: '#8b9cb8', vital: '#ef4444' };

const POSTURE_SVG = {
  stanceGood: `<svg viewBox="0 0 200 220" class="posture-svg" role="img" aria-label="Exit-ready stance">
    <text x="100" y="14" text-anchor="middle" fill="#10b981" font-size="9" font-weight="700">EXIT-READY STANCE</text>
    <ellipse cx="100" cy="195" rx="55" ry="8" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1" stroke-dasharray="4"/>
    <line x1="75" y1="185" x2="95" y2="130" stroke="#8b9cb8" stroke-width="3"/>
    <line x1="125" y1="185" x2="108" y2="130" stroke="#8b9cb8" stroke-width="3"/>
    <line x1="95" y1="130" x2="108" y2="130" stroke="#8b9cb8" stroke-width="4"/>
    <line x1="100" y1="130" x2="100" y2="75" stroke="#8b9cb8" stroke-width="3"/>
    <circle cx="100" cy="62" r="14" fill="none" stroke="#8b9cb8" stroke-width="3"/>
    <line x1="88" y1="68" x2="72" y2="58" stroke="#3b82f6" stroke-width="3"/>
    <line x1="112" y1="68" x2="128" y2="58" stroke="#3b82f6" stroke-width="3"/>
    <rect x="70" y="52" width="18" height="12" rx="2" fill="rgba(59,130,246,0.3)" stroke="#3b82f6"/>
    <rect x="112" y="52" width="18" height="12" rx="2" fill="rgba(59,130,246,0.3)" stroke="#3b82f6"/>
    <text x="30" y="100" fill="#10b981" font-size="7">45° blade</text>
    <line x1="100" y1="100" x2="40" y2="85" stroke="#10b981" stroke-width="1" stroke-dasharray="3"/>
    <text x="155" y="175" fill="#8b9cb8" font-size="7">lead foot</text>
    <text x="55" y="175" fill="#8b9cb8" font-size="7">rear foot</text>
    <text x="100" y="210" text-anchor="middle" fill="#8b9cb8" font-size="7">60% weight on balls · knees soft</text>
  </svg>`,
  stanceBad: `<svg viewBox="0 0 200 220" class="posture-svg" role="img" aria-label="Bad squared stance">
    <text x="100" y="14" text-anchor="middle" fill="#ef4444" font-size="9" font-weight="700">SQUARED / PLANTED ✗</text>
    <line x1="70" y1="185" x2="70" y2="130" stroke="#8b9cb8" stroke-width="3"/>
    <line x1="130" y1="185" x2="130" y2="130" stroke="#8b9cb8" stroke-width="3"/>
    <line x1="70" y1="130" x2="130" y2="130" stroke="#8b9cb8" stroke-width="4"/>
    <line x1="100" y1="130" x2="100" y2="70" stroke="#8b9cb8" stroke-width="3"/>
    <circle cx="100" cy="55" r="14" fill="none" stroke="#8b9cb8" stroke-width="3"/>
    <line x1="85" y1="50" x2="60" y2="35" stroke="#ef4444" stroke-width="2"/>
    <line x1="115" y1="50" x2="140" y2="35" stroke="#ef4444" stroke-width="2"/>
    <ellipse cx="100" cy="95" rx="28" ry="35" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="4" opacity="0.6"/>
    <text x="100" y="95" text-anchor="middle" fill="#ef4444" font-size="7">gut exposed</text>
    <text x="100" y="210" text-anchor="middle" fill="#ef4444" font-size="7">can't run · wide target · heels locked</text>
  </svg>`,
  footwork: `<svg viewBox="0 0 240 180" class="posture-svg" role="img" aria-label="Angle footwork">
    <text x="120" y="14" text-anchor="middle" fill="#3b82f6" font-size="9" font-weight="700">ANGLE OFF-LINE — DON'T RETREAT STRAIGHT</text>
    <circle cx="50" cy="90" r="10" fill="#ef4444" opacity="0.8"/>
    <text x="50" y="115" text-anchor="middle" fill="#ef4444" font-size="7">THREAT</text>
    <circle cx="130" cy="90" r="8" fill="#8b9cb8"/>
    <text x="130" y="115" text-anchor="middle" fill="#8b9cb8" font-size="7">YOU</text>
    <line x1="60" y1="90" x2="118" y2="90" stroke="#ef4444" stroke-width="2" marker-end="url(#pfArr)"/>
    <path d="M130 98 Q170 130 200 100" fill="none" stroke="#10b981" stroke-width="3" marker-end="url(#pfArrG)"/>
    <text x="185" y="125" fill="#10b981" font-size="8">EXIT</text>
    <line x1="130" y1="90" x2="130" y2="145" stroke="#ef4444" stroke-width="2" stroke-dasharray="5" opacity="0.5"/>
    <text x="135" y="155" fill="#ef4444" font-size="7">✗ straight back</text>
    <defs>
      <marker id="pfArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#ef4444"/></marker>
      <marker id="pfArrG" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#10b981"/></marker>
    </defs>
    <text x="120" y="172" text-anchor="middle" fill="#8b9cb8" font-size="7">45° step opens escape lane · never cross feet</text>
  </svg>`,
  guard: `<svg viewBox="0 0 200 200" class="posture-svg" role="img" aria-label="Compact guard">
    <text x="100" y="14" text-anchor="middle" fill="#3b82f6" font-size="9" font-weight="700">COMPACT GUARD</text>
    <line x1="85" y1="175" x2="85" y2="120" stroke="#8b9cb8" stroke-width="3"/>
    <line x1="115" y1="175" x2="115" y2="120" stroke="#8b9cb8" stroke-width="3"/>
    <line x1="85" y1="120" x2="115" y2="120" stroke="#8b9cb8" stroke-width="4"/>
    <line x1="100" y1="120" x2="100" y2="65" stroke="#8b9cb8" stroke-width="3"/>
    <circle cx="100" cy="50" r="16" fill="none" stroke="#8b9cb8" stroke-width="3"/>
    <rect x="72" y="38" width="22" height="16" rx="3" fill="rgba(59,130,246,0.35)" stroke="#3b82f6" stroke-width="2"/>
    <rect x="106" y="38" width="22" height="16" rx="3" fill="rgba(59,130,246,0.35)" stroke="#3b82f6" stroke-width="2"/>
    <ellipse cx="100" cy="52" rx="20" ry="14" fill="none" stroke="#10b981" stroke-width="1" stroke-dasharray="3"/>
    <text x="100" y="54" text-anchor="middle" fill="#10b981" font-size="6">jaw covered</text>
    <line x1="88" y1="95" x2="88" y2="125" stroke="#3b82f6" stroke-width="4"/>
    <line x1="112" y1="95" x2="112" y2="125" stroke="#3b82f6" stroke-width="4"/>
    <text x="55" y="108" fill="#3b82f6" font-size="7">elbows in</text>
    <text x="100" y="192" text-anchor="middle" fill="#8b9cb8" font-size="7">palms out = de-escalate · fists only if contact imminent</text>
  </svg>`,
  vitals: `<svg viewBox="0 0 200 220" class="posture-svg" role="img" aria-label="Vital zones">
    <text x="100" y="14" text-anchor="middle" fill="#ef4444" font-size="9" font-weight="700">VITAL ZONES — PROTECT IN ORDER</text>
    <line x1="85" y1="185" x2="85" y2="120" stroke="#8b9cb8" stroke-width="3"/>
    <line x1="115" y1="185" x2="115" y2="120" stroke="#8b9cb8" stroke-width="3"/>
    <line x1="85" y1="120" x2="115" y2="120" stroke="#8b9cb8" stroke-width="4"/>
    <line x1="100" y1="120" x2="100" y2="68" stroke="#8b9cb8" stroke-width="3"/>
    <circle cx="100" cy="52" r="16" fill="rgba(239,68,68,0.25)" stroke="#ef4444" stroke-width="2"/>
    <text x="100" y="48" text-anchor="middle" fill="#fff" font-size="8" font-weight="700">1</text>
    <text x="100" y="58" text-anchor="middle" fill="#ef4444" font-size="6">BRAIN</text>
    <ellipse cx="100" cy="78" rx="10" ry="6" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="1"/>
    <text x="100" y="80" text-anchor="middle" fill="#ef4444" font-size="6">2 THROAT</text>
    <ellipse cx="100" cy="105" rx="18" ry="12" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="1"/>
    <text x="100" y="108" text-anchor="middle" fill="#f59e0b" font-size="6">3 RIBS</text>
    <ellipse cx="100" cy="135" rx="14" ry="8" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1"/>
    <text x="100" y="138" text-anchor="middle" fill="#f59e0b" font-size="6">4 GROIN</text>
    <path d="M88 55 Q100 62 112 55" fill="none" stroke="#10b981" stroke-width="2"/>
    <text x="145" y="55" fill="#10b981" font-size="7">chin tuck</text>
    <text x="100" y="210" text-anchor="middle" fill="#8b9cb8" font-size="7">eyes on chest/hands · peripheral for flanks</text>
  </svg>`,
  weaponGun: `<svg viewBox="0 0 260 200" class="posture-svg" role="img" aria-label="Firearm response">
    <text x="130" y="14" text-anchor="middle" fill="#ef4444" font-size="9" font-weight="700">FIREARM PRESENTED — COMPLY · EXIT</text>
    <circle cx="55" cy="100" r="12" fill="#ef4444" opacity="0.7"/>
    <rect x="65" y="96" width="30" height="8" rx="2" fill="#6b7280"/>
    <text x="55" y="130" text-anchor="middle" fill="#ef4444" font-size="7">THREAT</text>
    <circle cx="180" cy="110" r="10" fill="#8b9cb8"/>
    <line x1="168" y1="100" x2="155" y2="88" stroke="#10b981" stroke-width="3"/>
    <line x1="192" y1="100" x2="205" y2="88" stroke="#10b981" stroke-width="3"/>
    <text x="180" y="88" text-anchor="middle" fill="#10b981" font-size="7">hands up</text>
    <text x="180" y="140" text-anchor="middle" fill="#8b9cb8" font-size="7">palms open · visible</text>
    <rect x="20" y="155" width="220" height="36" rx="6" fill="#1a2332" stroke="#2d3a52"/>
    <text x="130" y="170" text-anchor="middle" fill="#10b981" font-size="8">1 Freeze · 2 Comply · 3 Give property · 4 Exit when safe</text>
    <text x="130" y="184" text-anchor="middle" fill="#ef4444" font-size="7">✗ NO disarm · ✗ NO sudden reach · ✗ NO charge</text>
  </svg>`,
  weaponKnife: `<svg viewBox="0 0 260 200" class="posture-svg" role="img" aria-label="Knife response">
    <text x="130" y="14" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="700">KNIFE — DISTANCE · RUN</text>
    <circle cx="60" cy="100" r="12" fill="#ef4444" opacity="0.7"/>
    <line x1="72" y1="100" x2="95" y2="85" stroke="#f59e0b" stroke-width="3"/>
    <text x="60" y="130" text-anchor="middle" fill="#ef4444" font-size="7">THREAT</text>
    <circle cx="175" cy="105" r="10" fill="#8b9cb8"/>
    <path d="M100 100 L175 105" stroke="#ef4444" stroke-width="1" stroke-dasharray="4" opacity="0.5"/>
    <text x="135" y="95" fill="#ef4444" font-size="7">keep gap</text>
    <path d="M175 115 Q220 130 240 90" fill="none" stroke="#10b981" stroke-width="3" marker-end="url(#knArr)"/>
    <defs><marker id="knArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#10b981"/></marker></defs>
    <rect x="20" y="155" width="220" height="36" rx="6" fill="#1a2332" stroke="#2d3a52"/>
    <text x="130" y="170" text-anchor="middle" fill="#10b981" font-size="8">Distance · barrier · angle · run to crowd</text>
    <text x="130" y="184" text-anchor="middle" fill="#ef4444" font-size="7">✗ NO clinch · ✗ NO ground · ✗ NO disarm</text>
  </svg>`
};

function renderPostureDiagrams() {
  const map = {
    'posture-stance-good': POSTURE_SVG.stanceGood,
    'posture-stance-bad': POSTURE_SVG.stanceBad,
    'posture-footwork': POSTURE_SVG.footwork,
    'posture-guard': POSTURE_SVG.guard,
    'posture-vitals': POSTURE_SVG.vitals,
    'posture-weapon-gun': POSTURE_SVG.weaponGun,
    'posture-weapon-knife': POSTURE_SVG.weaponKnife
  };
  Object.entries(map).forEach(([id, svg]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = svg;
  });
}

function renderPostureCards() {
  const p = evidenceData?.defensivePosture;
  if (!p) return;

  const stanceEl = document.getElementById('posture-stance-cards');
  if (stanceEl) {
    stanceEl.innerHTML = `
      <div class="posture-card posture-card-good">
        <h4>${p.stance.name}</h4>
        <p>${p.stance.plainEnglish}</p>
        <ul class="posture-detail-list">
          <li><strong>Feet:</strong> ${p.stance.feet}</li>
          <li><strong>Weight:</strong> ${p.stance.weight}</li>
          <li><strong>Hips:</strong> ${p.stance.hips}</li>
          <li><strong>Orientation:</strong> ${p.stance.orientation}</li>
        </ul>
      </div>
      <div class="posture-card posture-card-bad">
        <h4>Common Errors</h4>
        <ul class="posture-error-list">${p.stance.errors.map(e => `<li>${e}</li>`).join('')}</ul>
      </div>`;
  }

  const footEl = document.getElementById('posture-footwork-cards');
  if (footEl) {
    footEl.innerHTML = `
      <div class="posture-card">
        <h4>${p.footwork.name}</h4>
        <p>${p.footwork.plainEnglish}</p>
        <div class="posture-rules">${p.footwork.rules.map(r => `
          <div class="posture-rule">
            <span class="tier tier-${r.tier.replace('+', 'plus').toLowerCase()}" style="font-size:0.65rem">${r.tier}</span>
            <strong>${r.rule}</strong>
            <span>${r.why}</span>
          </div>`).join('')}
        </div>
      </div>`;
  }

  const guardEl = document.getElementById('posture-guard-cards');
  if (guardEl) {
    const g = p.handsArms;
    guardEl.innerHTML = `
      <div class="posture-card">
        <h4>${g.name}</h4>
        <ul class="posture-detail-list">
          <li><strong>Hands:</strong> ${g.handPosition}</li>
          <li><strong>Elbows:</strong> ${g.elbows}</li>
          <li><strong>Forearms:</strong> ${g.forearms}</li>
          <li><strong>Open vs closed:</strong> ${g.openVsClosed}</li>
          <li><strong>If grabbed:</strong> ${g.framing}</li>
        </ul>
      </div>
      <div class="posture-card posture-card-bad">
        <h4>Guard Errors</h4>
        <ul class="posture-error-list">${g.errors.map(e => `<li>${e}</li>`).join('')}</ul>
      </div>`;
  }

  const vitalsEl = document.getElementById('posture-vitals-cards');
  if (vitalsEl) {
    const v = p.headVitals;
    vitalsEl.innerHTML = `
      <div class="posture-card">
        <h4>${v.name}</h4>
        <ul class="posture-detail-list">
          <li><strong>Chin:</strong> ${v.chin}</li>
          <li><strong>Eyes:</strong> ${v.headPosition}</li>
          <li><strong>Shoulders:</strong> ${v.shoulders}</li>
          <li><strong>Torso:</strong> ${v.torso}</li>
        </ul>
        <div class="posture-vital-zones">${v.vitalZones.map(z => `
          <div class="posture-vital-row" style="--vital-pri:${z.priority}">
            <span class="posture-vital-num">${z.priority}</span>
            <span class="posture-vital-name">${z.zone}</span>
            <span class="posture-vital-prot">${z.protection}</span>
          </div>`).join('')}
        </div>
      </div>`;
  }
}

function renderWeaponResponseCards() {
  const el = document.getElementById('weapon-response-cards');
  const p = evidenceData?.defensivePosture;
  if (!el || !p) return;

  el.innerHTML = p.weaponResponses.map(w => `
    <div class="posture-card posture-card-weapon" data-weapon="${w.id}">
      <div class="posture-weapon-header">
        <h4>${w.weapon}</h4>
        ${typeof tierBadge === 'function' ? tierBadge(w.tier) : ''}
      </div>
      <p class="posture-weapon-rule"><strong>Default:</strong> ${w.defaultRule}</p>
      <p class="posture-weapon-prev" style="font-size:0.78rem;color:var(--text-muted)">${w.prevalence || ''}</p>
      <ol class="posture-weapon-steps">
        ${w.whenDisplayed.map(s => `<li><strong>${s.action}</strong><span>${s.why}</span></li>`).join('')}
      </ol>
      <div class="posture-do-not">
        <strong>Do not:</strong>
        <ul>${w.doNot.map(d => `<li>${d}</li>`).join('')}</ul>
      </div>
      <p class="posture-evidence-note">${w.evidence}</p>
    </div>`).join('');
}

function renderPostureSafetyChart() {
  const ctx = document.getElementById('postureSafetyChart');
  const p = evidenceData?.defensivePosture;
  if (!ctx || !p) return;

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Stance', 'Footwork', 'Guard', 'Vitals'],
      datasets: [{
        label: 'Street safety score (0–5)',
        data: [p.stance.streetSafety, p.footwork.streetSafety, p.handsArms.streetSafety, p.headVitals.streetSafety],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,0.15)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { r: { min: 0, max: 5, ticks: { stepSize: 1 }, grid: { color: '#2d3a52' } } },
      plugins: { legend: { display: false } }
    }
  });
}

function renderWeaponPriorityChart() {
  const ctx = document.getElementById('weaponPriorityChart');
  const p = evidenceData?.defensivePosture;
  if (!ctx || !p) return;

  const tiers = { 'A+': 5, A: 4, 'B+': 3.5, B: 3, C: 2, D: 1 };
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: p.weaponResponses.map(w => w.weapon.replace(' Presented', '').replace(' / Edged Weapon', '')),
      datasets: [{
        label: 'Evidence tier strength',
        data: p.weaponResponses.map(w => tiers[w.tier] || 2),
        backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { min: 0, max: 5, title: { display: true, text: 'Evidence tier' } }, x: { grid: { display: false } } }
    }
  });
}

function renderAllPostureVisualizations() {
  if (!evidenceData?.defensivePosture) return;
  renderPostureDiagrams();
  renderPostureCards();
  renderWeaponResponseCards();
  renderPostureSafetyChart();
  renderWeaponPriorityChart();
  const summary = document.getElementById('posture-nhi-summary');
  if (summary) summary.innerHTML = `<p>${evidenceData.defensivePosture.nhiSummary}</p>`;
}