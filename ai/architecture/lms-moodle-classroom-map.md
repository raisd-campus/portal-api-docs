# Raisd LMS — Moodle + Google Classroom capability map

**As of:** 31 October 2026  
**Status:** Research / documentation — **Proposed**, not Live LMS.  
**Human page:** [`docs/diagrams/lms-reference/index.html`](../../diagrams/lms-reference/index.html) · **Steps + sequences:** [`features.html`](../../diagrams/lms-reference/features.html) · [lms-feature-steps.md](lms-feature-steps.md)  
**Binding:** [lms.md](lms.md) · [lms-features.html](../../diagrams/lms-features.html) · [SDD-11](../../sdd/11-capability-catalog.md) · SDD-09 BASE-44  

## Rules

- Raisd is **not** Moodle and **not** Google Classroom. Absorb **capabilities**, not chrome or feature-parity contracts.
- LMS = **role surfaces on Portal API** (Student / Lecturer / Staff), not a fifth portal.
- Demo ≠ Live for assignments, quizzes, live class, and file delivery.
- Reference screenshots are labelled **Reference — not Raisd** (Moodle sandbox / Wikimedia / Google Help).

## Sources

| Source | Use |
|---|---|
| Moodle 4.5 / 5.x docs + sandbox.moodledemo.net | Activity / resource / gradebook vocabulary |
| Google Classroom Help + teacher user guide | Classwork / Stream / Grades / Materials vocabulary |
| Raisd CAP-11…35, 40, 43, 44 + INPUT-F01…F37 | Product backlog binding |

## Capability map (function → Raisd)

| # | Function area | Moodle (familiar) | Google Classroom (familiar) | Raisd CAP | Raisd Demo today | Milestone |
|---|---|---|---|---|---|---|
| 1 | Course / class space | Course page | Class | CAP-44 workspace | Partial Materials / Classrooms | M3 |
| 2 | Enrolment / roster | Enrolments, cohorts | People invite | CMS SoR (not LMS) | CMS / Access | M2–M3 |
| 3 | Course structure / topics | Sections, subsections | Topics on Classwork | CAP-27 release | Partial teaching weeks | M5 |
| 4 | File / page resources | File, Page, Folder, Book, URL | Material + Drive/YouTube/Link | CAP-17, 18, 22 | Placeholder / Partial Materials | M3 |
| 5 | Multimedia | Media areas, H5P | YouTube, Drive media | CAP-18 | Placeholder | M3 |
| 6 | Assignment brief | Assignment activity | Assignment create | CAP-19 | Partial | M3 |
| 7 | Submit / resubmit | Assignment submission | Turn in / unsubmit | CAP-20 | Demo (metadata) | M3 |
| 8 | Marking / return | Grading, annotate | Grade & return, comment bank | CAP-28 | Not started / Classroom draft feedback Demo | M3 |
| 9 | Rubrics / advanced grading | Rubrics, marking guide | Rubrics | CAP-28 | Not started | M3 |
| 10 | Quizzes / exams | Quiz, question bank | Forms / practice sets (edition) | CAP-24 | Placeholder | M5 |
| 11 | Forums / discussion | Forum | Stream questions | CAP-25 | Demo Community | M5 |
| 12 | Messaging | Messages | Email / Stream | CAP-25 | Partial | M5 |
| 13 | Live class | BBB / external | Meet | CAP-26 | Not started | M5 |
| 14 | Gradebook | Grader report | Grades page | CAP-13 | Demo results surface | M3 |
| 15 | Progress / completion | Activity completion | Work status colours | CAP-13, 40 | Partial | M3 |
| 16 | Attendance | Attendance plugin / shared | — (often Meet / other) | CAP-12 | Demo staff + student | M3 |
| 17 | Timetable / calendar | Calendar, timeline | Class calendar | CAP-11 | Demo | M3 |
| 18 | Analytics | Reports, logs | Insights (edition) | CAP-40 | Not started | M5 |
| 19 | Content QA / copyright | Content bank / site policy | Drive sharing rules | CAP-43, 42 | Not started | M3 |
| 20 | Orientation | Site / course induction | — | CAP-32 | Not started | M3 |
| 21 | Integrity / originality | Turnitin plugins etc. | Originality reports | CAP-29 | Not started | M3 |
| 22 | Accessibility | Themes, a11y | a11y in Docs/Classroom | CAP-35 | Demo | M2 |
| 23 | Mobile | Moodle app | Classroom app | CAP-36 | Partial | M2 |
| 24 | Library / e-resources | External / LTI | Drive libraries | CAP-31 | Not started | M5 |
| 25 | Groups | Groups / groupings | Individual / multi-class post | Shared academic | Needs checking | M3 |

## Explicit non-goals (this docs pack)

- Cloning Moodle Boost or Classroom chrome into Raisd.
- Claiming Live LMS or Moodle/Classroom parity.
- Building Staff portal LMS product code (docs-only pass).

## Related Raisd pages

| Page | Path |
|---|---|
| Reference gallery | [lms-reference/index.html](../../diagrams/lms-reference/index.html) |
| Step-by-step + sequences | [lms-reference/features.html](../../diagrams/lms-reference/features.html) · [lms-feature-steps.md](lms-feature-steps.md) |
| Online-class / quizzes / breakouts research | [lms-online-class-options.md](lms-online-class-options.md) |
| Research hub | [lms.html](../../diagrams/lms.html) |
| Architecture | [lms-architecture.html](../../diagrams/lms-architecture.html) |
| F01–F37 | [lms-features.html](../../diagrams/lms-features.html) |
| Schema / ERD | [lms-schema.md](../backend/lms-schema.md) |
