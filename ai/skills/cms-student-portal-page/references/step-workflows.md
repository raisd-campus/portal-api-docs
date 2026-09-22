# Step Workflow Consistency

Use this reference for progress hubs with URL-backed steps. Graduation is the maintained implementation reference: `src/components/features/academic/academic-graduation-content.tsx`, `docs/academic-graduation.md`, and `tests/e2e/graduation.spec.ts`.

## Build a state matrix first

Map states before writing JSX. One business step may move through several presentation states, such as document review followed by fee payment. For each state, record:

| State | Summary title and tone | Status badge | Summary details or footer | Action bar |
| --- | --- | --- | --- | --- |
| Not started or unavailable | Neutral | Neutral | Only facts already known | Start action, or none when gated |
| Submitted review | Warning | Under review | Reference facts; determining checks in `SummaryCard.footerContent` | View the submitted form |
| Information required or rejected | Warning or destructive | Matching semantic status | The same checks or decision context | View the submitted form |
| Document checks complete | Success | Accepted or approved | Keep the completed checks in the summary footer | Secondary form link plus primary `Proceed to Step N` |
| Fee pending | Warning | Unpaid, partially paid, or pending validation | Invoice total as a summary item; proof validation in the summary footer | Invoice link only while payment is outstanding |
| Fee settled | Success | Paid | Invoice total remains visible | Secondary invoice link plus primary `Proceed to Step N` |
| Processing or collection | Warning while active; success when complete | Phase-specific status | Event or document history in the summary footer when tabular | No next action until the phase is complete |
| Complete | Default neutral when retained | Completion badge only when the reference uses it | Green checked icon above the title and recorded milestones, or the workflow's empty state when completed cases leave the active projection | Only a completion-specific action, if one exists |

## Composition rules

- Start each active step with one `SummaryCard`. Do not place a second summary card inside `InnerSection` to represent the same step.
- Put checks that determine the summary outcome in `footerContent`, creating the flush-divided third section used by Graduation clearance and document collection.
- Put invoice totals in the fee summary. Do not expose an invoice link on a different workflow step unless that step explicitly owns the fee.
- Put phase-specific status in the SummaryCard action slot. Translate storage states into student-facing states; a submitted review reads **Under review**, not **Submitted**.
- Use `PageActionBar` only for the selected step's actions. A completed prior step names the next destination, such as **Proceed to Step 2**. Do not use generic actions such as **Go to Current Step**.
- Do not leak future-step actions into historical or current steps. Tests should assert the absence of actions that belong to another step.
- Keep a separate final Complete tab only when the approved workflow retains completed content as a browsable step, as Graduation does. When completion removes the case from the active projection, return the progress area to its established empty state and remove the Complete tab, as Immigration does.
- When one approved step combines several service milestones, show the complete ordered sequence rather than only recorded events. Use a connected vertical timeline: checked circles and solid connectors for completed milestones, numbered circles and dashed connectors for unfinished milestones, and text-bearing semantic badges for every status.
- Timeline markers, connectors, and badges must use the same solid semantic token for the same state: `success-solid` for completed and `warning-solid` for the current action or process. Do not introduce a second green or orange token for decorative timeline elements. Extend every connector to the next marker rather than stopping at the current row boundary.
- Map the same business status to the same semantic family on every related route. For Student Pass surfaces, valid is success, expiring or active processing is warning, and expired or cancelled is destructive. Reuse `SummaryCard`, `DetailSectionCard`, `EmptyState`, and `PageActionBar` before adding feature-owned containers; keep terminal guidance inside the summary and omit an action bar when no truthful action exists.
- Scope a visible Case history to milestones owned by the selected numbered step. Do not repeat application, fee, or future-stage milestones inside a processing step merely because the read model exposes the full case progression.
- When a student-owned upload is a structured form submission, keep the workflow step as a status-and-navigation surface and hand off to the existing Online Forms template, draft, confirmation, immutable-submission, and review flow. Link the exact case at the API boundary and reflect its draft, under-review, accepted, withdrawn, and rejected states back in the workflow summary. Do not build a second embedded uploader inside the progress hub merely because only one file is required.
- Use a separate raised `InnerSection` only for supporting guidance that is independent of the summary decision, as Graduation does for Convocation guidance.

## Verification

Compare the implementation and browser test side by side with Graduation and at least one sibling state on the same feature overview. Cover the initial, active, completed, unavailable, and final states, plus any compound state where one numbered step contains more than one business phase. At both supported desktop widths, verify the SummaryCard section anatomy, badge wording and tone, action ordering, explicit next-step labels, semantic-token family, and absence of cross-step or misleading terminal actions.
