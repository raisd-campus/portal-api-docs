# Shared Demo Community chat

Local candidate prepared 12 October 2026. Demo only; no package publication, hosted migration or deployment has occurred. Student record schema remains **4**.

## Ownership and capability

Design-system **0.7.0 candidate** owns directory/group lists, members, avatar stacks, conversation headers/layouts, message lists and responsive dock/overlay presentation extracted unchanged from Student. `system/community` and `system/community-message-list` accept display records, controlled state, callbacks and slots; they import no portal contracts, fixtures, queries or router. Existing chat rows, composer, date dividers and previews remain shared. Optional download callbacks retain the file tile; an image lightbox's existing filename can invoke original-byte download.

Portal adapters own membership projections, navigation layers, drafts, scroll positions, attachment policy, services and meetups. Student keeps local mock mode and its original per-student service conversations. Lecturer keeps a resizable desktop Community dock starting at 296px, full-screen phone/tablet overlay, one Dashboard menu item and an empty Dashboard body. Existing Materials is direct-route only.

`DEMO_COMMUNITY_CHAT=true` enables the transport in Portal API. It defaults off and rejects Live CMS mode. The Raisd demo API sets that flag, and `GET /v1/meta/community` then advertises `enabled: true`, `version: 1` and `chunkBytes: 1048576`. Missing support retains Student's existing adapter. The staff portal mounts Community only for a Staff or Lecturer sign-in. A campus Admin sign-in does not show the panel. The community route accepts a lecturer session, and a staff session when that email is linked to a teaching record. An empty academic title is valid. Unsupported transport never invents success.

## Sessions, identity and membership

Both portals call `/v1/community/` using their existing authenticated bearer sessions. The API derives the author from the session, ignoring client identity fields. Adam is canonical `staff-adam-watson`: **Prof. Adam Watson**, **L00032**, `adam.watson@example.edu.my`, and the canonical staff avatar. His account header, roster entries and message identity use these records.

Lecturer's directory supports all programmes and exact offerings in the signed-in lecturer's teaching assignments. Programme groups include active students across every programme version and unique curriculum-assigned lecturers. Module groups require confirmed `registered` participation in that exact offering, an active enrolment and the assigned lecturers. Student's selected owned enrolment retains its existing read-only historical context rules. Group access and file delivery are checked again on every API request. Direct-message targets must be distinct accessible community people; current-person cards are disabled. Group → members → DM navigation retains Back layers.

## Methods and refresh

The existing Student method names and response envelopes remain: `getChatConversations`, `getChatConversation`, `sendChatMessage`, `markChatConversationRead`, `deleteChatMessage`. Shared transport uses the same names under `/v1/community/{method}` for Student and Lecturer; old `/v1/portal/` service calls remain compatible. Neutral `getCommunity` returns multi-programme directory records and `getProfile` returns canonical identity. OpenAPI documents the capability, directory, profile, chat and file operations.

Visible active conversations poll every **3 seconds**. Directory/unread summaries poll every **10 seconds** while the document is visible, with immediate mutation/focus refresh. Read watermarks acknowledge the last displayed message, never a newer unseen one. Direct outgoing messages show Sent/Read. Only the sender can delete. Idempotent send request IDs reject conflicting retries and serialize concurrent duplicate retries. Read sequences remain monotonic after deletion.

Both portals preserve drafts and failed sends through navigation and viewport changes. Pending sends lock their composer/attachments. Session changes dispose identity-specific adapter state and temporary preview URLs; late replies cannot replace a different active Lecturer conversation. File download errors retain retry controls. Legacy files with no recovered resource render as unavailable tiles, without a fabricated download.

## Bytes and persistence

Limits remain **5 attachments**, **25 MiB per file**, **75 MiB total**. Safe previews use JPEG, PNG, GIF and WebP; other files remain download tiles. The browser sends actual bytes in bounded **1 MiB** chunks. Upload completion verifies length, SHA-256 and safe-image signatures. Downloads recheck current conversation access, return original filename/MIME/digest/chunks, and the browser verifies the complete bytes before preview/download. Browser blob URLs are temporary and never stored as durable resources.

`createCommunityChatStore` offers serialized memory transactions and Postgres transactions protected by one advisory lock. Additive `demo_community_chat` stores the shared conversation/message/read/idempotency document separately from `student_portal_state.chat_store`; `demo_community_chat_chunks` stores artifact bytes separately. This simple Demo store is not a Live messaging scale design. Memory lasts until API restart; Postgres retains shared history and bytes across fresh adapters/API processes.

`migrations/demo-community-chat.sql` is explicit and idempotent. `npm run db:migrate` applies the same statements with the rest of the Demo schema. Enabling Postgres transport requires these tables; application startup never applies chat DDL. During development use only disposable localhost data. Do not run it against hosted databases without a separate instruction.

`migrateLegacyCommunityChat(records, store, studentIds)` is an explicit non-destructive import across owned enrolments. It copies programme/module/DM history, skips service chats, hashes exact legacy variants to deduplicate identical records, preserves differing bodies and retains original stores. Unrecoverable attachments have no resource and their old preview URL is removed. Run import before enabling shared writes: new imports reject an already active shared send history. Repeating a completed import adds zero records.

## Local checks and release

Run `npm run test:community` and `npm run typecheck:local` in Portal API. Optional Postgres tests accept only `LOCAL_COMMUNITY_TEST_DATABASE_URL` on **127.0.0.1:55433/community_audit**; they apply only the additive chat SQL and clear the test chat tables. They never accept a hosted URL.

Pack design-system 0.7.0 into `$env:TEMP/raisd-community-candidate`, then run `python design-system/scripts/install-community-candidate.py` from the sibling workspace. This copies the verified local candidate into both installed packages without re-resolving other dependencies or changing tracked release pins. Run shared `npm run check`, Lecturer `npm run check`, and Student `npm run check:all`. `student-portal/scripts/test-paired-community.mjs` uses isolated local servers on 5183/5184 and API 8087, with two independent browser contexts and synthetic credentials against disposable data.

Candidate captures are staged at `docs/design-system/candidates/0.7.0`; the released public catalogue remains at its existing version until approval. Final approval covers package publication and released 0.7.0 consumer pinning. Commits, pushes, hosted migrations and application deployments need their own instruction.

Community subpaths: `system/community` (directory/group lists, dock/overlay and layout), `system/community-members` (roster), `system/community-conversation-header` (identity/header) and `system/community-message-list` (messages). Separate imports preserve lazy consumer boundaries.

Local evidence and remaining release boundary: [13 October candidate verification](2026-10-13-community-candidate-verification.md).

Stable Community host attachment refs preserve active composer focus while directory/profile polling updates account data. Disposed clients reject pending capability detection rather than falling back through another account. Original-byte download callbacks apply only to shared programme/module/DM transport; legacy Student services retain metadata-only file presentation. Final local evidence covers 797 Student units, 278 Chromium cases with targeted recovery, 41 WebKit cases and 19 independent paired checks.

Sending alone never acknowledges incoming messages, including a committed send whose reply is lost. Only explicit displayed-message acknowledgements advance read watermarks. Final API memory verification passes 46 checks; the paired demo passes 19 against the refreshed local API.

13 October consistency correction: Student and Lecturer use `system/community-resize` for the same desktop grip, width limits and keyboard interaction. Shared `ChatComposer communityInset` preserves Student's existing full-width footer within the 12px conversation inset; Lecturer now uses that same composition. Phone/tablet retain the shared overlay without a resize grip. No additional styling or redesign is introduced.
