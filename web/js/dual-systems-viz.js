/** Resilience Shield (women) + Resilience Forge (men) */

const DUAL_LAYER_COLORS = {
  women: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
  men: ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']
};

function getDual() {
  return evidenceData?.dualSurvivalSystems;
}

function getSystem(key) {
  return getDual()?.[key];
}

function tierCls(t) {
  return `tier tier-${(t || 'B').replace(/[^A-D+]/g, '').replace('+', 'plus').toLowerCase() || 'b'}`;
}

function renderDualSystemsIntro() {
  const d = getDual();
  const el = document.getElementById('dual-systems-intro');
  if (!el || !d?.intro) return;
  const i = d.intro;
  el.innerHTML = `
    <div class="dual-intro-banner">
      <h3>${i.headline}</h3>
      <p class="dual-intro-plain">${i.plainEnglish}</p>
      <ul class="dual-intro-why">${i.whySplit.map(w => `<li>${w}</li>`).join('')}</ul>
      <div class="dual-intro-shared">
        <p><strong>Shared win condition:</strong> ${i.sharedWinCondition}</p>
        <p><strong>Shared weapon rule:</strong> ${i.sharedWeaponRule}</p>
      </div>
    </div>`;
}

function renderSystemHero(key) {
  const s = getSystem(key);
  const el = document.getElementById(`${key}-system-hero`);
  if (!el || !s) return;
  const t = s.timeToLearn;
  const cls = key === 'women' ? 'dual-hero-shield' : 'dual-hero-forge';
  el.innerHTML = `
    <div class="dual-hero ${cls}">
      <div class="dual-hero-badge">${s.forPopulation}</div>
      <h3>${s.name}</h3>
      <p class="dual-acronym">${s.acronym}</p>
      <p class="dual-tagline">${s.tagline}</p>
      <blockquote class="dual-one-sentence">${s.oneSentence}</blockquote>
      <div class="dual-hero-stats">
        <div class="dual-stat"><div class="val">${t.dailyMinutes}m</div><div class="lbl">Daily</div></div>
        <div class="dual-stat"><div class="val">${t.weeklyMinutes}m</div><div class="lbl">Weekly</div></div>
        <div class="dual-stat"><div class="val">${s.gainSplit.habitsPercent}%</div><div class="lbl">${s.gainSplit.habitsLabel}</div></div>
        <div class="dual-stat dual-stat-tier">${tierCls(s.tier)}<div class="lbl">Evidence tier</div></div>
      </div>
      <p class="dual-evidence-anchor"><strong>Evidence anchor:</strong> ${s.evidenceAnchor}</p>
      <p class="dual-threats"><strong>Primary threats:</strong> ${s.primaryThreats.join(' · ')}</p>
    </div>`;
}

function renderSystemExecutive(key) {
  const s = getSystem(key);
  const el = document.getElementById(`${key}-system-executive`);
  if (!el || !s?.executiveDistill) return;
  const d = s.executiveDistill;
  el.innerHTML = `
    <p class="dual-exec-lead">${d.lead}</p>
    <p class="dual-exec-verdict"><strong>${d.verdict}</strong></p>
    <div class="dual-exec-split">
      <div class="dual-exec-do">
        <span class="dual-exec-label">Do first</span>
        <ul>${d.doFirst.map(x => `<li>${x}</li>`).join('')}</ul>
      </div>
      <div class="dual-exec-dont">
        <span class="dual-exec-label">Do not</span>
        <ul>${d.doNot.map(x => `<li>${x}</li>`).join('')}</ul>
      </div>
    </div>`;
}

function renderSystemLayers(key) {
  const s = getSystem(key);
  const el = document.getElementById(`${key}-system-layers`);
  if (!el || !s?.fourLayers) return;
  const colors = DUAL_LAYER_COLORS[key];
  el.innerHTML = s.fourLayers.map((l, i) => `
    <div class="dual-layer-card" style="--layer-color:${colors[i] || '#10b981'}">
      <div class="dual-layer-header">
        <span class="dual-layer-num">L${l.layer}</span>
        <span class="dual-layer-name">${l.name}</span>
        <span class="dual-layer-pct">~${l.percentOfGain}%</span>
        <span class="${tierCls(l.tier)}">${l.tier}</span>
      </div>
      <p class="dual-layer-what"><strong>${l.what}</strong></p>
      <p class="dual-layer-time">Daily: ${l.daily} · Weekly: ${l.weekly}</p>
      <ul class="dual-skill-list">${l.skills.map(sk => `<li>${sk}</li>`).join('')}</ul>
      <p class="dual-layer-ev">${l.evidence}</p>
    </div>`).join('');
}

function renderSystemScenarios(key) {
  const s = getSystem(key);
  const el = document.getElementById(`${key}-system-scenarios`);
  if (!el || !s?.scenarioTree) return;
  el.innerHTML = s.scenarioTree.map(sc => `
    <div class="dual-scenario-card">
      <span class="dual-scenario-sit">${sc.situation}</span>
      <p class="dual-scenario-res">${sc.response}</p>
      <span class="dual-scenario-sec">${typeof sc.seconds === 'number' ? sc.seconds + ' sec' : sc.seconds}</span>
    </div>`).join('');
}

function renderSystemEightWeek(key) {
  const s = getSystem(key);
  const el = document.getElementById(`${key}-system-eight-week`);
  if (!el || !s?.eightWeek) return;
  const e = s.eightWeek;
  el.innerHTML = `
    <h4>${e.title}</h4>
    ${e.weeks.map(w => `
      <div class="dual-week-row">
        <span class="dual-week-label">Weeks ${w.week}</span>
        <div>
          <strong>${w.focus}</strong>
          <span class="dual-week-meta">${w.daily} · Test: ${w.test}</span>
        </div>
      </div>`).join('')}`;
}

function renderSystemVerdict(key) {
  const s = getSystem(key);
  const v = document.getElementById(`${key}-system-verdict`);
  const l = document.getElementById(`${key}-system-limits`);
  const accent = key === 'women' ? '#10b981' : '#3b82f6';
  const d = s?.nhiVerdictDistill;

  if (v) {
    if (!d) {
      v.innerHTML = `<p>${s?.nhiVerdict || ''}</p>`;
    } else {
      v.innerHTML = `
        <div class="dual-verdict-distill dual-verdict-${key}" style="--dual-accent:${accent}">
          <p class="dual-verdict-lead">${d.lead}</p>

          <h4 class="dual-verdict-heading">${d.trainShieldTitle}</h4>
          <ul class="dual-verdict-list">${d.trainShield.map(t => `<li>${t}</li>`).join('')}</ul>

          <h4 class="dual-verdict-heading dual-verdict-heading-muted">${d.notFoundationTitle}</h4>
          <ul class="dual-verdict-list dual-verdict-list-muted">${d.notFoundation.map(t => `<li>${t}</li>`).join('')}</ul>

          <h4 class="dual-verdict-heading">${d.beatsTitle}</h4>
          <ol class="dual-verdict-beats">
            ${d.beats.map((b, i) => `
              <li class="${i === d.beats.length - 1 ? 'dual-verdict-beat-final' : ''}">${b}</li>`).join('')}
          </ol>
        </div>`;
    }
  }

  if (l) l.textContent = s?.honestLimits || '';
}

function renderAllDualSystemsVisualizations() {
  if (!getDual()) return;
  renderDualSystemsIntro();
  ['women', 'men'].forEach(key => {
    renderSystemHero(key);
    renderSystemExecutive(key);
    renderSystemLayers(key);
    renderSystemScenarios(key);
    renderSystemEightWeek(key);
    renderSystemVerdict(key);
  });
}