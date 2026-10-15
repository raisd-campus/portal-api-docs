# Lecturer Modules adjustments — candidate evidence

Unpublished 0.7.0 candidate, 13 October 2026. Tracked consumer pins remain 0.6.2.

The list uses shared All modules / With enrolments / No enrolments tabs below the programme heading, defaulting to With enrolments. Three tabs now use the same existing 9rem-per-tab scrolling rule as Student Online Forms. Phone keyboard selection reveals the selected tab without label compression; tablet/desktop show all three. All/with/no-enrolment lists contained 9/1/8 exact canonical assigned offerings in the Adam sample.

Details show Students (4) and the Day / Time / Location timetable, with the redundant Registered Students overview field and Dates column removed. Canonical effective-date fields remain unchanged in the transport. Source and UI changes are presentation-only.

Focused Lecturer lint/TypeScript/build and 21 selected tests pass. Shared full check passes 16 units and 29 consumer browser cases, including the new 375/768/1440 three-tab regression. Applicant full check passes 65 units and 70 browser cases. Student full compatibility gate passes: 797 units, 278 Chromium cases (46 intentional skips) and 41 WebKit cases (31 intentional skips). Lecturer aggregate verification stays on hold.

The existing Lecturer Vite server alone was restarted with --force to activate the updated shared JavaScript dependency. API and Student servers were not restarted. No API/schema change, package publication, release pinning, commit, push, migration or deployment occurred.
