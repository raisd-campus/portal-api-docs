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
Browser → Traefik/TLS (k3s built-in) → portal Deployment
Browser → api.raisd.co → Traefik → portal-api Deployment → CMS / Postgres / files
```

Concrete build, image, manifests, probes, env and release flow for the Portal API: [portal-api-deployment.md](../backend/portal-api-deployment.md).

## PoC alternative (not production)

For an early hosted Demo of a portal SPA + Portal API with a free Postgres, see the **Vercel + Neon** path in [vercel-neon-poc.md](vercel-neon-poc.md). That note does **not** change ADR-2/ADR-3; portals still call only the Portal API, and Live campus hosting remains UltaHost / k3s.

## Related

- Printable overview: [`docs/Raisd-Campus-Architecture.pdf`](../../Raisd-Campus-Architecture.pdf)
- Diagrams: [`docs/diagrams/`](../../diagrams/)
- Open questions on hosting: [SDD-10](../../sdd/10-open-questions.md)
- PoC Vercel + Neon: [vercel-neon-poc.md](vercel-neon-poc.md)
