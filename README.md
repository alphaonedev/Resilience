# Resilience

**Evidence-based research on violence domains, situational awareness, multi-attacker avoidance, martial arts effectiveness, and personal security preparation.**

> ⚠️ **Educational research only.** See [full legal disclaimer](web/index.html#disclaimer) before using any material.

[![Open Research](https://img.shields.io/badge/research-open-blue)](data/evidence.json)
[![Methodology](https://img.shields.io/badge/method-3x7_adversarial-purple)](data/adversarial-3x7-round2.json)
[![Evidence Tiers](https://img.shields.io/badge/tiers-A+_to_D-green)]()

## Live Presentation

Open `web/index.html` in a browser, or serve locally:

```bash
cd web && python3 -m http.server 8080
# Visit http://localhost:8080
```

## What This Project Covers

1. **Violence Domain Taxonomy** — Martial arts → UFC → bare knuckle → street → organized crime → Tier-1 SMU/war. Each tier is a different optimization problem.

2. **The Missing Metric** — Percentage of people who detected a probable multi-attacker scenario and **proactively avoided** it. **No direct peer-reviewed metric exists.** We document the gap honestly and provide proxy metrics (EAAA Assess unit, NCVS resistance data, street-fight escape rates).

3. **Situational Awareness** — Cooper Color Code, Stay Alert Stay Alive, OODA Loop: doctrinal frameworks (Tier C) vs. EAAA risk detection (Tier A+ RCT).

4. **Technique Rankings** — Boxing vs. karate vs. kung fu punches; kicks; grappling — ranked by biomechanics, full-contact outcomes, and domain transfer.

5. **3×7 Adversarial Voting (Round 2)** — Three epistemic adversaries score seven interventions across seven criteria with proactive avoidance weighted highest.

## Key Findings (Round 2)

| Rank | Intervention | Weighted Score | Tier |
|------|-------------|----------------|------|
| 1 | EAAA / Empowerment Self-Defense | 7.89 | A+ |
| 2 | Stay Alert Stay Alive + Cooper SA | 5.42 | B |
| 3 | Integrated MMA | 5.38 | A |
| 4 | Brazilian Jiu-Jitsu | 5.12 | A |
| 5 | Boxing + Wrestling | 4.89 | B+ |
| 6 | Krav Maga | 3.72 | C |
| 7 | Traditional MA (low-contact) | 1.95 | D |

**Unanimous adversarial finding:** The proactive multi-attacker avoidance percentage cannot be filled by martial arts RCTs. EAAA "Assess" is the closest validated proxy (50–57% victimization reduction).

## Repository Structure

```
Resilience/
├── data/
│   ├── evidence.json              # Master evidence database
│   └── adversarial-3x7-round2.json # Round 2 voting results
├── docs/
│   └── SOURCES.md                 # Primary source bibliography
├── research/
│   └── ADVERSARIAL_ROUND2.md      # Full adversarial deliberation
├── web/
│   ├── index.html                 # Interactive presentation
│   ├── css/style.css
│   └── js/app.js                  # Chart.js visualizations
└── README.md
```

## Evidence Tiers

| Tier | Standard |
|------|----------|
| **A+** | RCT or replicated operational cohort with measured outcomes |
| **A** | Peer-reviewed study or large institutional dataset |
| **B** | Transparent observational study (n>100), replicable |
| **C** | Limited peer review, institutional doctrine, white papers |
| **D** | Anecdotal, marketing, untested cooperative drills |

## Primary Sources

- Senn et al. (2015) NEJM — EAAA RCT (50% rape reduction)
- Senn et al. (2023) Eur J Psychotraumatol — Real-world EAAA (57.3% reduction)
- Bachman et al. (2022) — NCVS verbal/passive resistance (57% injury reduction)
- Louie Martin (2018) Martial Journal — 154 street fights analysis
- LeBlanc (2007) EJMAS — LAPD ground fighting (62%, not 90%)
- National Sheriffs' Association — BJJ white paper (Marietta, St. Paul PD)
- ESPN Fightnomics (2018) — UFC finish method trends
- Archives of Budo (2018) — Karate punch force (~2,645N)
- Boxing Science — Amateur boxing punch force (~2,500N)

## Contributing

This is an open research repository. Submit issues or PRs with:
- Primary source citations
- Evidence tier justification
- Adversarial voter challenge with counter-evidence

## License

Research data and synthesis: CC BY-NC 4.0 (attribution, non-commercial). See disclaimer for use limitations.

---

**If you are in immediate danger, contact local emergency services.**