# AuditTrail — released 0.8.0

Published to GitHub Packages on 15 October 2026 after the owner's approval.
This former candidate is delivered: all three portal pins use exact registry 0.8.0,
and Lecturer's source-preview aliases are removed. The shared API, ownership and
verification are documented in the component guide and Classrooms verification
receipt. Six current shared AuditTrail/accordion captures are in captures.json.
The library source remains locally reviewable; no unrelated work was committed.

Shared gate: 21 units, 35 responsive browser cases, type/build/consumer build.
Separate exact-archive Lecturer gate: lint, 63 tests and production build.
Registry archive integrity: sha512-LTqjMRDlI4y+FeY4S021C8wmXlhH/Iob5i3kKbNNRTtXhbT+HH/0GqlPcQZmXV44SDqWuyZAg614/V1GcWr+MQ==

The 0.7.0 clean-install failure is historical and is resolved by this release.
Use scripts/publish-release.mjs for future manual releases; it checks the securely
stored login's publishing scope before attempting a registry write.
