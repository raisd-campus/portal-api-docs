# Deployment architecture (agent knowledge)

**Canonical product text:** [SDD-12](../../sdd/12-deployment-architecture.md).  
This file is the short agent-facing summary.

## ADR-2 — Existing UltaHost VDS in Singapore

Do not invent a new cloud provider or order from UltaHost VPS tiers when the working-group decision is to use (and stage onto) the existing estate. Concrete machine assignment and which Premium runs the old CMS remain TBC where SDD-12 says so.

## Runtime direction

- Kubernetes (**k3s**) on the estate.
- **Stage 1:** one node; Applicant portal + Portal API + Postgres + evidence volume.
- Later stages add edge node, student/lecturer portals, restore drill, then grow only when full.

Agents must not:

- Deploy portal code onto the CMS host.
- Assume production hostnames are live before the matching stage.
- Commit server passwords or kubeconfigs into git.

## Request path (target)

```text
Browser → Caddy/TLS on edge → portal Deployment
Browser → api.raisd.co → Portal API Deployment → CMS / Postgres / files
```

## Related

- Printable overview: [`docs/Raisd-Campus-Architecture.pdf`](../../Raisd-Campus-Architecture.pdf)
- Diagrams: [`docs/diagrams/`](../../diagrams/)
- Open questions on hosting: [SDD-10](../../sdd/10-open-questions.md)
