/** Resilience Forge — 8-week technique diagrams (men) */

const FORGE_WEEK_DIAGRAMS = [
  {
    week: '1–2',
    title: 'Rutten fence + verbal + sprint cue',
    test: 'Leave bar scenario verbally or teep + run',
    daily: '10 min',
    svg: `
<svg viewBox="0 0 720 280" class="forge-week-svg" role="img" aria-label="Weeks 1-2 Rutten fence verbal sprint">
  <text x="360" y="22" text-anchor="middle" fill="#3b82f6" font-size="14" font-weight="800">WEEKS 1–2 — FENCE · VERBAL · EXIT</text>
  <defs>
    <marker id="fw1arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#10b981"/></marker>
    <marker id="fw1arrB" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#3b82f6"/></marker>
  </defs>
  <!-- Panel 1: Fence -->
  <rect x="12" y="38" width="220" height="220" rx="10" fill="rgba(59,130,246,0.06)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="122" y="58" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="700">① RUTTEN FENCE</text>
  <circle cx="90" cy="130" r="12" fill="none" stroke="#8b9cb8" stroke-width="2.5"/>
  <line x1="90" y1="142" x2="90" y2="195" stroke="#8b9cb8" stroke-width="2.5"/>
  <line x1="78" y1="195" x2="102" y2="195" stroke="#8b9cb8" stroke-width="2.5"/>
  <line x1="78" y1="155" x2="62" y2="135" stroke="#3b82f6" stroke-width="3"/>
  <line x1="102" y1="155" x2="118" y2="135" stroke="#3b82f6" stroke-width="3"/>
  <rect x="52" y="122" width="22" height="14" rx="3" fill="rgba(59,130,246,0.35)" stroke="#3b82f6"/>
  <rect x="106" y="122" width="22" height="14" rx="3" fill="rgba(59,130,246,0.35)" stroke="#3b82f6"/>
  <circle cx="175" cy="130" r="11" fill="#6b7280" opacity="0.9"/>
  <line x1="175" y1="141" x2="175" y2="195" stroke="#6b7280" stroke-width="2"/>
  <line x1="165" y1="195" x2="185" y2="195" stroke="#6b7280" stroke-width="2"/>
  <text x="122" y="218" text-anchor="middle" fill="#8b9cb8" font-size="9">Hands chest-high · calm voice · conversational distance</text>
  <!-- Panel 2: Verbal + angle -->
  <rect x="248" y="38" width="220" height="220" rx="10" fill="rgba(16,185,129,0.06)" stroke="#10b981" stroke-width="1.5"/>
  <text x="358" y="58" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">② VERBAL STALL + ANGLE</text>
  <circle cx="300" cy="140" r="10" fill="none" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="300" y1="150" x2="300" y2="190" stroke="#8b9cb8" stroke-width="2"/>
  <circle cx="380" cy="145" r="10" fill="#6b7280"/>
  <line x1="380" y1="155" x2="380" y2="190" stroke="#6b7280" stroke-width="2"/>
  <rect x="318" y="108" width="88" height="28" rx="6" fill="rgba(16,185,129,0.2)" stroke="#10b981"/>
  <text x="362" y="126" text-anchor="middle" fill="#e8edf5" font-size="8" font-weight="600">"I don't want trouble"</text>
  <path d="M310 175 Q360 210 420 165" fill="none" stroke="#10b981" stroke-width="2.5" marker-end="url(#fw1arr)"/>
  <circle cx="425" cy="162" r="10" fill="none" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="425" y1="172" x2="425" y2="195" stroke="#8b9cb8" stroke-width="2"/>
  <text x="358" y="218" text-anchor="middle" fill="#8b9cb8" font-size="9">Lateral step toward exit — not squared up</text>
  <!-- Panel 3: Teep + RUN -->
  <rect x="484" y="38" width="224" height="220" rx="10" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="596" y="58" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="700">③ TEEP + RUN (if rushed)</text>
  <circle cx="530" cy="145" r="10" fill="none" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="530" y1="155" x2="535" y2="188" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="535" y1="168" x2="575" y2="162" stroke="#f59e0b" stroke-width="4"/>
  <line x1="575" y1="162" x2="590" y2="162" stroke="#f59e0b" stroke-width="6"/>
  <circle cx="610" cy="158" r="10" fill="#6b7280"/>
  <line x1="610" y1="168" x2="610" y2="188" stroke="#6b7280" stroke-width="2"/>
  <path d="M545 130 Q640 100 680 145" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="6 4" marker-end="url(#fw1arr)"/>
  <text x="640" y="95" fill="#10b981" font-size="10" font-weight="800">RUN</text>
  <rect x="520" y="200" width="152" height="22" rx="5" fill="rgba(239,68,68,0.12)" stroke="#ef4444" stroke-opacity="0.5"/>
  <text x="596" y="215" text-anchor="middle" fill="#fca5a5" font-size="8">Bar test: verbal leave OR teep → sprint to door</text>
  <text x="360" y="268" text-anchor="middle" fill="#8b9cb8" font-size="10">Default = leave before contact. Teep is one-beat create-distance, not a fight.</text>
</svg>`
  },
  {
    week: '3–4',
    title: 'Jab/palm → cross + calf kick',
    test: '3-beat chain under 2 sec then RUN',
    daily: '15 min',
    svg: `
<svg viewBox="0 0 720 300" class="forge-week-svg" role="img" aria-label="Weeks 3-4 jab cross calf kick chain">
  <text x="360" y="22" text-anchor="middle" fill="#3b82f6" font-size="14" font-weight="800">WEEKS 3–4 — 3-BEAT BURST CHAIN</text>
  <defs>
    <marker id="fw2arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#f59e0b"/></marker>
    <marker id="fw2run" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#10b981"/></marker>
  </defs>
  <!-- Defender -->
  <circle cx="120" cy="120" r="14" fill="none" stroke="#8b9cb8" stroke-width="2.5"/>
  <line x1="120" y1="134" x2="120" y2="200" stroke="#8b9cb8" stroke-width="2.5"/>
  <line x1="105" y1="200" x2="135" y2="200" stroke="#8b9cb8" stroke-width="2.5"/>
  <!-- Attacker -->
  <circle cx="280" cy="125" r="12" fill="#6b7280"/>
  <line x1="280" y1="137" x2="280" y2="200" stroke="#6b7280" stroke-width="2"/>
  <line x1="268" y1="200" x2="292" y2="200" stroke="#6b7280" stroke-width="2"/>
  <!-- Beat 1 Jab -->
  <line x1="132" y1="145" x2="195" y2="138" stroke="#facc15" stroke-width="4" marker-end="url(#fw2arr)"/>
  <circle cx="210" cy="50" r="18" fill="rgba(250,204,21,0.2)" stroke="#facc15" stroke-width="2"/>
  <text x="210" y="55" text-anchor="middle" fill="#facc15" font-size="14" font-weight="800">1</text>
  <text x="210" y="72" text-anchor="middle" fill="#8b9cb8" font-size="9">JAB / PALM</text>
  <text x="210" y="84" text-anchor="middle" fill="#8b9cb8" font-size="8">Distract · range find</text>
  <!-- Beat 2 Cross -->
  <line x1="125" y1="155" x2="268" y2="128" stroke="#ef4444" stroke-width="5" marker-end="url(#fw2arr)"/>
  <circle cx="360" cy="50" r="18" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="2"/>
  <text x="360" y="55" text-anchor="middle" fill="#ef4444" font-size="14" font-weight="800">2</text>
  <text x="360" y="72" text-anchor="middle" fill="#8b9cb8" font-size="9">CROSS</text>
  <text x="360" y="84" text-anchor="middle" fill="#8b9cb8" font-size="8">KO power · straight rear hand</text>
  <!-- Beat 3 Calf kick -->
  <line x1="128" y1="185" x2="268" y2="192" stroke="#f59e0b" stroke-width="5" marker-end="url(#fw2arr)"/>
  <circle cx="510" cy="50" r="18" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="2"/>
  <text x="510" y="55" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="800">3</text>
  <text x="510" y="72" text-anchor="middle" fill="#8b9cb8" font-size="9">CALF KICK</text>
  <text x="510" y="84" text-anchor="middle" fill="#8b9cb8" font-size="8">Kill pursuit — they can't chase</text>
  <!-- RUN -->
  <path d="M140 95 Q400 40 620 100" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="8 5" marker-end="url(#fw2run)"/>
  <rect x="560" y="115" width="100" height="36" rx="8" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="2"/>
  <text x="610" y="138" text-anchor="middle" fill="#10b981" font-size="14" font-weight="800">RUN</text>
  <text x="610" y="218" text-anchor="middle" fill="#8b9cb8" font-size="9">Mandatory after chain</text>
  <!-- Timeline -->
  <line x1="80" y1="250" x2="640" y2="250" stroke="#2d3a52" stroke-width="2"/>
  <line x1="80" y1="245" x2="80" y2="255" stroke="#8b9cb8"/>
  <line x1="240" y1="245" x2="240" y2="255" stroke="#facc15"/>
  <line x1="400" y1="245" x2="400" y2="255" stroke="#ef4444"/>
  <line x1="560" y1="245" x2="560" y2="255" stroke="#f59e0b"/>
  <line x1="640" y1="245" x2="640" y2="255" stroke="#10b981"/>
  <text x="80" y="268" text-anchor="middle" fill="#8b9cb8" font-size="8">0s</text>
  <text x="240" y="268" text-anchor="middle" fill="#facc15" font-size="8">~0.5s</text>
  <text x="400" y="268" text-anchor="middle" fill="#ef4444" font-size="8">~1s</text>
  <text x="560" y="268" text-anchor="middle" fill="#f59e0b" font-size="8">~1.5s</text>
  <text x="640" y="268" text-anchor="middle" fill="#10b981" font-size="8">&lt;2s → RUN</text>
  <text x="360" y="292" text-anchor="middle" fill="#fde047" font-size="10" font-weight="600">Test: full chain under 2 seconds — then sprint every rep</text>
</svg>`
  },
  {
    week: '5–6',
    title: 'Grab → 3 knees → push-off + sprawl',
    test: 'Never exceed 5 strikes before exit',
    daily: '15 min',
    svg: `
<svg viewBox="0 0 720 320" class="forge-week-svg" role="img" aria-label="Weeks 5-6 grab knees push-off sprawl">
  <text x="360" y="22" text-anchor="middle" fill="#3b82f6" font-size="14" font-weight="800">WEEKS 5–6 — CLINCH CAP · STAND UP · EXIT</text>
  <defs>
    <marker id="fw3arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#8b5cf6"/></marker>
    <marker id="fw3run" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#10b981"/></marker>
  </defs>
  <!-- Step 1 Grab -->
  <rect x="8" y="40" width="165" height="200" rx="8" fill="rgba(107,114,128,0.08)" stroke="#6b7280" stroke-width="1.5"/>
  <text x="90" y="58" text-anchor="middle" fill="#8b9cb8" font-size="10" font-weight="700">① GRAB</text>
  <circle cx="70" cy="110" r="10" fill="#6b7280"/>
  <line x1="70" y1="120" x2="70" y2="170" stroke="#6b7280" stroke-width="2"/>
  <circle cx="110" cy="115" r="10" fill="none" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="110" y1="125" x2="110" y2="170" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="78" y1="130" x2="102" y2="130" stroke="#ef4444" stroke-width="3"/>
  <text x="90" y="195" text-anchor="middle" fill="#8b9cb8" font-size="8">Rear/side grab</text>
  <!-- Step 2 Frame + 3 knees -->
  <rect x="183" y="40" width="200" height="200" rx="8" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="283" y="58" text-anchor="middle" fill="#8b5cf6" font-size="10" font-weight="700">② FRAME + 3 KNEES MAX</text>
  <circle cx="250" cy="105" r="10" fill="#6b7280"/>
  <circle cx="310" cy="110" r="10" fill="none" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="310" y1="120" x2="305" y2="165" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="295" y1="135" x2="265" y2="145" stroke="#8b5cf6" stroke-width="3"/>
  <line x1="305" y1="145" x2="255" y2="155" stroke="#f59e0b" stroke-width="4"/>
  <line x1="305" y1="155" x2="255" y2="162" stroke="#f59e0b" stroke-width="4"/>
  <line x1="305" y1="165" x2="255" y2="168" stroke="#f59e0b" stroke-width="4"/>
  <text x="283" y="188" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="700">×3 MAX — count aloud</text>
  <text x="283" y="200" text-anchor="middle" fill="#8b9cb8" font-size="8">Head control optional · then push-off</text>
  <!-- Step 3 Push-off teep -->
  <rect x="393" y="40" width="155" height="200" rx="8" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="470" y="58" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="700">③ PUSH-OFF TEEP</text>
  <circle cx="430" cy="120" r="10" fill="none" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="430" y1="130" x2="435" y2="168" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="435" y1="145" x2="490" y2="138" stroke="#f59e0b" stroke-width="5"/>
  <circle cx="510" cy="130" r="10" fill="#6b7280" opacity="0.7"/>
  <line x1="510" y1="140" x2="530" y2="155" stroke="#6b7280" stroke-width="2" transform="rotate(15 510 140)"/>
  <text x="470" y="195" text-anchor="middle" fill="#8b9cb8" font-size="8">Create distance — beat 4 or 5</text>
  <!-- Step 4 Sprawl + stand -->
  <rect x="558" y="40" width="154" height="200" rx="8" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="635" y="58" text-anchor="middle" fill="#3b82f6" font-size="10" font-weight="700">④ SPRAWL → STAND</text>
  <line x1="600" y1="145" x2="670" y2="145" stroke="#8b9cb8" stroke-width="2.5"/>
  <line x1="620" y1="145" x2="600" y2="175" stroke="#8b9cb8" stroke-width="2"/>
  <line x1="650" y1="145" x2="670" y2="175" stroke="#8b9cb8" stroke-width="2"/>
  <circle cx="635" cy="132" r="9" fill="none" stroke="#8b9cb8" stroke-width="2"/>
  <circle cx="680" cy="175" r="8" fill="#6b7280" opacity="0.6"/>
  <line x1="635" y1="155" x2="635" y2="185" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4"/>
  <text x="635" y="200" text-anchor="middle" fill="#3b82f6" font-size="8">Hips down · legs back · get up fast</text>
  <!-- RUN + cap -->
  <rect x="40" y="252" width="640" height="58" rx="10" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="1.5"/>
  <text x="360" y="274" text-anchor="middle" fill="#10b981" font-size="12" font-weight="800">⑤ SPRINT — never exceed 5 total strikes before exit</text>
  <text x="360" y="294" text-anchor="middle" fill="#8b9cb8" font-size="9">Grab response counts toward cap: knees + push-off = beats 2–4 · ground = sprawl only · RUN always</text>
  <text x="360" y="312" text-anchor="middle" fill="#fde047" font-size="9" font-weight="600">No plum war · no ground fight · pavement + friends jumping in = stand up immediately</text>
</svg>`
  }
];

function renderForgeWeekDiagrams() {
  const el = document.getElementById('men-system-week-diagrams');
  if (!el) return;

  el.innerHTML = FORGE_WEEK_DIAGRAMS.map(d => `
    <article class="forge-week-card">
      <header class="forge-week-card-head">
        <span class="forge-week-badge">Weeks ${d.week}</span>
        <strong>${d.title}</strong>
        <span class="forge-week-meta">${d.daily} · Test: ${d.test}</span>
      </header>
      <div class="forge-week-svg-wrap">${d.svg}</div>
    </article>`).join('');
}

function renderAllForgeWeekDiagrams() {
  renderForgeWeekDiagrams();
}