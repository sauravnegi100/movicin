---
subtitle: v10 consolidated product, UX, engineering, security, TV tracking, editorial, integrations, and delivery specification
title: Movicin --- Master Product & Engineering Prompt v10
---

# Movicin — Master Product & Engineering Prompt (v10.0)

> **Working product name:** Movicin (provisional; the owner may rename it later). Do not treat the name as legally cleared or permanently approved.\
> **Primary visual reference:** https://cinejoy.pk/\
> **Fallback visual reference:** https://www.moctale.in/ — use only if Cinejoy cannot be accessed after a real browser/manual attempt; record the limitation.\
> **Purpose:** Build a polished, production-minded movie discovery and
> community platform, starting with a responsive web application and
> designed so a mobile app can be added later.\
> **Primary instruction:** Do not attempt to generate the entire
> application in one uncontrolled pass. First inspect the repository,
> produce a plan, establish the architecture and design system, then
> implement in small, tested vertical slices.


> **Version:** v10.0 — builds on v9.1, resolves the remaining approval-workflow conflict, corrects version metadata, and adds prioritized episode/season tracking, strict spoiler-free mode, film reference features, release reminders/calendar export, authorized ticket links, editorial/news/forums, live form-validation UX, non-blocking performance requirements, and privacy-safe shareable Wrapped summaries.
> **Naming status:** Provisional only. The owner may change the name later; legal availability has not been established.
> **What this edition emphasizes:** all retained prior scope, one authoritative roadmap, canonical movie/TV data, explicit approval gates, episode progress as a high-priority post-core milestone, cross-surface spoiler safety, verified/licensed enrichment data, consent-based reminders and calendar integrations, editorial/community safety, privacy-safe sharing, and measurable performance targets. Features remain staged; this document does not authorize a one-pass mega-build.

------------------------------------------------------------------------

# PART 1 --- ROLE, GOAL, AND WORKING RULES

You are the lead product engineer, senior full-stack architect, product
designer, accessibility specialist, database designer, security
reviewer, and test engineer for this project. Work as a careful
engineering partner, not as a code generator that merely produces
attractive screenshots.

Build **Movicin** (provisional working name), a premium movie and TV discovery, personal viewing diary,
rating, review, and social platform. The experience should feel
cinematic, refined, responsive, fluid, fast, and trustworthy. Use https://cinejoy.pk/ as the **primary visual reference**. Attempt a real browser/manual inspection first. Only if Cinejoy is genuinely inaccessible (for example, repeated load failure or a blocking access error), use https://www.moctale.in/ as the fallback reference and record why the fallback was needed in `docs/REFERENCE_REVIEW.md`. Do not silently switch references. Take inspiration from general UX qualities, not exact compositions. **Never copy either site's branding, logos, text, assets, code, distinctive layout or identity.**

The platform must let visitors discover movies without signing in.
Registered users should be able to create profiles, select preferences,
rate movies from **0 to 10**, mark movies as watched, maintain
watchlists and viewing history, publish reviews, comment, follow other
users, create lists, receive notifications, and message other users
subject to privacy and safety rules.

The long-term product should support multiple interface languages,
personalized recommendations, social discovery, and a future Android/iOS
application.

## Mandatory working rules

1.  **Inspect before changing.** If a repository already exists, inspect
    its files, package manager, scripts, architecture, git status, and
    current functionality before editing anything. Do not overwrite
    working code blindly.
2.  **Plan first.** Create and maintain `docs/PRODUCT_SPEC.md`,
    `docs/ARCHITECTURE.md`, `docs/DATABASE_SCHEMA.md`,
    `docs/DESIGN_SYSTEM.md`, `docs/SECURITY.md`, `docs/TEST_PLAN.md`,
    and `docs/ROADMAP.md`.
3.  **Work incrementally.** Implement one coherent feature slice at a
    time. After each slice, run relevant lint, type checks, tests, and
    build. Fix failures before moving on.
4.  **No fake functionality.** Do not leave visible buttons, forms,
    filters, menu items, or controls that do nothing. If a feature is
    not implemented, hide it or clearly label it as planned; do not
    pretend it works.
5.  **No fake data in production flows.** Seed data may be used in
    development, but production pages must distinguish
    unavailable/loading/empty states from real data.
6.  **Use current stable releases** that are compatible with one
    another. Verify package names, APIs, and installation instructions
    against official documentation instead of guessing.
7.  **Avoid overengineering.** Begin with a modular monolith and managed
    services. Do not introduce microservices, Kubernetes, Redis, queues,
    vector databases, or a separate Express server unless a demonstrated
    requirement justifies them.
8.  **Explain important choices** in plain language, especially choices
    that affect maintainability, cost, security, licensing, or the
    future mobile app.
9.  **Keep secrets server-side.** Never expose database service-role
    keys, private provider tokens, AI keys, or other secrets to the
    browser, source control, logs, or generated client bundles.
10. **Do not claim tests passed unless you actually ran them.** Report
    what was run, results, failures, and anything not tested.
11. **Preserve developer understanding.** Use clear names, focused
    modules, readable code, and comments for non-obvious decisions. The
    owner is learning full-stack development and must be able to explain
    the architecture in interviews.
12. **Ask questions only when blocked by a real decision.** Otherwise
    make a reasonable, documented choice and proceed.
13. **Use IST (Asia/Kolkata) for project-facing dates and examples**
    unless the user explicitly selects another timezone. Store
    timestamps in UTC and format them in each user's chosen timezone
    where applicable.
14. **Accessibility and reduced motion are requirements**, not optional
    polish.
15. **Do not implement payment functionality** unless a later explicit
    product decision requests it; it is not currently part of the
    product.

------------------------------------------------------------------------

# PART 2 --- PRODUCT PRINCIPLES

## Product promise

Help people answer four questions:

-   What should I watch?
-   Is this movie worth my time, and how reliable is the rating?
-   What do people with similar taste think?
-   How do I keep a meaningful record of what I watch?

## Product principles

-   **Renameable by design:** Movicin is a working name, not an architectural dependency. Renaming must be a configuration/content task, not a rewrite.
-   **Discovery before complexity:** visitors can browse and search
    without creating an account.
-   **Personal, not generic:** the signed-in experience becomes more
    relevant as the user rates, watches, saves, and skips movies.
-   **Trustworthy ratings:** distinguish the platform's community score
    from third-party ratings and popularity.
-   **Editorial + algorithmic discovery:** mix curated collections,
    popular releases, hidden gems, and personalized picks.
-   **Social by choice:** profiles, lists, activity, and messaging must
    have privacy controls.
-   **Premium but usable:** cinematic visual effects must never obstruct
    content, reading, navigation, or mobile performance.
-   **International by design:** avoid hard-coded English strings, date
    formats, currencies, and assumptions about writing direction.
-   **Progressive delivery:** ship a strong core before advanced AI or
    complex social features.
-   **Data ownership and portability:** let users understand and manage
    their own activity, including account deletion and export where
    practical.
-   **Honest recommendations:** explain why a title was recommended
    where possible and offer "not interested" feedback.

## Working name and branding — Movicin is provisional

Use **Movicin** as the current working/display name for development, so the project has a coherent identity in local previews and product copy. The owner explicitly expects the option to change the name later.

- Do not claim that Movicin is legally cleared, trademark-safe, or available as a domain or social handle.
- Do not create a final logo, custom wordmark, brand mascot, or irreversible visual identity in this phase. A simple text wordmark is sufficient.
- Keep the product name, short description, metadata defaults, and any brand text in one central configuration module (for example, `src/config/brand.ts`) or a single validated public configuration value. Components must not hard-code the name independently.
- Use `NEXT_PUBLIC_APP_NAME=Movicin` only as a public display configuration if the chosen setup requires an environment variable; never put secrets in public variables. Provide a safe local fallback and document how to change it. Prefer one typed accessor over reading environment variables throughout the codebase.
- Use the current name in page titles, app metadata, login/onboarding copy, emails, and documentation only through the shared configuration where practical.
- Do not bake the brand name into database table names, internal IDs, provider IDs, storage bucket names, API contracts, auth identifiers, or irreversible schema choices. Prefer neutral technical identifiers so a rename does not require a database migration.
- Do not assume the name should appear in every URL. Keep routes stable and descriptive; if a future domain or slug changes, define redirects and canonical URL handling.
- Before a public launch, perform a proper trademark clearance search for relevant jurisdictions and classes, check domains/social handles/app stores, and obtain qualified legal advice where needed. A search result alone is not legal clearance.
- Do not use Cinejoy's or Moctale's brand assets, copy, logo, code, or distinctive visual identity.

------------------------------------------------------------------------

# PART 3 --- REFERENCE ANALYSIS

## Reference priority and fallback rule

1. **Primary:** https://cinejoy.pk/
2. **Fallback only if the primary is inaccessible:** https://www.moctale.in/

Attempt to inspect Cinejoy in a real browser at desktop and mobile viewports before deciding it is inaccessible. A crawler or text extractor returning little content is not, by itself, proof that the site is inaccessible. If the primary cannot be loaded or meaningfully inspected after reasonable attempts, record the date, attempted device/browser/viewport, error or limitation, and the reason for switching in `docs/REFERENCE_REVIEW.md`; only then inspect Moctale as the fallback. If both are inaccessible, document that and do not invent observations.

For whichever reference is actually inspected, record:
- Homepage first impression, hierarchy, navigation, search and content density.
- Typography, whitespace, poster/backdrop scale, image treatment and responsive layouts.
- Movie/TV detail-page hierarchy and cast/crew presentation, if accessible.
- Hover, focus, keyboard, loading, empty, error and route-transition states.
- Motion, scrolling, reduced-motion behaviour and mobile touch behaviour.
- Performance observations only when measured; distinguish measurements from visual impressions.
- Which general principles are useful for Movicin and how Movicin will implement them differently.

Do not copy either reference's brand, logo, assets, text, code, exact layout or distinctive visual identity. Translate observations into hypotheses, then test them on Movicin. Do not claim the reference was fully inspected if it was not.
------------------------------------------------------------------------

# PART 4 --- RECOMMENDED TECHNOLOGY ARCHITECTURE

Use a **TypeScript-first modular monolith** for the first release.

## Core stack

### Web application

-   Next.js using the current stable App Router.
-   React.
-   TypeScript with strict mode enabled.
-   Tailwind CSS.
-   shadcn/ui and Radix primitives where appropriate for accessible
    controls.
-   Motion for React as the primary React animation library.
-   GSAP only for selected complex cinematic timelines or scroll
    sequences.
-   CSS transitions and browser-native features for simple effects.

### Data and managed services

-   PostgreSQL managed through Supabase.
-   Supabase Auth for authentication.
-   Supabase Storage only for user-owned uploads such as avatars,
    subject to configured storage policies.
-   Supabase Realtime for selected real-time functionality such as
    messaging and notification updates, if it meets tested requirements.
-   Row Level Security (RLS) for exposed tables, with explicit policies
    and least-privilege grants.
-   TMDb as a potential movie metadata provider **only after confirming
    that the intended usage is permitted by its current terms and any
    required written agreement**.

### Testing and quality

-   Vitest for unit tests.
-   React Testing Library for component behaviour.
-   Playwright for critical browser-based end-to-end flows.
-   ESLint and Prettier.
-   TypeScript checks.
-   Dependency/security audit in the release process.
-   Error monitoring and structured server logs using a suitable
    provider chosen before production.

### Deployment

-   GitHub for version control and code review.
-   Vercel or a compatible Next.js host for the web app.
-   Supabase for database and managed backend services.
-   Separate development, preview/staging, and production environment
    variables and service configurations.

## Why PostgreSQL rather than forcing MongoDB?

This product has many related entities: users, ratings, reviews,
comments, lists, follows, blocks, and messages. PostgreSQL gives strong
relational constraints, joins, transactions, and aggregation
capabilities that fit this domain well. This is a deliberate
project-specific choice, not a claim that MongoDB is inherently bad.

The owner knows the MERN ecosystem. Prefer readable TypeScript and React
patterns, and document SQL/PostgreSQL concepts when introducing them. Do
not use MongoDB merely to preserve the original MERN label.

## Backend approach

Start with Next.js server-side modules and Route Handlers/server actions
where appropriate. Keep business logic in reusable server-only modules
rather than mixing database access into UI components.

Organize code into clear domain modules, for example: - `auth` -
`movies` - `ratings` - `reviews` - `watchlist` - `history` - `lists` -
`profiles` - `social` - `messaging` - `notifications` -
`recommendations` - `moderation` - `i18n`

If a separate API is needed for the future mobile app, introduce a
versioned API boundary such as `/api/v1` and reuse the same validated
service/domain logic. Do not make the browser or mobile client directly
trusted with privileged database operations.

## Avoid unnecessary duplication

-   Do not create a separate Express server initially.
-   Do not add Redux automatically. Use server state, local component
    state, and a small client state solution only where necessary. If a
    global client store becomes genuinely useful, evaluate Zustand or
    another lightweight option.
-   Do not add a data-fetching library without a reason; select one
    based on the actual server/client data model and document the
    choice.
-   Do not add both Motion and GSAP to every animation. Each animation
    should have one clear owner.
-   Do not introduce AI/embedding infrastructure until the basic
    recommendation engine is useful and there is a permitted,
    appropriate data source.

------------------------------------------------------------------------

# PART 5 --- INFORMATION ARCHITECTURE AND ROUTES

Create a clear route map. Suggested routes:

## Public routes

-   `/` --- homepage and discovery.
-   `/search` --- global movie/person search.
-   `/movie/[slug]` — movie detail; resolve the slug to a stable internal title ID/provider mapping and redirect legacy ID URLs to the canonical slug when possible.
-   `/tv/[slug]` — TV-series detail; resolve the slug to a stable internal title ID/provider mapping and redirect legacy ID URLs to the canonical slug when possible.
-   `/person/[slug]` — actor/director/crew profile; resolve to a stable person/provider ID and canonicalize the URL.
-   `/genre/[slug]` --- genre discovery.
-   `/discover` --- advanced filters and discovery.
-   `/upcoming` --- upcoming theatrical, streaming and TV releases, scoped by region and content type where reliable data exists.
-   `/news` and `/news/[slug]` --- original editorial/news coverage with bylines, publication/update dates and source links.
-   `/forums` and `/forums/[topicSlug]` --- community discussion boards, introduced only after the Part 23 public-UGC safety gate passes.
-   `/tv/[slug]/season/[seasonNumber]` --- optional season/episode view introduced with the approved episode-tracking milestone; do not expose a non-functional route before then.
-   `/collections` --- editorial collections.
-   `/collections/[slug]` --- collection details.
-   `/user/[username]` --- public user profile.
-   `/list/[id-or-slug]` --- public list.
-   `/login`
-   `/signup`
-   `/forgot-password`
-   `/privacy`
-   `/terms`
-   `/community-guidelines`
-   `/accessibility`

## Authenticated routes

-   `/onboarding` --- taste setup.
-   `/me` --- user dashboard.
-   `/me/diary` --- viewing history.
-   `/me/watchlist`
-   `/me/ratings`
-   `/me/reviews`
-   `/me/lists`
-   `/me/preferences`
-   `/me/calendar` --- personal upcoming releases and reminder controls, when implemented.
-   `/me/wrapped/[year]` --- the owner-visible annual viewing summary; public/shareable access is opt-in and privacy-reviewed.
-   `/me/settings`
-   `/notifications`
-   `/messages`
-   `/messages/[conversationId]`

## Moderation/admin routes

Use a distinct, protected administration area and server-side authorization. Do not rely on hiding navigation items as access control.

- `/admin` — role-appropriate overview and queue summaries.
- `/admin/reports` — report queue, filters, assignment, review and resolution.
- `/admin/content` — review, hide, restore or remove reported content within permission limits.
- `/admin/users` — user lookup, status, history and permitted account actions.
- `/admin/users/[userId]` — moderation history and status detail; expose only data needed for the task.
- `/admin/appeals` — user appeals for eligible restrictions.
- `/admin/actions` — searchable, permission-filtered moderation/audit history.
- `/admin/settings` — only for settings the signed-in administrator is explicitly authorized to manage.
- `/admin/roles` — superadmin-only role assignment and revocation, with strong safeguards.

Keep public profiles and the private administration view separate. Never expose internal notes, report identities, private messages, security events, or sensitive account fields to ordinary users. A navigation link is not a security boundary; every page load, server action, Route Handler, query, and mutation must independently authorize the actor.

Use stable IDs internally and human-friendly slugs where useful. Route
handlers must validate input and authorization. Avoid leaking private
profile or conversation data through public routes, search indexes,
metadata, or API responses.

------------------------------------------------------------------------


# UX ADDENDUM — PRODUCT EXPERIENCE IS A FIRST-CLASS REQUIREMENT

Treat UX as a core engineering requirement, not as visual polish added at the end. A beautiful interface that confuses people, hides controls, delays tasks, or behaves inconsistently is not acceptable.

## UX decision rules
- Do not make branding decisions, including the final product name, logo, brand voice, or final accent colour, without asking the product owner or clearly marking the choice as a reversible proposal.
- Before implementing a major page, state its user goal, primary action, secondary actions, and the main success/failure states.
- Prefer familiar patterns over novelty when novelty makes a task harder.
- Keep navigation labels clear. Avoid icons without accessible labels or tooltips where their meaning is not obvious.
- Keep important actions discoverable without relying on hover. Mobile users must have access to the same essential functionality.
- Do not add a feature merely because it is technically possible. Explain the user problem it solves.
- Do not make users sign up just to browse, search, or inspect a movie page.
- Do not interrupt the user with unnecessary modals, popups, animations, or onboarding questions.
- Save user work where appropriate and warn before destructive actions.
- Always provide feedback after an action: success, failure, loading, retry, and undo where sensible.
- Do not use motion to hide loading delays or block interaction.
- Design empty states to explain what the user can do next.
- Prefer progressive disclosure: show essential information first and advanced controls when needed.
- Keep terminology consistent across navigation, buttons, settings, notifications, and documentation.

## Core user journeys to design and test
1. **First-time visitor:** land on homepage → understand what the product does → browse collections → search for a title → open movie details without creating an account.
2. **New account:** sign up → choose language/theme where appropriate → optionally select familiar movies and genres → skip any step → arrive at useful recommendations.
3. **Rate a movie:** open a movie → understand the difference between provider score and community score → select 0–10 score → save → see confirmation and updated personal state.
4. **Track a movie:** add to watchlist → later mark watched → optionally record viewing date/rating/review without forcing all of these actions together.
5. **Write a review:** understand spoiler controls and visibility → write/edit → publish → see it on the correct page → delete or report content when applicable.
6. **Follow a person:** open profile → inspect public activity → follow/unfollow → understand whether the action succeeded and how privacy settings affect visibility.
7. **Send a message:** understand who can message whom → send a message → see sending/error state → block/report when needed.
8. **Recover from failure:** network/API error → preserve the user’s input when possible → explain what happened in plain language → offer a useful retry or alternate action.
9. **Change preferences:** update language/theme/privacy/recommendation preferences → see changes take effect → retain the setting across sessions as intended.
10. **Mobile browsing:** navigate and scroll with one hand where practical; use touch-friendly controls, native scrolling, stable layouts, and no hover-only actions.
11. **TV progress:** open a series → inspect seasons/episodes → mark an episode watched or unwatched → see progress and the next unwatched episode → undo or correct mistakes without corrupting rewatch history.
12. **Strict spoiler-free browsing:** enable the global mode → browse an unwatched title → see protected reviews, guest-cast/cameo details and spoiler-tagged media stay concealed until an intentional reveal. Explain that protection depends on verified tagging and cannot guarantee every spoiler is detected.
13. **Release reminders/calendar:** opt in to a release reminder → verify title, territory and release date → choose reminder timing/channel → receive no duplicate reminders when a date changes or the reminder is rescheduled.
14. **Share Wrapped:** preview the exact data and audience → exclude private activity by default → explicitly enable sharing or download an image → revoke public sharing if enabled.
15. **Editorial/forum participation:** read cited news without sign-in where public; create a forum post only after seeing the spoiler, privacy and community rules; report/block content and receive meaningful status feedback.

## Navigation and page hierarchy
- Define primary navigation separately for desktop and mobile, based on actual user tasks.
- Keep search prominent and easy to reach.
- Do not put every feature in the top-level navigation. Group personal features under the user profile/library area and secondary utilities under clear menus.
- On mobile, consider a compact bottom navigation only if usability testing shows it helps the main tasks; do not automatically copy native-app patterns onto every viewport.
- Keep browser back/forward behaviour working.
- Preserve search/filter state in URLs where it improves sharing and return navigation.
- Make page titles, breadcrumbs, active navigation, and selected filters understandable.
- Avoid endless horizontal carousels as the only way to discover content; provide accessible alternatives and clear section links.

## Movie page information hierarchy
Prioritize:
1. Title, poster/backdrop, year and essential metadata.
2. Clearly separated community rating and external/provider score.
3. Primary actions: rate, watchlist, watched.
4. Synopsis and key credits.
5. Trailer/media when legitimately available.
6. Reviews and discussion.
7. Similar titles and further discovery.

Do not force users to scroll past a giant hero animation to reach the rating or synopsis. On small screens, keep primary actions reachable without covering content.

## Onboarding UX details
- Show a short explanation of why preferences help.
- Make the process skippable at every reasonable stage.
- Use explicit, mutually understandable actions: “Loved it”, “Seen it”, “Not for me”, “Haven’t seen it”, and “Skip”.
- Do not treat “Seen it” as “Liked it” or infer a numeric score.
- Clearly distinguish selected, unselected, and already-seen states.
- Provide search, undo, back, progress, and “finish later” behaviour.
- Avoid requiring users to select a large number of titles before they can continue.
- Explain that preferences can be changed later.
- Do not show a fake personalised explanation unless the underlying preference data supports it.

## Ratings and trust UX
- Label all scores by source.
- Make the score range and increments clear before submission.
- Provide an accessible keyboard-operable control; do not make a slider the only rating method if it is difficult to use precisely.
- Confirm when a rating is saved and make updating/removing it straightforward.
- Display rating count and distribution where available.
- Never present missing data as a zero score.
- Explain community averages honestly and avoid claims that ratings are “genuine” unless the product has evidence and clear anti-abuse measures.

## Forms, feedback, and errors
- Label fields persistently; do not rely only on placeholders.
- Validate close to the relevant field and summarize errors accessibly.
- Preserve form content after recoverable errors.
- Disable repeated submission only while needed and prevent duplicate writes server-side.
- Use confirmation for destructive actions such as account deletion; do not use confirmation for every harmless action.
- Provide undo for reversible actions where practical, such as removing a saved item.
- Make toast notifications non-essential: critical information must also be available in the page or accessible status region.

## UX acceptance criteria
A feature is not UX-complete until:
- A first-time user can identify the main action without explanation.
- The primary journey works with keyboard and touch.
- Essential controls do not depend on hover.
- Loading, empty, error, success, disabled, and retry states are designed.
- Text is readable in both themes and all supported languages.
- Layouts survive long titles, missing posters, slow networks, and small screens.
- Motion does not block reading or task completion.
- The feature has been checked at narrow mobile, tablet, and desktop widths.
- At least the critical flow has an automated test and a manual usability review.
- Known usability issues are documented rather than silently ignored.

## Usability review before each phase is accepted
Ask:
- Can a new user tell where they are and what they can do next?
- Can the user complete the task with the fewest reasonable steps?
- Are the labels clear without product-specific knowledge?
- Is the current state visible after an action?
- Can the user recover from mistakes?
- Does the page still work without animations, with keyboard-only input, and on a slow connection?
- Is the visual effect helping comprehension, or is it only decoration?
- What evidence supports calling this experience “better”? Prefer task completion and observed testing over subjective claims.



## Specification review notes and high-priority guardrails

This master prompt is intentionally broad. The implementation agent must reconcile these requirements through staged delivery rather than trying to satisfy every requirement in the first code pass.

1. **Brand status:** Movicin is the current working name only. No domain, trademark, social handle, app-store, or company-name availability is implied.
2. **Reference status:** Cinejoy is the primary inspiration reference; Moctale is fallback-only when Cinejoy is inaccessible. It is not a source of permission to copy its layout, assets, copy, or brand.
3. **Movie data licensing is a launch blocker:** do not assume TMDb access automatically permits the planned use, commercial use, storage/caching, attribution, or AI processing. Verify current official terms and permissions before building a public launch around it. Keep the provider adapter replaceable.
4. **Stack choice is deliberate:** this specification recommends Next.js + TypeScript + Supabase/PostgreSQL rather than a traditional MERN/Express/MongoDB stack. Explain this choice to the owner in plain language and do not silently mix stacks. If repository constraints make it unsuitable, propose a clear alternative before switching.
5. **MVP before social complexity:** ratings, watchlist/history, and reviews must work reliably before messaging and broad social features. Do not ship a public DM feature without proven authorization, block/report controls, and abuse prevention.
6. **No fictional metrics or personalization:** never invent movie scores, catalogue facts, “because you liked…” explanations, or user activity to make the interface look populated. Use clearly labeled development seed data only in development.
7. **UX and animation:** polished motion is not the goal by itself. Core actions must be quick, keyboard/touch accessible, readable in both themes, and usable with reduced motion and slow networks.
8. **Translations:** architecture should support localization, but do not claim a language is supported until the key user flows, error states, accessibility labels, and layouts have actually been translated and tested.
9. **Legal/privacy readiness:** templates for privacy, terms, moderation, and deletion are not a substitute for jurisdiction-specific review. Do not claim legal compliance without evidence.
10. **Truthful reporting:** every phase report must distinguish implemented, tested, partially implemented, blocked, and not started. Never claim that a build, test, deployment, API access, or security review succeeded unless it was actually verified.

# PART 6 --- DESIGN SYSTEM AND VISUAL DIRECTION

## Overall visual identity

Build an original **cinematic, premium, liquid-glass-inspired interface**. Use Cinejoy as the primary visual reference; use Moctale only as the documented fallback if Cinejoy is genuinely inaccessible. Use either site only to study general UX principles, not to copy its identity or distinctive composition.

The design should combine: - Cinematic poster/backdrop artwork. - Clear
typography and generous spacing. - Layered surfaces and restrained
translucent glass. - Soft lighting, subtle gradients, fine borders, and
carefully controlled depth. - Strong readability in both dark and light
themes. - Purposeful motion and immediate interaction feedback. - A
visual hierarchy that makes movie artwork prominent without making the
interface difficult to use.

Do not make every component transparent. Excessive glass, blur,
reflections, glowing borders, and gradients will reduce contrast and
look gimmicky. Use glass selectively for floating navigation, search
overlays, popovers, filter sheets, and selected controls. Use stable
opaque surfaces behind long-form text and data-heavy areas.

## Themes

### Dark theme

-   Deep charcoal, ink, or midnight backgrounds.
-   High-contrast text.
-   Restrained accent colour, used consistently.
-   Movie artwork supplies much of the visual colour.
-   Glass panels should remain legible over changing backgrounds.

### Light theme

-   Pearl/off-white base.
-   Neutral surface layers and subtle borders.
-   Clear text contrast and restrained shadows.
-   Dedicated light-mode surface and accent tokens; do not merely invert
    dark mode.
-   Translucency must not reduce text readability.

### Theme behaviour

-   Provide Light, Dark, and System options.
-   Persist user preference.
-   Avoid theme flashing during initial render.
-   Use semantic design tokens instead of scattered hard-coded colours.
-   Test all important components in both themes.

## Typography and layout

-   Use a modern, readable font stack with a suitable fallback for all
    supported scripts.
-   Establish a consistent type scale, line heights, and weights.
-   Avoid tiny text, especially over images.
-   Use responsive max-widths and spacing tokens.
-   Keep navigation predictable across breakpoints.
-   Respect safe-area insets on mobile devices.
-   Avoid horizontal overflow.
-   Make tap targets comfortably usable on touch screens.

## Movie cards

A movie card may show: - Poster. - Title and release year. - Our
community rating, if enough data exists. - Third-party rating only with
clear attribution. - Small, optional genre or runtime metadata. -
Watchlist control. - Hover actions on desktop and accessible actions on
mobile.

Requirements: - Preserve poster aspect ratio and use appropriate image
sizes. - Do not show hover-only functionality as the only way to act. -
Avoid layout shift while images load. - Provide fallback artwork for
missing images. - Use lazy loading below the fold and sensible
prioritization for the hero. - Do not overdecorate every poster with
badges. - Do not automatically equate popularity with quality.

## Shared components

Create reusable components for: - Site header and responsive
navigation. - Search command/dialog. - Theme switcher. - Movie poster
card. - Horizontal content rail. - Editorial collection card. - Rating
control and rating distribution. - Watchlist button. - Watched toggle. -
Review card and comment thread. - User avatar/profile header. - Follow
button. - List card and list editor. - Recommendation reason label. -
Dialog, popover, tooltip, dropdown, toast, tabs, pagination/load-more. -
Skeleton, empty state, error state, and retry UI. - Language selector. -
Notification item. - Message composer and conversation list. -
Consent/attribution footer where required by providers.

Do not build one enormous component. Keep components focused and typed.

------------------------------------------------------------------------

# PART 7 --- ANIMATION AND INTERACTION SPECIFICATION

## Core animation libraries

-   Motion for React: default choice for React component transitions,
    gestures, layout transitions, and modest scroll reveals.
-   GSAP: use selectively for multi-step hero timelines, carefully
    designed cinematic sequences, or complex coordinated effects.
-   CSS and native browser APIs: simple hover, focus, colour, opacity,
    and lightweight transforms.

Do not let Motion and GSAP animate the same element at the same time.
Avoid multiple smooth-scroll libraries or global event listeners without
cleanup.

## Motion principles

1.  Every animation should communicate state, hierarchy, or spatial
    continuity.
2.  Prioritize responsiveness over spectacle.
3.  Prefer opacity and transform animations where practical.
4.  Avoid expensive blur, giant box-shadow animations, and
    layout-triggering animation loops.
5.  Keep ordinary UI transitions short and coherent; use longer
    sequences only for deliberate cinematic moments.
6.  Never delay core navigation or make users wait for decorative
    sequences.
7.  Respect `prefers-reduced-motion`.
8.  Disable or simplify cursor-following, parallax, and large motion on
    touch devices.
9.  Ensure keyboard focus remains visible during transitions.
10. Clean up timelines, listeners, observers, and animation resources on
    unmount.

## Interaction details

-   Header may become subtly more opaque while scrolling.
-   Hero elements can reveal in a restrained sequence.
-   Movie cards may lift slightly and reveal useful actions on pointer
    devices.
-   Buttons should have clear hover, focus, active, loading, disabled,
    and success states.
-   Dialogs and drawers should enter/exit without trapping users
    incorrectly.
-   Search should open quickly, autofocus appropriately, support
    keyboard navigation, and announce results accessibly.
-   Rating changes should give immediate visual feedback and save
    reliably.
-   Watchlist changes should show success/error feedback and recover
    from failures.
-   Route transitions must not cause excessive waiting or disorient
    users.
-   Use shared-element transitions only where stable identity and
    technical support make them reliable.
-   Preserve native touch scrolling. Do not force scroll-jacking.

## Rendering and data processing must not wait for decoration

- Never delay search results, route transitions, form feedback, ratings, episode-progress updates or release-reminder confirmation to finish a decorative animation. Start data work independently; animate only the presentation of states when doing so is beneficial.
- Use server rendering/streaming, Suspense boundaries, client components and async work according to measured needs and current framework guidance; do not describe Node.js and React as being “perfectly in sync” or rely on that as an architecture guarantee.
- Avoid large synchronous computations on the Node.js event loop or inside React render. Paginate/virtualize long lists when measurements justify it; defer non-critical work and use workers only when a demonstrated task warrants them.
- Keep long editorial text readable with normal page scrolling. Add nested scroll containers only for a clear interaction need; give them bounded dimensions, keyboard access and visible scroll affordances, and avoid scroll traps.
- Loading/skeleton states must not fake fresh data, shift layout excessively or hide a genuinely stalled request. Use timeouts, cancellation and retry states as appropriate.

## Cursor effects

Optional desktop-only cursor-reactive lighting or subtle magnetic
effects may be tested on a few decorative elements. They must: - Never
obscure content or interfere with text selection. - Be disabled on touch
devices and for reduced-motion users. - Avoid continuous state updates
across the whole React tree. - Never be required to access a control. -
Be tested on lower-powered devices. - Be removed if performance or
usability does not improve.

## Smoothness and performance budget

Set measurable performance goals rather than promising impossible
"iPhone-level" performance on every device: - Target good Core Web
Vitals, especially LCP, INP, and CLS. - Keep first load lean and split
optional features. - Avoid loading GSAP on pages that do not need it. -
Avoid large animated videos as default backgrounds. - Optimize and
appropriately size images. - Measure on mobile throttling and real
mid-range devices. - Provide useful loading states without making the
interface feel artificially slow. - Ensure interactions remain usable on
slow networks.

------------------------------------------------------------------------

# PART 8 --- MOVIE DATA PROVIDER AND TMDb COMPLIANCE

TMDb is a potential metadata provider, not an assumed unrestricted
source. Before implementation and especially before public/commercial
launch: 1. Read the current official TMDb API terms, attribution
requirements, logo/branding rules, rate limits, image usage rules,
caching restrictions, and commercial-use conditions. 2. Confirm whether
the intended product and use case require a written agreement or
separate permission. 3. Confirm whether any proposed AI use involving
TMDb data is permitted. Do not send TMDb metadata to an LLM or use it to
train/evaluate an AI model unless the relevant terms expressly permit
the use. 4. If permission is unclear, isolate the provider behind an
adapter and use only a provider/data source whose license permits the
intended use. Do not quietly assume permission. 5. Keep the provider's
attribution and required disclaimer visible where applicable. 6. Do not
scrape movie websites to bypass API restrictions. 7. Never claim that a
third-party score is our own community rating.

## Provider adapter

Create a server-only provider abstraction with typed, normalized methods appropriate to the permitted provider. At minimum, cover:
- `searchMovies(query, filters)` and `searchTV(query, filters)`.
- `getMovieDetails(providerTitleId)` and `getTVDetails(providerTitleId)`.
- `getTrendingMovies(window)` / `getTrendingTV(window)` and `getPopularMovies(page)` / `getPopularTV(page)` where supported.
- `getMovieCredits(providerTitleId)` and `getTVCredits(providerTitleId)`.
- `getSimilarMovies(providerTitleId)` and `getSimilarTV(providerTitleId)` where supported.
- `getGenres(contentType)` where the provider distinguishes movie and TV genres.
- `getPersonDetails(providerPersonId)` and `getPersonFilmography(providerPersonId)` including movie and TV credits where supported.
- Optional provider methods must be capability-detected; never fake support when the selected provider lacks it.

Use typed normalized domain models. Keep provider-specific response shapes inside the adapter. Validate responses and handle missing fields, rate limits, timeouts and provider outages.

## Data and caching

-   Store provider ID and provider name for each external movie/person.
-   Cache only what the provider terms permit.
-   Track when cached data was fetched and when it should be refreshed.
-   Do not copy the full provider catalogue into our database.
-   Keep user-generated ratings, reviews, lists, and history independent
    of provider availability.
-   Use a stable internal movie record or mapping so changing providers
    does not destroy user data.
-   Handle deleted, merged, or unavailable provider records gracefully.
-   Do not hard-code poster URL assumptions throughout the codebase.

### Provider outage and cache-fallback behaviour

- Implement a server-side cache for provider-derived public metadata, with a **stale-while-revalidate** strategy where provider terms and the chosen cache technology permit it.
- Cache curated/featured homepage payloads separately so a provider outage does not blank the homepage. When fresh data cannot be fetched, serve the last known-good cached homepage content with a clear freshness policy; never present stale data as newly fetched.
- Set explicit TTLs, stale windows, invalidation rules and cache keys by provider, locale, title/person ID and relevant filters. The exact TTL must respect the provider's current licence/terms; do not cache fields or images where caching is prohibited.
- On a provider outage, timeout, rate limit or malformed response, use bounded retries, timeouts and circuit-breaker/backoff behaviour. Do not create retry storms.
- Search and uncached movie/TV/person detail requests should show a clear, accessible **“Service temporarily unavailable. Please try again.”** state with retry. Do not show a false “not found” state for a provider outage.
- Provider outages must never hide, overwrite or disable Movicin-owned user data: community ratings, reviews, watchlists, diary/history, lists, comments or profile content should remain available when their own services are healthy. Render provider metadata and Movicin user-generated content as separate independently-failing sections.
- Use an alternate provider only when its coverage, attribution, licence and terms have been verified. Never silently scrape a website or bypass provider restrictions as a fallback.
- Add automated tests for cold cache + provider outage, stale cache served during revalidation, cache expiry, rate limiting, provider recovery and preservation of user-generated content.

## Ratings shown on movie pages

Keep separate: - Our community average. - Our number of ratings. -
Rating distribution. - External provider score and its source. -
Popularity/trending signals.

If our app has no ratings, show "Not rated yet," not `0.0`. A legitimate
user score of zero is allowed and must not be confused with missing
data.

------------------------------------------------------------------------

# PART 9 --- MULTILINGUAL / INTERNATIONALIZATION PLAN

Internationalization should be built into the foundation now because
retrofitting every string, date, plural, and layout later is expensive.
However, translating every page into every language on day one is not
required.

## Initial language strategy

-   English (`en`) --- primary launch language.
-   Hindi (`hi`) --- first additional launch language if translations
    and fonts are ready.
-   Architect the app so these can be added later without changing the
    domain model:
    -   French (`fr`)
    -   Spanish (`es`)
    -   Bengali (`bn`)
    -   Chinese (`zh`, with explicit locale choice such as Simplified
        Chinese `zh-Hans` and Traditional Chinese `zh-Hant` if
        supported)
    -   Japanese (`ja`)
    -   Portuguese (`pt`, with locale variants where appropriate)
    -   Arabic (`ar`) with right-to-left layout support
    -   Indonesian (`id`)
    -   Urdu (`ur`) with right-to-left layout support
    -   German (`de`)
    -   Korean (`ko`)
    -   Tamil (`ta`)
    -   Telugu (`te`)
    -   Marathi (`mr`)
    -   Other languages based on actual audience and translation
        readiness.

Do not advertise a language as fully supported until its interface
strings, important error messages, onboarding, account screens,
accessibility labels, and core flows have been translated and tested.

## Technical requirements

-   Use a mature Next.js-compatible internationalization approach;
    evaluate current stable options such as `next-intl` and verify
    official docs before selecting.
-   Never hard-code user-facing UI text directly into components.
-   Use translation keys with sensible namespaces.
-   Support pluralization, interpolation, locale-aware number/date
    formatting, and timezones.
-   Choose a route strategy, such as `/en/...` and `/hi/...`, and
    document default-locale behaviour.
-   Persist the user's language preference in their profile, while
    respecting first-visit browser preference when sensible.
-   Provide a language selector that clearly names languages in their
    own scripts, e.g. English, हिन्दी, Français, বাংলা, Español, 中文,
    日本語.
-   Avoid flags as the sole language identifiers; languages do not map
    one-to-one to countries.
-   Ensure the font stack supports Devanagari, Bengali, Latin, CJK,
    Arabic, and other scripts as languages are introduced. Load
    script-specific fonts efficiently.
-   Test line wrapping, long labels, poster layouts, forms, dialogs,
    navigation, and mobile widths in each supported locale.
-   Use logical CSS properties such as `margin-inline-start` rather than
    assuming left-to-right text.
-   Prepare RTL support for Arabic and Urdu, even if it is not in the
    first launch.
-   Keep movie titles, original titles, localized titles, and UI
    translations conceptually separate.
-   Prefer provider-supplied localized metadata when licensed and
    available; do not assume a translated title is the original title.
-   Community-written reviews must not be silently machine-translated.
    Offer an optional "Translate" action only after selecting a suitable
    translation service and addressing privacy, cost, and user consent.
-   Do not send private messages, private profile information, or
    private user content to translation/AI providers without a clear
    disclosed feature and appropriate consent.

------------------------------------------------------------------------

# PART 10 --- AUTHENTICATION, ACCOUNTS, AND ONBOARDING

## Authentication

Implement: - Sign up with email/password or a supported secure
provider. - Login/logout. - Email verification where configured. -
Forgot/reset password. - Session refresh and expiry handling. -
Protected server-side actions/routes. - Account settings and account
deletion. - Clear authentication error messages that do not expose
whether sensitive account details exist. - Rate limits and abuse
protections on auth-related endpoints.

Do not invent custom password storage if using a managed auth provider.
Never store raw passwords. If social sign-in is added, verify redirect
URLs and callback handling.

## Onboarding experience

After account creation, show a skippable multi-step flow:

### Step A --- Pick familiar/favourite movies

-   Start with a curated selection of well-known movies across genres,
    languages, eras, and regions.
-   Avoid a selection consisting only of Hollywood/English-language
    films.
-   Allow search if a user cannot find a title.
-   Clearly distinguish:
    -   Loved it / favourite.
    -   Seen it.
    -   Not for me.
    -   Haven't seen it.
    -   Skip for now.
-   Do not infer that "seen it" means "liked it."
-   Do not assign a numeric rating without user consent.
-   Allow users to undo selections.
-   Store explicit onboarding responses as user preferences and/or
    history with clear semantics.

### Step B --- Genres and languages

Allow multi-select for genres and preferred film languages, plus
optional release-era, runtime, and content preferences. Do not require
every question.

### Step C --- Initial recommendations

Show a useful first recommendation set with short reasons such as
"Because you liked \[genre/title\]" only when that reason is actually
supported by user input/data.

### Step D --- Finish or skip

Always provide skip and back actions. Users can complete or edit
preferences later. Do not block the entire app behind onboarding.

## User profile

Support: - Unique username with validation. - Display name. - Avatar. -
Optional bio. - Preferred interface language. - Preferred content
languages. - Favourite genres. - Public/private profile setting where
supported. - Follow/follower counts. - Public ratings/reviews/lists
according to visibility settings. - Account settings, block list, data
export/deletion request.

Do not expose email addresses or sensitive account fields on public
profiles.

------------------------------------------------------------------------

# PART 11 --- RATINGS, WATCHLIST, AND DIARY

## Rating model

-   Score range: **0 through 10 inclusive**.
-   Decide and document whether decimals are supported. Recommended
    initial increment: `0.5`.
-   A user has at most one active rating per canonical title (movie or TV
    series); updating a rating replaces the previous active value.
-   Use `title_id` referencing the canonical `titles` table and enforce
    uniqueness at database level for `(user_id, title_id)`. Do not use a
    parallel `movie_id` reference in this shared movie/TV activity model.
-   Validate score on the server and database.
-   Support rating removal.
-   Show the current user's score separately from the community
    aggregate.
-   Calculate community average and rating count accurately.
-   Do not treat absent ratings as zero.
-   Prevent duplicate submissions and handle concurrent updates.
-   Use transactions or safe aggregate strategies where appropriate.
-   Document whether deleted accounts' ratings are deleted, anonymized,
    or retained under the published policy.

## Watch status and history

Do not collapse these into a single mutually exclusive status. A user
can have watched a movie, rated it, saved it for rewatch, and recorded
multiple viewing events.

Implement: - Add/remove from watchlist. - Mark watched/unwatched without
requiring a rating. - Optional viewing date. - Rewatch history. -
Optional diary note attached to a viewing event. - Filters and sort
order for diary and watchlist. - Duplicate protection. - Clear states
when a movie has been removed from a provider or is unavailable.

## Personal statistics

Build reliable statistics such as: - Total unique movies watched. -
Total viewing events. - Ratings given. - Average personal rating. -
Most-watched genres. - Favourite directors/actors when metadata is
available and permitted. - Highest- and lowest-rated titles. - Activity
by month/year. - Optional year-end "Wrapped" summary.

Define every statistic clearly. Do not inflate watched counts by
counting duplicate records accidentally.

------------------------------------------------------------------------

# PART 12 --- REVIEWS, COMMENTS, AND COMMUNITY

## Reviews

-   A user may write a review independently of a numeric rating, unless
    a later product decision requires otherwise.
-   Allow edit/delete of one's own reviews.
-   Optional title, body, spoiler flag, and creation/update timestamps.
-   Set sensible text length limits.
-   Show spoiler warnings and keep spoiler text collapsed until the
    reader chooses to reveal it.
-   Sort by recent, helpful, and possibly relevant.
-   Do not allow raw HTML injection.
-   Render user content safely and validate on the server.

## Comments

-   Movie-level discussions and review-level comments/replies.
-   Limit nesting depth to keep threads usable.
-   Paginate or load comments progressively.
-   Add edit/delete controls for the owner, subject to moderation
    policy.
-   Prevent duplicate reaction actions.
-   Rate-limit posting and edits.
-   Use clear empty, loading, and error states.

## Social graph

-   Follow/unfollow.
-   Follower/following lists with pagination.
-   Private profiles where supported.
-   Follow request acceptance if private-account semantics are enabled.
-   Block and unblock.
-   Mute or hide users where useful.
-   Prevent blocked users from interacting in prohibited ways.
-   Do not rely on client-only checks.

## Activity feed

Show meaningful activity such as: - New public rating or review. - Added
public list. - Watched milestone, if user has enabled sharing. - New
public collection.

Respect privacy and user settings. Do not reveal activity from private
profiles or private lists. Provide feed filters and pagination.

- Spoiler-marked content must remain hidden behind an explicit reveal action in feeds and previews; apply Part 30.4's cross-surface spoiler rules before truncating or generating metadata.

## Reactions

-   Helpful/like reactions for reviews and comments.
-   Unique constraint per user/content/reaction type.
-   Toggle safely and update counts reliably.
-   Do not treat likes as proof that a review is truthful.

## Moderation

- Report reviews, comments, profiles, lists, messages and other supported user-generated content.
- Block/unblock users at the user level, with clear consequences for follows, messages, comments and search visibility.
- Admin review queue with status, severity, reason, assignment, timestamps and resolution.
- Moderation action log and appeal process for eligible actions.
- Rate limits, spam detection and configurable content rules.
- Provide community guidelines and clear user feedback.
- **Close the report feedback loop:** reporters can see a private status such as Received / In review / Resolved. When a report is resolved, send a privacy-safe in-app notification when appropriate. Use truthful wording such as “Thanks for reporting this. We reviewed your report.” Add “and took action” only when action was actually taken. Never reveal confidential evidence, internal notes, another reporter's identity, or private account details. Respect notification preferences and omit sensitive details from push/email previews.
- Avoid automated permanent bans based solely on an unreviewed model output.
- Do not create an unmoderated public direct-message system.
- Separate user-level blocking (a personal safety control) from platform-level suspension or banning (an enforcement action).
- Apply consistent action reason codes, duration, scope, evidence references and policy references; do not expose reporter identity or private internal notes to the reported user.
- Allow proportionate actions: warning, content label/hide/remove, temporary feature restriction, temporary account suspension, and permanent ban, according to role permissions and policy.
- Keep an appeal route for eligible enforcement actions; appeals must be reviewed by someone other than the original decision-maker when staffing permits.
- Avoid deleting evidence automatically when content is hidden or an account is suspended; define lawful, proportionate retention and access restrictions.
- Provide emergency escalation for credible threats or severe safety issues, without granting every moderator unrestricted account powers.

------------------------------------------------------------------------

# PART 13 --- DIRECT MESSAGING

Messaging is in scope but should be implemented after core movie
discovery, accounts, ratings, and social permissions work correctly.

## Initial messaging scope

-   One-to-one text conversations.
-   Conversation list and unread counts.
-   Message history with pagination.
-   Sent timestamp and appropriate delivery/read state if implemented
    reliably.
-   Real-time updates using Supabase Realtime or another justified
    solution.
-   Share a movie link/card in a conversation.
-   Message requests or configurable privacy controls.
-   Block/report controls.
-   Mute conversation.
-   Delete/hide conversation for the current user without accidentally
    deleting the other user's history.
-   Loading, retry, offline, and send-failure states.
-   Safe handling of rapid duplicate sends.
-   Clear retention/deletion semantics.

## Security

-   Only conversation participants can read or send messages.
-   Enforce this in database policies and server logic, not just UI.
-   Users who are blocked must not bypass the block through another
    endpoint.
-   Validate message length and content type.
-   Rate-limit sends and message requests.
-   Do not expose private conversation content in public APIs, search,
    analytics, logs, or AI prompts.
-   Never send private messages to an AI provider by default.
-   Make notification previews respect user privacy settings.
-   Test RLS using multiple separate user accounts.

Do not add voice/video calls, file attachments, or end-to-end encryption
claims unless they are explicitly designed and implemented correctly.
Never claim end-to-end encryption unless the architecture genuinely
provides it.

------------------------------------------------------------------------

# PART 14 --- RECOMMENDATION ENGINE

Start with a transparent rules-based system; do not begin with a costly
or opaque AI model.

## Inputs

-   Onboarding selections.
-   User ratings.
-   Watched history.
-   Watchlist.
-   Genre preferences.
-   Preferred languages.
-   Release era and runtime preferences if supplied.
-   Explicit "not interested" feedback.
-   Similarity metadata available through an authorized provider.
-   Aggregate community scores and rating counts.
-   Popularity/trending data as one signal, not the sole ranking factor.

## Recommendation sections

-   For You.
-   Because You Liked...
-   Similar Movies.
-   Hidden Gems.
-   Highly Rated by Our Community.
-   Popular Right Now.
-   New and Upcoming.
-   By Your Favourite Genres.
-   Different From Your Usual Taste.
-   Friends and Followed Users Recommend.
-   Random Pick.
-   Continue Exploring / Watchlist reminders only when appropriate and
    consented to.

## Ranking principles

-   Exclude or label already-watched items according to user preference.
-   Avoid showing the same small set repeatedly.
-   Diversify genres, languages, years, and regions.
-   Avoid ranking based solely on external provider popularity.
- Handle cold start when no preference data exists. If onboarding is skipped or preference data is insufficient, show a visually engaging, non-blocking **Cold Start** widget such as “Rate 5 movies to unlock more personalized recommendations.” Make the target configurable, explain why ratings help, provide quick rating actions and a dismiss/skip option, and never imply personalization is already active. Public discovery and generic/editorial recommendations must remain useful before the target is reached.
- Provide a reason for a recommendation only when supported by actual
    signals.
-   Allow "not interested," "already watched," and "show fewer like
    this."
-   Let users reset or edit personalization.
-   Measure clicks, saves, ratings, and explicit feedback without
    collecting unnecessary personal data.

## Future improvements

After there is enough lawful, high-quality interaction data: - Evaluate
collaborative filtering or other ranking approaches. - Consider
embeddings only if a specific problem requires semantic similarity and
the data license permits their use. - Use offline evaluation and
controlled experiments. - Monitor diversity, popularity bias,
language/region coverage, and recommendation quality. - Provide fallback
recommendations if an AI/provider service is unavailable. - Do not allow
an LLM to fabricate movie titles, cast, availability, or scores.
Validate suggestions against the authorized movie catalogue.

------------------------------------------------------------------------

# PART 15 --- OPTIONAL IN-APP AI FEATURES

AI features are optional and should come after the core product is
useful.

Potential features: - Natural-language movie finder, e.g. "Suggest
thoughtful science-fiction movies under two hours." - Taste summary
based on a user's own permitted profile and activity. - Explanation of
recommendation signals. - Search query understanding. - Optional
translation of public reviews, after consent and privacy review.

## AI requirements

-   Call AI APIs only from a server-side module.
-   Keep API keys in server-only environment variables.
-   Apply request limits and per-user usage controls.
-   Set a configurable budget cap and graceful fallback.
-   Do not send private messages or private user data to AI providers by
    default.
-   Minimize and document data shared with providers.
-   Obtain user consent where appropriate.
-   Validate AI-suggested titles against the authorized catalogue.
-   Do not let an AI response directly execute database writes without
    normal validation and authorization.
-   Log operational metadata without logging sensitive prompts
    unnecessarily.
-   Make AI features optional and explain their limitations.
-   Confirm licensing before using third-party movie metadata in AI
    prompts, model training, embeddings, or evaluation.

------------------------------------------------------------------------


# PART 15A — ROLES, ACCOUNT STATUS, AND ADMINISTRATION

This is a cross-cutting platform capability, not an optional dashboard decoration. Implement it with server-side authorization, database constraints/policies, audited actions, clear UX, and automated tests.

## Role model: least privilege by default

Use explicit, server-controlled roles. A recommended starting model is:

1. **Visitor** — unauthenticated person. Can browse public movie information, search, and view public profiles/lists according to privacy rules. Cannot create personal activity or use authenticated interactions.
2. **Member** — standard registered user. Can manage their own profile, preferences, ratings, watchlist, diary, reviews, lists and permitted social interactions; can report content and manage their own blocks/privacy settings.
3. **Moderator** — handles assigned reports and permitted content actions. Can review reported content, hide/restore/remove eligible user-generated content, add internal case notes, and apply only the limited user restrictions explicitly granted by policy. Cannot grant roles, change system configuration, access unrelated private messages, or promote themselves.
4. **Admin** — manages day-to-day platform operations, user status and moderation within a documented permission matrix. Can assign/resolve cases, apply authorized suspensions/bans, view necessary audit records and manage safe operational settings. Cannot grant/revoke superadmin, change their own role, erase audit history, or bypass immutable safeguards.
5. **Superadmin** — very small, explicitly trusted set of operators with access to critical role management and high-impact platform settings. Superadmin status is never self-assignable through public signup or ordinary profile updates. Critical actions require fresh authentication and, where supported, MFA. Preserve at least one valid superadmin and provide a documented recovery procedure.
6. **System/service identity** — non-human identity for narrowly scoped background work, if needed. It is not a user role and must use separate credentials with minimal privileges.

Do not use a single client-editable `isAdmin` boolean as the source of truth. Prefer normalized role assignments and/or a secure authorization service. If a permission-based model is adopted, document role-to-permission mappings and enforce them centrally. Roles should not be inferred from username, email domain, profile fields, URL, request body, or client state.

## Authorization policy

Create a central, typed permission catalogue and server-side policy helpers, for example:

- `user.read_public`
- `user.read_moderation_summary`
- `user.suspend`
- `user.ban`
- `user.restrict_features`
- `user.restore`
- `content.review_reported`
- `content.hide`
- `content.restore`
- `content.remove`
- `report.assign`
- `report.resolve`
- `appeal.review`
- `moderation_notes.read`
- `audit.read`
- `role.assign_moderator`
- `role.assign_admin`
- `role.assign_superadmin`
- `platform_settings.manage`
- `security_events.read`

The exact names may change, but the permissions must be explicit, documented and tested. UI visibility is only a convenience. Every privileged server operation and every sensitive data read must call authorization logic, and exposed database tables must have matching least-privilege RLS policies/grants. Avoid a policy where an admin can read every private message merely because they can manage users. Any exceptional access for a safety investigation must be purpose-limited, permissioned, logged and disclosed in policy.

## Role capability matrix

| Capability | Visitor | Member | Moderator | Admin | Superadmin |
|---|---|---|---|---|---|
| Browse public catalogue | Yes | Yes | Yes | Yes | Yes |
| Manage own profile/activity | No | Yes | Yes | Yes | Yes |
| Report content | No/limited | Yes | Yes | Yes | Yes |
| Block another user for personal safety | No | Yes | Yes | Yes | Yes |
| Review assigned reports | No | No | Yes | Yes | Yes |
| Hide/restore reported content | No | No | Limited | Yes | Yes |
| Suspend/ban member accounts | No | No | Only if explicitly granted and scoped | Yes | Yes |
| Review appeals | No | No | Only if assigned and not conflicted | Yes | Yes |
| View moderation audit events | No | Own action status only | Limited scope | Yes, scoped | Yes, critical scope |
| Assign/revoke moderator role | No | No | No | If explicitly allowed by policy | Yes |
| Assign/revoke admin role | No | No | No | No by default | Yes |
| Assign/revoke superadmin | No | No | No | No | Yes, with safeguards |
| Change critical security settings | No | No | No | Limited | Yes |

This matrix is the minimum proposal, not permission to give every role all listed abilities. Implement an explicit permission check for each operation and default to deny. If the project is single-operator during early development, keep the model ready but do not expose a fake or insecure role-management UI.

## Account lifecycle: status is separate from role

A role answers “what can this actor do?” An account status answers “may this account currently use the platform?” Keep these separate.

Recommended account statuses:
- `pending_verification` — registration exists but required verification is incomplete.
- `active` — account may use allowed features.
- `restricted` — account can sign in but selected capabilities are disabled, with exact restrictions recorded.
- `suspended` — temporary platform restriction with start/end time and reason code.
- `banned` — platform access blocked according to policy; only a permitted appeal, data export or support path may remain available.
- `deletion_pending` — account deletion has been requested and is within the documented cancellation/processing period.
- `deleted` or `anonymized` — deletion workflow completed according to retention policy; avoid keeping unnecessary personal data.

Use an explicit transition policy. For example, `suspended` may return to `active` when its expiry is reached only if the system can safely enforce expiry; otherwise require an explicit review. A ban must not be silently cleared by client input. Account status must be enforced in server actions, Route Handlers, database access where feasible, sessions/tokens, realtime channels, and background jobs. A disabled button alone is insufficient.

For every status change, store: target user, previous/new status, actor, timestamp, reason code, short user-visible explanation, optional internal note, duration/expiry where relevant, case/report reference where applicable, and appeal eligibility. Do not store sensitive evidence without a defined need, access policy and retention period.

## Suspension, ban, feature restriction and deactivation semantics

- **Temporary suspension:** block normal use until a specified end time or review; display when it ends if safe and known.
- **Permanent ban:** block normal platform use until a successful appeal/reversal or authorized correction.
- **Feature restriction:** disable specific actions (for example posting, commenting, messaging, or creating lists) while leaving unrelated permitted account access available.
- **User deactivation:** a user-requested reversible account state, distinct from punitive suspension/ban. Clarify what remains visible and whether reactivation is possible.
- **Deletion:** a separate data-lifecycle workflow, not a synonym for suspension or ban.
- **Personal block:** one member preventing another member from interacting with them. It must not automatically suspend the blocked person's platform account.

Use consistent terminology in UI and documentation. Never conflate “inactive”, “suspended”, “banned”, “blocked” and “deleted”.

## Admin dashboard requirements

Create an accessible, responsive admin experience with:
- Overview counts for open reports, overdue cases, active suspensions nearing expiry, pending appeals, and recent actions. Counts must come from real data and respect permissions.
- User lookup by stable ID or exact username/email only where authorized. Rate-limit searches and avoid exposing whether sensitive accounts exist to unauthorized users.
- Filters, sorting, pagination, status labels, and clear empty/error/loading states.
- User detail panel showing minimal necessary account metadata, status, assigned roles, prior moderation actions, open reports and appeal state.
- Report queue with target type, reason, severity, age, assignment, status and safe preview of the reported content.
- Case workflow: open → triaged/assigned → action taken or dismissed → closed, with reopening only by permission.
- Content action controls with preview, reason, impact, confirmation for high-impact actions and an undo/restore path when safe.
- Suspension/ban form with required reason, duration or permanent choice, policy reference, user-visible explanation, and appeal eligibility.
- Appeal queue with original action, appeal text, reviewer, outcome, explanation and timestamps; prevent the original decision-maker from being the sole reviewer where practical.
- Role management available only to explicitly authorized operators, with before/after display and fresh authentication for critical changes.
- Audit log filters for actor, target, action, time range, result and case ID.
- No bulk ban, bulk role promotion, or destructive bulk deletion by default. If a later need justifies bulk actions, require a preview, per-target validation, strong confirmation and a full audit record.
- Admin pages must not be indexed by search engines and must not leak private information in metadata, analytics or error logs.

## Safe moderation workflow

For each report:
1. Validate reporter and target; prevent self-report abuse where policy requires, duplicate spam and invalid target IDs.
2. Record the report privately; never reveal reporter identity to the target by default.
3. Apply triage/severity and assignment rules.
4. Let the reviewer inspect only the content and context needed for the decision.
5. Choose dismiss, warning, content action, feature restriction, suspension or ban within their permission.
6. Require a reason code and concise explanation for meaningful enforcement.
7. Notify the affected user in clear, non-inflammatory language, subject to safety and legal exceptions.
8. Provide appeal eligibility, deadline/route where applicable and a way to see current action status.
9. Append an audit event that cannot be edited/deleted through the ordinary admin UI.
10. Measure consistency and false-positive rates; do not optimize for ban counts.

## Appeals, reinstatement and fairness

- Allow appeals for eligible restrictions with a clear deadline or review expectation.
- Preserve the original action and its evidence reference while an appeal is pending.
- Record appeal reviewer, conflict check, decision, rationale and timestamp.
- Reversal must restore only what should be restored; do not accidentally restore removed content or invalidate unrelated moderation.
- Tell the user what changed and what remains restricted.
- Avoid exposing confidential reporter details, internal detection thresholds or private third-party information.
- Provide a support route for mistaken account-status changes and compromised accounts.
- Keep policies understandable and consistently applied.

## Admin and superadmin security safeguards

- Role assignments can only be changed through trusted server-side code or a protected administrative workflow.
- Members cannot edit their own role/status via profile updates, client requests, metadata fields or direct database calls.
- Prevent privilege escalation through manipulated IDs, mass assignment, insecure direct object references, stale sessions and role-cache bugs.
- Require recent reauthentication for critical role changes, permanent bans, destructive settings and sensitive exports.
- Enable MFA for admin/superadmin accounts where the auth provider supports it; make it a production launch requirement for privileged accounts.
- Do not let an admin promote themselves or assign a role equal to/higher than their own unless a deliberate, documented delegation model explicitly permits it. Default: deny.
- Do not allow removal/demotion of the last active superadmin through the normal UI.
- Have a secure, documented break-glass recovery procedure using provider/hosting ownership, verified operator identity, time-limited access, and audit evidence. Never hard-code a backdoor account or secret admin URL.
- Log failed privileged attempts and suspicious role/status changes, while avoiding secrets and private content in logs.
- Revoke/refresh sessions or authorization claims after role removal, ban, suspension or password/account compromise as required by the auth design.
- Audit access to moderation notes and sensitive account data, not just writes.
- Separate production and development role assignments. Seeded admin users must never be silently created in production.
- Review admin actions periodically and support emergency credential/role revocation.

## Account status UX

When an account is restricted, suspended or banned:
- Show a clear sign-in/status page with a non-sensitive reason, action date and expiry when applicable.
- Explain which features are unavailable and how to appeal or contact support.
- Do not reveal anti-abuse thresholds, confidential reports, reporter identity or internal notes.
- Avoid vague “something went wrong” copy when the actual issue is an account restriction.
- Keep logout, account-security support, and legally/contractually required data access routes available where appropriate.
- Do not let a blocked account continue using realtime subscriptions, server actions or cached privileged data.

## Required authorization tests

Test at minimum:
- Visitor cannot invoke member mutations.
- Member A cannot read/edit/delete Member B's private profile data, ratings, diary, lists or settings.
- Member cannot assign roles, change status or bypass restrictions by editing request payloads.
- Moderator cannot perform admin/superadmin-only actions.
- Admin cannot grant/revoke superadmin or erase audit history.
- No actor can remove/demote the last active superadmin through normal controls.
- Suspended/banned users cannot perform prohibited actions through API, realtime, cached sessions or background pathways.
- Feature restrictions disable only the intended capabilities.
- A user block prevents prohibited interactions in all relevant paths.
- Reporters' identities and internal notes remain private.
- Appeal review and reversal follow authorization and audit requirements.
- All privileged actions produce an audit event; ordinary users cannot modify or delete it.
- Role changes take effect promptly and stale sessions do not retain revoked privileges.
- Database RLS is tested using separate real test identities, not only mocked UI state.

# PART 16 --- DATABASE DESIGN

Create reviewed SQL migrations under a version-controlled migrations
directory. Document the final schema in `docs/DATABASE_SCHEMA.md`.

Suggested logical entities; adjust after checking exact implementation
needs.

## Identity and preferences

### `profiles`

-   `id` referencing the authenticated user ID.
-   `username` (unique, normalized).
-   `display_name`.
-   `avatar_path`.
-   `bio`.
-   `preferred_locale`.
-   `theme_preference`.
-   `profile_visibility`.
-   `created_at`, `updated_at`.

### `user_preferences`

-   `user_id`.
-   Preferred genres.
-   Preferred content languages.
-   Optional release-era/runtime preferences.
-   Personalization enabled/disabled.
-   `strict_spoiler_free_mode` and any explicitly scoped per-title/episode spoiler overrides.
-   Other explicitly chosen settings.

### `onboarding_responses`

Store explicit onboarding choices with clear semantics, or map them into
the canonical ratings/history/preferences tables where that is more
appropriate. Avoid storing duplicate contradictory states.

## Canonical title/provider data model — movies and TV

### `titles` (canonical internal title entity)

- Stable internal `id`, `content_type` constrained to `movie` or `tv`, provider name and provider title ID, canonical slug, title/original-title fields and timestamps.
- Enforce uniqueness on `(provider_name, content_type, provider_title_id)` and stable internal IDs independent of provider IDs.
- Store only metadata/cache fields the provider's current terms permit; track fetch/expiry metadata where permitted. Do not copy a full external catalogue or assume fields are always present.
- Keep movie- and TV-specific metadata in typed/validated fields or subtype tables where needed; do not overload ambiguous fields.

### `people` / `title_credits`

These are **required for the public discovery MVP**. Use stable provider person IDs and normalized credit relations linked to `titles`, including role/job/character, ordering and content type as needed. Do not embed unbounded cast arrays in each title. Missing provider fields remain unavailable rather than fabricated.

## User activity — every feature targets canonical `titles`

Use `title_id` (FK to `titles.id`) rather than `movie_id` in canonical activity tables so movies and TV series share one consistent identity model.

### `ratings`

- ID, `user_id`, `title_id`, score constrained to 0–10 and the chosen increment, and `created_at` / `updated_at`.
- Unique `(user_id, title_id)`; server and database enforce the same range/increment.

### `watchlist_items`

- `user_id`, `title_id`, `created_at`, optional category; unique `(user_id, title_id)`.

### `watch_history`

- ID, `user_id`, `title_id`, `watched_at` or user-entered viewing date with defined timezone semantics, optional diary note, and `created_at`.
- Allow multiple viewing events for rewatches. The initial core release tracks movies and TV series at title level. Episode/season tracking is a **high-priority post-core milestone** defined in Part 32 and Part 23; do not show it as available until its schema, migration, UX and tests ship.

### `reviews`

- ID, `user_id`, `title_id`, optional title, body, `contains_spoilers` boolean, optional spoiler/content-warning metadata, visibility/status, moderation status, and timestamps.
- Keep draft/private-publication semantics explicit. A review must not become public until the Phase 5 safety gate is passed.

### `lists` and `list_items` — one canonical list model

- Use one `lists` table for personal and collaborative lists, with owner, title, description, visibility, slug, list type, timestamps and a non-null `description_contains_spoilers` boolean (default false). Hide/collapse spoiler-marked descriptions in list cards, feeds, search snippets, notifications and social metadata before truncation.
- Use one `list_items` table with `title_id`, position/order, adding user where useful, and unique `(list_id, title_id)`.
- Add `list_members` (or an equivalent normalized membership relation) for collaborators and roles. Do not create a second parallel `collaborative_lists` / `collaborative_list_items` model unless a documented technical requirement proves the unified model inadequate.
- Define deletion behaviour explicitly in the schema and deletion workflow; do not leave collaborative lists orphaned. Recommended policy: before deleting/anonymizing an owner, transfer ownership only if the owner has explicitly selected/approved an eligible successor and that transfer is recorded. Otherwise delete the list and its dependent items/membership using deliberate foreign-key behaviour (for example, `ON DELETE CASCADE` for list-owned child rows), after warning the owner and respecting the published deletion/retention policy. Never automatically transfer ownership to the oldest editor without an explicit product policy, eligibility check and audit trail. Use `RESTRICT`/transactional handling where needed so a user deletion cannot silently produce inconsistent ownership. Test owner deletion with zero, one and multiple collaborators, including editor/viewer roles and pending invitations.
- Lists support both movies and TV series through `title_id`; UI filters may let owners choose one type if useful.

## Social

### `follows`

-   Follower ID and followed ID.
-   Status if private-account follow requests are supported.
-   Unique pair and no self-follow constraint.

### `comments`

- Author, validated target relationship, body, parent comment where applicable, moderation state and timestamps.
- Define `contains_spoilers` as a non-null boolean on comments (default false) and apply the same reveal/collapse behaviour as reviews wherever the comment can appear.
- Validate target and parent relationships; avoid unsafe polymorphic relationships that cannot be validated.

### `reactions`

-   User, target, reaction type, timestamps.
-   Unique key to prevent duplicates.

### `blocks`

-   Blocker and blocked user.
-   Unique pair and no self-block constraint.

### `reports`

-   Reporter, target, reason, details if needed, status, reviewer,
    timestamps.
-   Restrict access to authorized moderation roles.

### `notifications`

- Recipient, event type, actor where visible, validated related-entity reference, read state, created/delivered timestamps and idempotency key where needed.
- Do not store unnecessary private message content or spoiler text in notification rows/previews. Resolve safe display text at render time under the recipient's privacy and spoiler settings.
- For moderation reports, store a reporter-visible case/status reference without exposing staff notes, private evidence or security-sensitive details.

### `notification_preferences`

- One row per user with explicit per-event-category in-app, email and web-push preferences where those channels are implemented; defaults, opt-in timestamps, updated timestamp and unsubscribe/permission state as appropriate.
- In-app notifications are the first supported channel. Email and web push remain disabled/unavailable until their provider, consent, delivery, failure/retry and privacy behaviour are implemented and tested.
- MVP acceptance gate: only in-app notifications may be enabled by default. Do not display email or web-push controls as working features until the corresponding channel has a configured provider/transport, explicit consent and preference handling, unsubscribe/revocation paths, idempotent delivery, bounded retry/failure handling, privacy-safe payloads, observability and passing automated tests. Unsupported channels must be hidden or clearly labelled as planned.

### `push_subscriptions` (later, opt-in web push)

- Store only the subscription endpoint and encrypted/protected key material required by the Web Push protocol, linked to the user and browser/device, with created/last-used/expired timestamps.
- Users can revoke/delete subscriptions; remove invalid/expired subscriptions after provider feedback. Never expose subscription secrets to other users or logs.

## Messaging

### `conversations`

-   ID, type, created timestamp.
-   Any last-message summary only if designed to avoid leakage and keep
    it consistent.

### `conversation_participants`

-   Conversation ID, user ID, joined/left/muted state as needed.
-   Unique participant pair per conversation.

### `messages`

-   ID, conversation ID, sender ID, body, timestamp, edited/deleted
    state if supported.
-   Ensure sender is a participant.
-   Pagination-friendly index such as
    `(conversation_id, created_at, id)`.

## System, role assignments and moderation

- `user_roles`: user ID, role key, granted by, granted at, optional expiry, revocation timestamp/actor and a reason/reference. Enforce valid role keys and protected write paths.
- `role_permissions` or a typed central permission catalogue, if a normalized permission model is used. Avoid a second conflicting source of truth.
- `account_status_events`: target user, previous/new status, actor, reason code, duration/expiry, appeal eligibility, case reference and timestamps.
- `moderation_actions`: action type, target, actor, reason, scope, duration, case/report reference, outcome and timestamps.
- `moderation_cases` or equivalent report workflow fields: assignment, priority, state, resolution, reviewer and timestamps.
- `appeals`: original action, appellant, appeal body, status, reviewer, decision rationale and timestamps; protect against unauthorized reads.
- `audit_events`: append-only application-level record for privileged actions and sensitive access, with actor/target/action/result/time/request correlation ID and retention limits. Do not put raw secrets or full private message bodies in the audit payload.
- Optional `security_events` for suspicious sign-ins, privilege escalation attempts, and critical configuration changes.
- Do not let a client assign its own role or account status.
- Avoid storing more data than necessary. Document retention, access, export and deletion/anonymization rules for each record.
- Make audit history immutable to normal application roles. If a provider/database owner can technically alter storage, describe this honestly and protect logs with restricted credentials and external retention/monitoring where appropriate.

## Database rules

-   Use foreign keys, unique constraints, check constraints, and
    indexes.
-   Prefer database-enforced integrity for critical invariants.
-   Use transactions for operations that modify related records.
-   Use UTC timestamps; clearly define date-only viewing entries
    separately.
-   Paginate large datasets.
-   Review query plans for high-traffic screens.
-   Define deletion/anonymization behaviour.
-   Ensure RLS is enabled and policies are tested for every exposed
    table.
-   Service-role credentials must never be shipped to clients.
-   Include reproducible migrations and safe seed scripts for
    development only.

------------------------------------------------------------------------

# PART 17 --- SECURITY, PRIVACY, AND TRUST

Implement and document: - Server-side input validation with a maintained
validation library such as Zod, after verifying current compatibility. -
Authorization checks on every protected mutation and sensitive read. -
RLS policies and least-privilege database grants. - Rate limiting for
login, signup, search, ratings, reviews, comments, messages, and AI
endpoints as appropriate. - Safe output rendering and XSS prevention. -
CSRF protection appropriate to the chosen auth/session model. - Secure
headers and a sensible Content Security Policy. - Safe redirect
allowlists. - Secrets in environment variables and secret
manager/deployment settings. - No secrets in client bundles or
repository history. - File upload type/size restrictions, safe storage
paths, and authorization. - Privacy controls for profiles, lists,
activity, and messages. - Account export/deletion flow and clear
retention rules. - Community guidelines and reporting. - Data
minimization and limited operational logging. - Dependency updates and
security review before launch.

Do not invent legal compliance claims. Before public launch, review
applicable privacy, consumer, child-safety, content moderation, and
data-protection requirements for the intended markets with qualified
advice as needed.

## Additional cross-platform safety requirements

- Establish threat models for account takeover, credential stuffing, scraping, spam, fake ratings, review manipulation, harassment, impersonation, spam DMs, malicious uploads, privilege escalation, and denial-of-service.
- Protect account recovery: rate limits, safe messages, token expiry/one-time use, session invalidation after password reset where appropriate, and notification of sensitive changes.
- Provide session/device management and “log out other sessions” if supported by the selected auth provider; document limitations honestly.
- Define username changes, reserved names, impersonation reports, rename cooldowns and URL redirects.
- Prevent mass assignment by validating allowed fields for every update.
- Use CSRF protections appropriate to the auth model, safe redirects, secure cookies where applicable, and a carefully configured Content Security Policy.
- Validate upload MIME/type/size and actual file content where feasible; do not trust the filename or client-provided content type.
- Define backup encryption/access, restore testing, incident response ownership and credential rotation.
- Keep a data inventory: purpose, sensitivity, visibility, provider sharing, retention, deletion/export path and owner for each data category.
- Do not use private messages or private diary entries for recommendation/AI analytics by default.
- Define notification preferences, email opt-outs where applicable, and privacy-safe notification previews.
- Make report/block, account deletion, and privacy settings usable from mobile as well as desktop.

------------------------------------------------------------------------

### Abuse prevention and anti-scraping controls for Movicin-owned content

- Apply configurable rate limits to unauthenticated and authenticated routes, especially search, public profiles, public reviews, public lists, activity feeds, authentication, password recovery, comments and other expensive endpoints. Enforce limits server-side, not only in the UI.
- Use per-IP and, where appropriate, per-account/device/session limits; account for shared networks and IPv6 carefully. Return `429` with `Retry-After` where applicable and avoid revealing sensitive account-existence details.
- Add bot/challenge protection (for example, a managed WAF or Cloudflare Turnstile) when risk thresholds justify it, especially for high-volume anonymous traffic and abuse-prone forms. Keep normal accessibility and legitimate search-engine crawling working; do not treat every crawler as malicious.
- Detect bursty enumeration, pagination abuse, repeated query variation and suspicious account creation. Apply progressive friction, temporary blocks and reviewable logs rather than indiscriminate permanent bans.
- Protect database and provider credentials; never expose direct privileged database access to browsers. Return only the fields required for the page, paginate public data, and avoid bulk-export endpoints unless deliberately designed and permissioned.
- Public content may be publicly viewable, so do not promise that rate limits make copying impossible. The goal is to reduce abusive bulk harvesting while preserving normal use and legitimate indexing.
- Configure limits and bot protection for the actual deployment platform (for example, Vercel WAF or Cloudflare); do not claim a control is active until configured and tested.
- Test rate-limit boundaries, bypass attempts, legitimate pagination, logged-in and logged-out behaviour, and crawler-safe SEO routes.

# PART 18 --- SEARCH, FILTERS, AND DISCOVERY

## Search

- Search movies and TV titles, and people where supported by the permitted provider.
- Implement **typo-tolerant fuzzy search** so common misspellings such as `Batmn` can still find `Batman`; do not rely on basic `ILIKE` substring matching as the complete search strategy.
- For PostgreSQL/Supabase, evaluate and document `pg_trgm` similarity/GIN or GiST indexes for typo tolerance alongside PostgreSQL full-text search (`tsvector`/`tsquery`) for token/ranked matching. Combine exact/prefix matches, normalized-title aliases/localized titles where licensed, trigram similarity and full-text relevance with a documented ranking strategy. Use the simplest measured approach that meets quality and latency goals.
- Keep provider search capability separate from Movicin-owned searchable fields; do not persist external aliases/metadata unless provider terms permit it. If database-side fuzzy search cannot cover the full external catalogue, use provider search plus a documented fallback rather than pretending local search covers everything.
- Debounced requests with cancellation/ignore-stale-results logic.
- Autocomplete with keyboard navigation, clear query feedback and sensible minimum-query/rate limits.
- Clear recent searches only if stored with appropriate privacy controls.
- Empty, loading, error, and no-results states; offer useful typo suggestions without claiming a title exists when it does not.
- Escape key and outside-click behaviour for overlays.
- Search results must not leak private user data.
- Normalize input carefully; do not over-normalize non-Latin scripts or strip meaningful accents/scripts indiscriminately.
- Test exact matches, prefix matches, transposed/missing characters, multi-word titles, non-Latin input, aliases/localized titles where permitted, stale-request races and rate limits.

## Discovery filters

Where provider data supports it: - Genre. - Release year or year
range. - Original or selected language. - Runtime range. - Community
score minimum and minimum rating count. - External rating, clearly
labelled and only if permitted. - Popularity/trending. - Release
status. - Region/country where data is available. - Sort by relevance,
release date, community score, or popularity. - Reset filters and
display active filter chips.

Make filters work together, be shareable in the URL where useful, and
remain usable on mobile through a filter drawer or sheet.

------------------------------------------------------------------------

# PART 19 --- SEO, SHARING, AND PERFORMANCE

## SEO

-   Server-render public movie pages where appropriate.
-   Unique, accurate title and description metadata.
-   Canonical URLs and stable slugs.
-   Open Graph/social preview metadata.
-   Sitemap and robots configuration.
-   Structured data only when accurate and compliant with the applicable
    schema guidelines.
-   Avoid indexing private profiles, private lists, messages, or
    user-only pages.
-   Handle missing/unavailable provider records gracefully.
-   Do not create thousands of thin, empty pages.

### Dynamic Open Graph image generation
- For community-rating overlays in social images, use a configurable minimum number of valid ratings; omit the score below that threshold and never expose private activity or spoiler content.

- Generate route-specific Open Graph images for public movie/TV detail pages, public user profiles and public custom lists using Next.js `ImageResponse` / `@vercel/og` or a compatible maintained approach supported by the chosen Next.js version.
- Movie/TV cards should use permitted poster artwork, title, year/type when known, and clearly labelled Movicin community rating only when enough valid ratings exist. Never confuse the Movicin score with an external/provider score.
- Profile and list images must include only fields explicitly public and approved for sharing. Respect private/unlisted visibility and user privacy settings; never generate share images for private content.
- Never include spoiler-marked text, private diary activity, private list items, messages, sensitive account data or unmoderated hidden content in generated images or metadata.
- Escape and validate all dynamic text and image inputs. Use safe image hosts, bounded image dimensions, timeouts and fallback layouts when a poster/avatar is missing.
- Cache generated images using stable, versioned keys and invalidate when relevant public fields change. Do not allow user input to trigger unbounded expensive image generation.
- Ensure `og:image`, `twitter:image` (where relevant), canonical URL, page title and description match the same public route and visibility state.
- Test with social preview debuggers and automated metadata checks; verify that the generated image works when fetched by a social crawler without cookies or a logged-in session.

## Sharing

-   Shareable movie pages and public lists.
-   Copy-link interaction with success/failure feedback.
-   Proper social preview images and text.
-   Share controls must not leak private list or profile details.
-   Optional shareable personal statistics with user approval.

## Performance

-   Optimize image size and priority.
-   Lazy-load below-the-fold images.
-   Keep server/client boundaries intentional.
-   Avoid making the whole app client-rendered without reason.
-   Avoid loading heavy animation code globally.
-   Paginate or progressively load large lists.
-   Cache only data that is safe and permitted to cache.
-   Add indexes for common queries.
-   Avoid N+1 database queries.
-   Use loading skeletons only where useful; preserve layout stability.
-   Test on slow networks and mid-range mobile hardware.
-   Enforce measurable performance budgets: at the 75th percentile of real-user field data where available, target LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1. Before sufficient field data exists, use repeatable lab tests on representative mobile/desktop profiles and track the trend. Treat Lighthouse mobile score ≥ 90 as a goal for key public routes, not a guarantee or substitute for field metrics. Document route-level exceptions and re-test after major changes.
-   Do not prefetch every route or image indiscriminately.

### Image delivery, optimization cost and cache policy

- Before using Next.js `<Image>` for third-party poster/backdrop URLs, decide and document the expected traffic, host/image-optimization pricing and quota limits, allowed remote hosts, cache behaviour and fallback strategy.
- Do not assume that a long cache TTL alone eliminates image-optimization charges or that every provider permits proxying, transforming, storing or CDN-caching its images. Verify the current provider licence/terms and the selected host's official image-optimization behaviour before launch.
- Prefer the least costly permitted delivery path: use appropriately sized provider/CDN image URLs directly when their terms and transformation capabilities allow it; use Next.js image optimization only where its cost, quota and cache behaviour are understood; or use a suitable external image CDN/proxy only when permitted and operationally justified.
- Configure explicit image sizes, responsive `srcset`/`sizes`, allowed remote patterns, quality limits and cache TTL/revalidation settings supported by the chosen deployment. Avoid unbounded transformations or user-controlled arbitrary image URLs.
- Keep poster/backdrop loading resilient: reserve aspect ratio, lazy-load below-the-fold images, prioritize only the actual LCP/hero image, and provide a fallback for missing, blocked, expired or rate-limited image URLs.
- Measure image requests, cache-hit ratio, transformation volume, provider/CDN usage and estimated cost in staging/production. Document the chosen approach and a threshold/alert for unexpected cost or quota growth; never bypass licensing restrictions to reduce cost.

------------------------------------------------------------------------

### Dynamic and paginated XML sitemaps

- Generate sitemap output dynamically from canonical, indexable records/routes; include movie, TV-series and person pages only when their metadata is valid, public, permitted by provider terms and eligible for indexing.
- Use a sitemap index with chunked child sitemaps when the catalogue grows. Respect search-engine protocol limits of at most 50,000 URLs per sitemap and 50 MB uncompressed per sitemap; choose a lower configurable chunk size (for example, 10,000–25,000 URLs) to leave operational headroom.
- Use deterministic sitemap URLs such as `/sitemap.xml` (index) and `/sitemaps/titles-1.xml`, `/sitemaps/people-1.xml` or the framework's equivalent route convention. Do not assume a single static `sitemap.xml` will scale indefinitely.
- Include only canonical URLs; exclude redirects, duplicates, unavailable/private records, search results, filtered query variants and pages that should carry `noindex`. Ensure `lastModified` is based on a real, meaningful update rather than the current time on every request.
- Define invalidation/revalidation and caching for sitemap index and chunks; update the index when chunks are added/removed and avoid generating an expensive full-catalogue query on every request. Add database indexes/keyset pagination or another bounded retrieval strategy for large catalogues.
- Test empty catalogues, exactly-at-limit and over-limit datasets, chunk boundaries, deleted/merged provider records, canonical URL changes, `noindex` exclusions, cache invalidation and provider outages. Sitemap generation must not leak private user activity or unpublished content.

# PART 20 --- ACCESSIBILITY AND RESPONSIVE DESIGN

Target WCAG 2.2 AA as the design goal, with a practical audit before
launch.

Requirements: - Semantic HTML and heading hierarchy. - Keyboard
navigation for all important actions. - Visible focus indicators. -
Accessible labels and names. - Sufficient text and control contrast in
both themes. - Screen-reader announcements for state changes where
appropriate. - Proper dialog focus management. - Keyboard-operable
search, dropdowns, menus, tabs, and rating controls. - Do not convey
rating or status by colour alone. - Captions/transcripts where media
content and rights permit. - Text scaling and browser zoom support. -
Reduced-motion mode. - Avoid flashing effects. - Touch-friendly
controls. - Responsive layouts for small phones, large phones, tablets,
laptops, and wide desktop screens. - No horizontal overflow at common
viewport sizes. - Test long translations and CJK/Indic text wrapping. -
Respect device safe areas. - Preserve native browser navigation and
scrolling patterns.

Do not promise every interaction will feel identical to an iPhone. Aim
for measured smoothness, clear interaction design, and reliable
performance across real devices.

------------------------------------------------------------------------

# PART 21 --- ADMIN AND CONTENT QUALITY

The administration area must implement the role and account lifecycle defined in **PART 15A**. Build a real protected operations surface, not merely a set of admin-looking pages.

At minimum, provide:
- Role-aware dashboard summaries based on actual records.
- Report triage, assignment, decision and resolution.
- User search and a privacy-limited user detail view.
- Account status actions with reason, duration, confirmation, appeal rules and audit records.
- Content hide/restore/remove controls with permission checks.
- Appeal review with conflict-aware assignment.
- Audit log inspection and protected role management.
- Clear errors for insufficient permissions, stale sessions and failed operations.
- Responsive tables and a usable mobile fallback.
- A secure bootstrap procedure for the first superadmin, documented outside public signup and without a hard-coded backdoor.
- Monitoring for repeated privileged failures and unusual admin activity.

Do not build destructive bulk actions, unrestricted private-message browsing, or a self-service role editor unless a separately reviewed need and authorization design justify them.

Build only the administration features actually needed: - Review
reported content. - Review user reports. - Remove or hide violating
content with an auditable reason. - Apply warnings, temporary
restrictions, or bans according to documented policy. - Handle appeals
if the moderation process supports them. - Inspect abuse/rate-limit
events without exposing private messages unnecessarily. - Maintain
secure role assignment. - Keep moderation UI separate from public
pages. - Log sensitive administrative actions.

Do not use a hidden, unauditable AI score to silently suppress user
ratings or reviews.

------------------------------------------------------------------------

# PART 22 --- TESTING AND ACCEPTANCE CRITERIA

For each feature, define and test its acceptance criteria.

## Essential automated scenarios

In addition to feature tests, cover:
- Role/permission matrix and forbidden-operation tests for every privileged route.
- Account status transitions, expiry handling, appeals, and session revocation.
- Admin action audit creation and protection from ordinary modification/deletion.
- Last-superadmin protection and role-change reauthentication.
- RLS checks using multiple users/roles and attempts to access other users' private data.
- Abuse controls: duplicate reports, rate limits, repeated posting, invalid IDs and malformed payloads.
- Account deletion/export, privacy changes, and handling of orphaned provider data.
- Localization, RTL readiness, reduced motion, keyboard navigation, and small-screen flows.
- Provider timeout/rate-limit/outage behaviour and licensing/attribution display.
- Email verification/recovery paths and account enumeration-safe errors.
- Image upload rejection cases, unsafe filenames, and unauthorized object access.
- TV episode/season tracking when enabled: idempotent watched toggles, rewatch history, specials/unknown numbering, provider data changes, episode-order ambiguity, progress aggregation and RLS.
- Strict spoiler-free mode across cast, episode lists, reviews, comments, list descriptions, notifications, search snippets, image/social metadata and explicit reveal/override flows.
- Live auth-form validation matches server rules, works with keyboard/screen readers, and preserves user input after recoverable failures without exposing account-existence details.
- Release reminders respect user opt-in, region/timezone, date changes, duplicate suppression, channel preferences and revocation.
- Google Calendar export/sync, if implemented, uses narrow scopes, handles token revocation and does not duplicate events on retries.
- Ticket/provider links have correct territory/title mapping, freshness, outbound-link safety and affiliate disclosure where applicable.
- Trivia/goofs, awards, soundtracks, news and forums are shown only when sourced/licensed or user-submitted through the permitted moderation flow; spoilers and takedowns are enforced.
- Wrapped preview/export does not leak private user data, spoiler content or another person’s identity/activity.

1.  A visitor can browse discovery pages without logging in.
2.  Search handles loading, errors, empty results, keyboard navigation,
    and non-Latin queries.
3.  A user can sign up, verify/authenticate as configured, log in, log
    out, and recover access.
4.  Onboarding can be completed, skipped, revisited, and edited.
5.  A user can give a rating of `0`, `5`, `7.5` (if half-point
    increments are enabled), and `10`.
6.  A user cannot submit `-1`, `10.5`, or another unsupported value.
7.  Updating a rating changes the existing record rather than creating a
    duplicate.
8.  A movie with no ratings does not display `0.0` as a community
    average.
9.  Watchlist and watched history operate independently.
10. A user can record multiple viewings of the same movie.
11. Reviews and comments support validation, edit/delete permissions,
    spoiler handling, and moderation state.
12. Duplicate likes/reactions are prevented.
13. Users cannot follow themselves.
14. Private profile and blocked-user rules are enforced on the server.
15. Only conversation participants can read/send messages.
16. One user cannot read another user's private messages, preferences,
    or private lists.
17. RLS is tested using separate user identities, including adversarial
    access attempts.
18. Locale selection changes UI text and persists as intended.
19. Long translations and RTL layouts do not break navigation.
20. Dark/light themes remain readable.
21. Reduced-motion preference disables or simplifies non-essential
    animations.
22. Core flows work with keyboard only.
23. Responsive layouts have no critical overflow or unusable controls.
24. API provider errors and rate limits produce a graceful fallback.
25. AI outages do not break ordinary discovery.
26. Account deletion follows the documented retention policy.
27. Production build succeeds without exposed secrets or critical
    console errors.

## Manual release checklist

-   Test desktop and real mobile browsers.
-   Test at least one mid-range Android device if available.
-   Inspect slow-network behaviour.
-   Check poster failures and fallback states.
-   Test light/dark themes on all major pages.
-   Verify provider attribution and current licensing requirements.
-   Check privacy and terms pages.
-   Check metadata, canonical URLs, sitemap, and social previews.
-   If release reminders/calendar features are enabled, test opt-in, timezone/territory, duplicate/date-change handling and provider revocation.
-   If Wrapped sharing is enabled, verify public/private boundaries and the exact image/share output for spoilers and private fields.
-   Run dependency/security checks.
-   Verify logs do not contain passwords, secret keys, or private
    message bodies.
-   Review database backup and recovery arrangements appropriate to
    launch stage.

------------------------------------------------------------------------


# PRODUCT SCOPE CONTROL — WHAT TO BUILD FIRST

The specification describes the intended product over time; it is **not** permission to build every feature at once. Protect the owner from an unmaintainable, half-working mega-build.

## Launch MVP (first usable web release)

Follow the canonical phase order in Part 23; this list defines scope, not a separate schedule.

Prioritize these end-to-end, working flows:

1. Responsive public homepage and movie discovery.
2. Real movie search and movie detail pages from a permitted data source.
3. Authentication, session handling, and a minimal profile.
4. Onboarding that is skippable and stores explicit preferences.
5. One rating per user/movie (0–10, with the chosen increment clearly stated).
6. Watchlist and watched history that are independent of ratings.
7. Review creation/edit/delete with spoiler handling.
8. Light/dark/system theme, English UI foundation, and Hindi readiness without falsely claiming incomplete translations are supported.
9. Reliable empty/loading/error states, accessibility checks, automated tests, deployment preview, and essential legal/privacy pages.
10. A working `.env.example`, setup guide, and documentation that lets the owner run and explain the app.
11. If public user-generated content is enabled: basic report/block controls, a protected moderator/admin workflow, a minimal role model, and audited account/content restrictions before public rollout.
12. A secure initial privileged-account bootstrap and tested authorization boundaries before any admin UI is deployed.

A feature only counts as part of the MVP if its full journey works from UI to validated server/database operations and is tested. A static mockup or button with no behavior does not count.

## Later releases

Add in stages after the MVP is stable, using the priority order in Part 23. Episode/season-level TV tracking is the first high-priority feature expansion once title-level TV tracking and provider/licensing foundations are stable:
- Episode/season progress, release reminders and an upcoming-release calendar; Google Calendar sync only after the simpler export and OAuth/privacy review.
- Trivia/goofs/awards/soundtracks, editorial/news pages, and community forums with their respective licensing and moderation gates.
- Authorized theatrical ticket-booking deep links or affiliate links where an actual partner/program grants permission.
- Privacy-safe shareable Wrapped cards and image export.
- Comments, replies, reactions, follows, lists, activity feed, and notifications.
- Advanced moderation analytics and operational tooling beyond the initial report/block workflow, after the MVP has safe baseline controls.
- Direct messaging, only after participant-only authorization, block/report behavior, rate limits, and privacy controls are proven by tests.
- Advanced recommendation ranking and optional AI features.
- Full multilingual rollout beyond English and Hindi.
- Native Android/iOS app.

Do not remove security/privacy foundations from the MVP just because social features are deferred. If public user-generated content ships, basic reporting, abuse prevention, and clear community rules must ship with it.

## Scope decision rule

Before starting a feature, state:
- The user problem it solves.
- Whether it is MVP or later.
- Required data/provider access.
- Security/privacy implications.
- Acceptance criteria and tests.
- Dependencies and estimated complexity in plain language.

If the coding agent proposes a major change to the selected stack, data provider, authentication approach, or scope, explain the trade-off and ask the owner when the decision is material. Do not silently switch stacks.

# PART 23 --- CANONICAL DELIVERY ROADMAP

**This is the only authoritative implementation roadmap.** Any older changelog or feature addendum describes requirements, not a competing phase order. Update `docs/ROADMAP.md` to mirror this sequence. Do not skip gates simply to produce more visible features.

## Phase 0: Repository, product and provider due diligence

- Inspect the repository, existing code, package manager, scripts, deployment, environment configuration, current tests and git status before editing.
- Confirm the agreed stack and document architecture, data model, route conventions, threat model and current project state.
- Review Cinejoy first as required by Part 3; use Moctale only if Cinejoy is genuinely inaccessible, and document the fallback.
- Investigate provider API coverage, current terms, attribution, cache/display requirements and commercial-use rights. Do not publicly ship provider data until the permission decision is documented.
- Produce `docs/PRODUCT_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DATABASE_SCHEMA.md`, `docs/DESIGN_SYSTEM.md`, `docs/SECURITY.md`, `docs/TEST_PLAN.md`, `docs/ROADMAP.md`, `docs/REFERENCE_REVIEW.md` and `docs/INTEGRATIONS.md`.

**Gate / approval boundary:** complete inspection, research and draft documentation first. Present the owner with the plan, major assumptions, provider/licensing risks and MVP scope. Do not begin feature implementation until the owner approves that plan; routine, reversible documentation fixes and repository inspection do not require separate approval.

## Phase 1: Foundation, design system and quality baseline

- Establish the app shell, route/layout structure, typed configuration, error boundaries and environment validation.
- Implement responsive design tokens/components, dark/light theme if retained in scope, accessibility basics, loading/empty/error states and reduced-motion defaults.
- Establish lint, type-check, unit/integration tests, build checks, CI where appropriate and a baseline performance measurement process.
- Implement provider adapters and permitted cache abstractions without coupling provider data to user-owned data.
- Define the canonical routes: `/movie/[slug]`, `/tv/[slug]`, and `/person/[slug]`; use stable internal/provider IDs behind route resolution and safe canonical redirects.

**Gate:** clean build and quality checks; responsive shell and design-system examples reviewed; no secrets in client bundles.

## Phase 2: Public discovery and title/person pages

- Build public homepage, curated/featured sections, search, filters, pagination/progressive loading and accessible loading/empty/error states. Add a basic `/upcoming` route only when the provider offers sufficiently reliable and permitted release-date data; otherwise expose a clearly labelled unavailable/limited state rather than fabricated dates.
- Build movie and TV detail pages with synopsis, available metadata, ratings clearly attributed by source, main cast/crew, production companies and official trailer links/embeds where permitted.
- Build clickable person profiles and linked filmography/TV credits. `people` and normalized credit relations are required for this phase; unsupported individual metadata fields may remain unavailable rather than fabricated.
- Implement provider outage handling, stale-while-revalidate/cache fallback where permitted by provider terms, and clear service-unavailable states without hiding Movicin-owned user content.
- Implement lazy trailer embeds using the facade/Lite YouTube Embed pattern; do not load player iframes until explicit play.
- Implement SEO, canonical metadata, dynamic Open Graph images for public routes and route-level performance budgets.

**Gate:** public discovery works end-to-end with permitted data; outage, missing-data, trailer activation, spoiler metadata and social-preview tests pass.

## Phase 3: Authentication and onboarding

- Implement Google sign-in and email/password authentication with safe callbacks, allowlisted redirects and account-state enforcement.
- Provision profiles idempotently; handle username conflicts and recoverable partial provisioning without creating duplicate or orphaned identities.
- Implement onboarding/preferences and profile privacy controls. Browsing must remain available without sign-in.
- Implement real-time client-side validation feedback for authentication forms from the same documented password/email rules enforced server-side. Keep validation accessible and never treat client validation as a security boundary.
- Test RLS/authorization, account linking, duplicate-account cases, recovery flows and restricted/suspended accounts.

**Gate:** auth flows work in local/preview/production configuration; authorization tests pass; no role or account status is trusted from client input.

## Phase 4: Personal movie diary

- Implement 0–10 ratings, watchlist, watched/history status, personal stats and review drafting/edit/delete controls.
- Establish strict spoiler-free mode foundations in user preferences and a shared server-side spoiler-safety policy; every surface must opt into safe data contracts before the global mode can be advertised as complete.
- **Until Phase 5's moderation and safety gate passes, reviews must remain private drafts or otherwise non-public; do not expose a public review feed or public review publication path in Phase 4.**
- Keep community scores separate from third-party/provider scores and define how deleted/deactivated accounts affect aggregates.
- Implement spoiler flags, safe formatting and content-warning controls. Spoiler protection must apply before truncation and in every preview/metadata surface.
- Ensure user-owned records remain available if the movie metadata provider is temporarily down.

**Gate:** unique constraints, ownership policies, edge cases, accessibility and diary flows are tested end-to-end.

## Phase 5: Safe community

- Before enabling any public UGC **including public reviews**, ship report/block, moderation queues, admin roles, audit logs, rate limits, anti-abuse controls, account restrictions, appeals and operational runbooks.
- After the safety gate passes, enable public review publication, follows, comments, reactions, activity feeds, public/custom lists and list visibility controls. Community forums must use the same safety gate and moderation controls, not bypass them as a separate content type.
- Establish the roles, moderation policy and correction/takedown requirements needed for a future editorial/news section; the public editorial/news and forum feature slice is scheduled in Phase 8 and must not bypass these safeguards.
- Ensure report submitters can see their own report status and receive privacy-safe resolution feedback when appropriate.
- Apply cross-surface spoiler protection to feeds, list descriptions, notifications, search snippets and social cards.
- Protect public profiles/reviews/lists against abusive bulk harvesting while keeping ordinary access and legitimate search-engine crawling functional.

**Gate:** report-to-resolution workflow, authorization, moderation, anti-scraping, privacy and spoiler tests pass before public community launch.

## Phase 6: High-priority TV season/episode tracking

- Begin only after title-level movie/TV activity and permitted provider data foundations are stable. Design normalized season/episode mappings, reviewed migrations, specials/unknown numbering semantics and a clear policy for title-level “watched” records that cannot be converted into episode history.
- Ship individual episode watched/unwatched actions, correction/undo, progress and next-unwatched-episode guidance where numbering is reliable. Keep series watched state, season completion and all-known-episodes completion distinct; never invent episode history from a title-level event.
- Keep progress private by default, apply Strict Spoiler-Free Mode to future/unwatched episode metadata, and ensure provider outages do not affect Movicin-owned progress.

**Gate:** approved schema and migration plan; provider rights documented; RLS, duplicate/idempotency, episode ordering, specials, provider changes/outages, spoiler safety and end-to-end UX tests pass. Do not begin implementation before owner approval for the Phase 0 plan.

## Phase 7: Direct messaging

- Implement conversations, participants, message access policies, block/report behaviour, notification preferences and spam controls.
- Keep private messages out of public feeds, search, analytics and AI features by default.
- Add realtime delivery only after permissions and persistence are correct.

**Gate:** cross-user access tests, blocked-user behaviour, abuse limits and privacy checks pass.

## Phase 8: Recommendations and optional enhancements

Deliver optional work as separately estimated and approved slices. After Phase 6 TV progress is stable, prioritize the following enhancements in order where they solve a demonstrated user need:

### 8A — Release reminders and calendar
- Add an upcoming-release calendar for movies and episodes where reliable local/territorial dates exist. Let users opt in to reminders and choose reminder timing, content type, region and timezone; do not silently send every watchlisted item to external channels.
- In-app reminders use the in-app baseline. Email/web push require the channel-specific gates already defined elsewhere. A downloadable `.ics`/calendar-event export may ship before a direct Google Calendar integration.
- Google Calendar API integration is optional and consent-based. Use the narrowest appropriate OAuth scope, disclose requested access, secure tokens server-side, handle revocation/deletion and avoid duplicate events on retries. Re-check Google's current verification/policy requirements before production.

### 8B — Shareable annual Wrapped
- Provide an explicit preview, field-level privacy choices, image download/Web Share API support where available, and optional revocable public share page. Default to excluding private profiles, diary notes, hidden ratings, private lists and detailed timestamps.

### 8C — Film reference and music enrichment
- Add awards/nominations, sourced trivia/goofs and soundtrack/official music links only through a licensed provider, verified permission, or a moderated user/editor contribution model with rights and provenance. Spotify links/metadata are conditional on current policy and attribution; do not build embedded music playback, audio previews tied to video, or unsupported commercial streaming functionality.

### 8D — Theatrical ticket links
- Add regional showtimes or ticket links only through an authorized data/affiliate/partner route. Do not assume a public BookMyShow API, affiliate approval, inventory, ticket price or commission arrangement exists. Disclose affiliate relationships and label outbound booking links; purchases happen with the ticketing provider unless a separately approved and secure ticketing integration is designed.

### 8E — Editorial/news and forums
- Add original, cited news/editorial publishing plus community forum boards after editor/admin permissioning, report/block, rate-limit, anti-abuse, spoiler controls, correction/removal process and safety tests are ready. Never scrape/rehost third-party article text or images without permission.

### Other enhancements
- Improve recommendations with transparent reasons, user feedback and evaluation against simple baselines.
- Add regional Where to Watch only after source/licensing/territory checks; show freshness and availability region clearly.
- Add earned badges, collaborative lists, PWA/offline capabilities and optional AI only as separately scoped, tested increments.
- Treat **Web Push Notifications** as a distinct opt-in PWA enhancement, not an automatic side effect of installability: request permission only after a clear user action/context; support subscription creation/revocation, service-worker push handling, click-through routing, preferences, deduplication, invalid-subscription cleanup and graceful unsupported/denied states. Keep in-app notifications as the reliable baseline. Do not promise native-app parity or retention multipliers; verify browser/platform support and measure delivery.
- Evaluate Lenis only through a measured prototype; native scroll remains the default, especially on touch devices. Use Motion for standard React motion and GSAP only for a specific justified timeline.
- Movicin Pro/payment integration remains deferred unless the owner explicitly approves a later product decision.

**Gate:** each enhancement has a clear user benefit, privacy/licensing review, measurable acceptance criteria and rollback path.

## Phase 9: Production readiness and launch

- Complete security/privacy review, accessibility audit against WCAG 2.2 AA as a goal, rate-limit/WAF configuration, logging/alerting, backup and restore test, deletion/export checks and incident-response plan.
- Verify metadata-provider terms, attribution, image/media rights, dynamic social previews and search-engine visibility rules.
- Measure Core Web Vitals and route-level performance; target LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 at the 75th percentile when field data is available. Treat Lighthouse mobile ≥ 90 as a goal, not a guarantee.
- Run production build, smoke tests, authorization tests, provider-outage drills and rollback checks. Document any accepted limitation.

**Gate:** no critical/high-severity unresolved security issues, all release blockers closed, provider permissions documented, and the owner receives a truthful release report.

## Phase 10: Native mobile application

Only begin after the web product's core flows, API/data contracts, privacy model and operational requirements are stable. Reuse the same domain rules and permissions; do not treat the mobile app as a shortcut around web security or moderation gates.

# PART 24 --- REPOSITORY ORGANIZATION

Use a structure appropriate to the chosen Next.js version and
conventions. Suggested starting point:

``` text
src/
  app/
    [locale]/
      (public)/
      (auth)/
      (app)/
    api/
      v1/
  components/
    ui/
    layout/
    movies/
    ratings/
    reviews/
    social/
    messaging/
    lists/
    recommendations/
    onboarding/
  features/
    auth/
    movies/
    ratings/
    watchlist/
    history/
    reviews/
    lists/
    profiles/
    social/
    messaging/
    notifications/
    recommendations/
    moderation/
    administration/
    appeals/
  lib/
    auth/
    db/
    env/
    i18n/
    validation/
    logging/
    rate-limit/
  server/
    providers/
    repositories/
    services/
    policies/
  hooks/
  types/
  styles/
  messages/
supabase/
  migrations/
  seed.sql
docs/
  PRODUCT_SPEC.md
  BRAND_AND_NAMING.md
  ARCHITECTURE.md
  DATABASE_SCHEMA.md
  DESIGN_SYSTEM.md
  SECURITY.md
  ADMIN_AND_MODERATION.md
  ROLE_PERMISSION_MATRIX.md
  INCIDENT_RESPONSE.md
  TEST_PLAN.md
  ROADMAP.md
  REFERENCE_REVIEW.md
  INTEGRATIONS.md
```

This is a starting point, not a command to force every file into a
folder. Follow current Next.js conventions, avoid duplicate
abstractions, and adjust if the repository already has a sound
structure. Keep privileged modules server-only.

------------------------------------------------------------------------

# PART 25 --- ENVIRONMENT, CONFIGURATION, AND DEVELOPER EXPERIENCE

Create `.env.example` with variable names and safe placeholders only.
Never include real secrets. Include the public display-name setting only if needed by the chosen configuration, with `Movicin` as a provisional development value; make clear it can be changed without touching business logic.

Potential variables, depending on final provider choices: - Public
application URL. - Supabase project URL. - Supabase publishable/anon key
as appropriate for the chosen client setup. - Server-only Supabase
secret/service-role key only if genuinely needed; prefer user-scoped
access and RLS instead. - Movie provider token, server-only where
required. - AI provider key, optional and server-only. - Error
monitoring DSN according to provider guidance. - Rate-limit service
configuration if an external service is chosen.

Requirements: - Validate required environment variables at startup/build
as appropriate. - Clearly distinguish public and server-only
variables. - Fail with helpful configuration errors without printing
secret values. - Document local setup, migrations, seed data, tests, and
deployment. - Add `.env*` to `.gitignore` while allowing
`.env.example`. - Never paste actual secrets into prompts, generated
docs, screenshots, or logs. - Use separate credentials/projects for
development and production.

------------------------------------------------------------------------


## Brand renameability acceptance checklist

A future product rename should require changing one central brand configuration and related approved assets, not changing application logic. Verify that:
- Header, footer, login/signup, onboarding, empty states, email templates (if any), page titles, metadata, and social previews read the same configured name.
- Tests can assert the configured brand label without relying on a hard-coded string in every component.
- The README and user-facing documentation distinguish the current working name from legal approval.
- No secrets or private configuration are exposed while implementing the public name.
- No database schema or user data migration is needed just to change the display name.
- A future domain change has a separate redirect/canonical URL plan and is not assumed to happen automatically.

# PART 26 --- DEFINITION OF DONE

A feature is not complete just because its UI exists. A feature is done
when: - The UI is responsive and accessible. - Loading, empty, error,
success, and disabled states are considered. - Validation exists on the
server for sensitive writes. - Authorization is enforced. - Database
constraints support important invariants. - Automated tests cover core
behaviour and security-sensitive cases. - Type checks, lint, and
relevant builds pass. - No secrets or private data are exposed. -
Documentation is updated. - Any external API usage is compliant with its
current terms. - The developer can explain how the feature works. - Any
known limitation is written down rather than hidden.

------------------------------------------------------------------------

# PART 27 --- HOW THE CODING AGENT MUST EXECUTE

Follow this exact workflow.

## Step 1 --- Inspect

-   List the repository structure.
-   Inspect `package.json`, lockfile, scripts, existing app, environment
    examples, migrations, and git status.
-   Identify existing functionality and avoid destroying it.
-   If there is no repository, scaffold the app with the selected
    current stable stack.
-   Inspect the reference site if browsing is available.

## Product decisions that require owner approval
Use Movicin as the current provisional working/display name because the owner requested it for this version. Keep it centrally configurable and explicitly renameable. Do not treat it as legally cleared or permanently final. Do not design a final logo or commit to final brand assets yet. Before public launch or any costly brand commitment, ask the owner to approve final naming and visual identity after availability checks.

## Step 2 --- Report and plan

Before large changes, summarize: - Current project state. - Proposed
architecture. - Key decisions and trade-offs. - Any licensing or
security blockers. - First implementation milestone. - Commands that
will be run.

Do not ask the user to confirm every minor decision. Ask only when a
real blocker exists.

## Step 3 --- Phase 0 documentation; wait for approval before foundation implementation

Before the owner approves the Phase 0 plan, limit changes to repository inspection and the reversible Phase 0 documentation listed in Part 23. Do not scaffold or modify application code, install/change dependencies, add environment/configuration files, change lint/test setup, implement theme tokens, or create the initial layout before approval.

After the owner explicitly approves the plan, proceed to Part 23 Phase 1: foundation, design system and quality baseline. Do not treat this workflow step as an exception to the approval gate.

## Step 4 --- Implement vertical slices

For each feature: 1. State the acceptance criteria. 2. Update
schema/migrations if needed. 3. Implement server validation and
authorization. 4. Implement UI and states. 5. Add tests. 6. Run tests,
type checking, lint, and build as appropriate. 7. Review accessibility,
performance, and security. 8. Summarize changed files and results. 9.
Continue to the next small slice.

## Step 5 --- Review the work

After each phase, check: - Broken routes and dead buttons. - Responsive
layout. - Theme parity. - Console and server errors. - RLS and
authorization. - Duplicated business logic. - Unnecessary
dependencies. - Loading/error/empty states. - Provider licensing and
attribution. - Reduced-motion behaviour.

## Step 6 --- Keep project notes current

Maintain a concise `docs/IMPLEMENTATION_STATUS.md` with: - Completed
features. - Current phase. - Test commands and latest actual outcomes. -
Known bugs and blockers. - Environment setup still required. - Next
recommended task.

Never say "everything is finished" if there are unimplemented controls,
failing tests, missing secrets, unverified licensing, or untested
security rules.

------------------------------------------------------------------------

# PART 28 --- FIRST RESPONSE REQUIRED FROM THE CODING AGENT

When this prompt is first supplied, **do not immediately generate the
entire app**.

First respond with: 1. A concise summary of the intended product. 2. The
existing repository state (or confirmation that a new project must be
scaffolded). 3. The proposed architecture and important trade-offs. 4.
The initial database/domain model. 5. The proposed visual and animation
system, using only a provisional text wordmark for Movicin. 6. The staged implementation plan. 7. Any current provider
licensing, API-access, or configuration blockers. 8. The exact first
milestone you propose to implement.

Then stop at the Phase 0 approval gate and present the plan, major
assumptions, provider/licensing risks, MVP scope, and proposed first
milestone to the owner. **Do not begin feature implementation until the
owner explicitly approves the plan**, as required by Phase 0. Repository
inspection and reversible documentation work may continue before
approval; after approval, begin implementation in small, reviewable
vertical slices. Do not interpret this instruction as permission to
bypass the approval gate.

------------------------------------------------------------------------

# FINAL PRODUCT STANDARD

The finished platform (currently using the provisional name Movicin) should feel like a carefully designed cinematic
product, not a generic dashboard or a static AI-generated template. It
must be visually distinctive, quick to navigate, accessible,
multilingual-ready, secure, responsive, and genuinely functional.

Prioritize in this order:

1.  Correctness and trust.
2.  Security and privacy.
3.  Usability and accessibility, validated through real user journeys.
4.  Performance and reliability.
5.  Visual quality and purposeful motion.
6.  Advanced personalization and AI.

The goal is not to maximize the number of libraries or animations. The
goal is to create a coherent product that people enjoy using and that
its developer can maintain, explain, test, and evolve into a mobile
experience.


------------------------------------------------------------------------

## V10 cross-cutting acceptance tests

Before considering the corresponding features complete, test at minimum:
- **Movie/TV consistency:** `/movie/[slug]` and `/tv/[slug]` resolve canonical IDs; ratings, watchlist, history, reviews and list items target the correct `title_id`; person filmography links to the correct content type.
- **TV end-to-end parity:** test TV-series detail pages, community ratings, watchlist add/remove, title-level watched/history events, reviews, lists, person credits/filmography, canonical metadata and provider-outage states. Episode/season tracking is not MVP, but is the first high-priority post-core enhancement in Part 23; it must use a separate reviewed schema/migration and acceptance gate before being advertised.
- **Fuzzy search:** exact/prefix ranking, common typos/transpositions, multi-word queries, non-Latin scripts, rate limiting and provider/database fallback behaviour.
- **Moderation feedback:** report status is visible only to the reporter and authorized staff; resolution notifications are truthful, deduplicated, privacy-safe and spoiler-safe.
- **PWA/Web Push:** permission is user-initiated; unsupported/denied states are handled; subscriptions can be revoked; invalid subscriptions are cleaned up; push payloads omit private/spoiler content; click-through is safe.
- **Cold start:** skipped onboarding still leads to useful public discovery and generic recommendations; the widget is dismissible; rating progress is real; no unsupported “personalized for you” claim is displayed.
- **Public UGC gate:** no public review publication or public review indexing is possible before Phase 5's safety gate passes.
- **Lists and spoilers:** one canonical list model supports movies and TV; `description_contains_spoilers` / `contains_spoilers` on list descriptions, comments and reviews are respected before truncation, notifications and social-card generation.
- **Strict spoiler-free mode:** global preference is enforced consistently on title pages, cast/guest-cast, episode lists, media thumbnails, reviews/comments, feeds, notifications, search, SEO/OG images and shared Wrapped content; explicit reveal actions work and are not accidentally triggered by focus/hover.
- **TV episode tracking (when shipped):** marking episodes, undoing, rewatching, deriving progress/next episode, season/episode reorder changes, specials, duplicate events, migration ambiguity and cross-user authorization.
- **Release reminders/calendar:** consent, territory/timezone, unreliable or changed dates, idempotency, event duplication, cancel/revoke flows and channel preferences.
- **Editorial/forums/enrichment:** article source attribution/corrections, user submissions, report/block/moderation, copyright/takedown flow and spoiler-safe previews.
- **Soundtrack/ticket links:** source provenance, region matching, permitted API/linking behaviour, outbound safety and affiliate disclosure.
- **Forms/performance:** live password requirements mirror server rules; animation cannot block data/results/actions; long text and code/content containers do not create keyboard traps or scroll-jank.
- **Wrapped sharing:** private fields are excluded by default; opt-in sharing, preview, revoke/noindex controls and social-image generation are tested.

------------------------------------------------------------------------

# CHANGELOG — V9.1 FINAL REVIEW CORRECTIONS

- Aligns the rating model with the canonical `titles` table by using `title_id` and unique `(user_id, title_id)` across movies and TV series.
- Resolves the Phase 0 approval boundary: implementation must wait for explicit owner approval after the plan and blockers are presented.
- Adds TV end-to-end acceptance coverage and reiterates that episode/season tracking is deferred unless separately designed and approved.
- Makes in-app notifications the only default MVP channel; email and web push remain unavailable until their channel-specific implementation and tests pass.
- Adds image delivery/optimization cost controls, licensing-aware CDN choices, explicit cache settings, cost monitoring and quota alerts.
- Defines collaborative-list/account-deletion behaviour, including explicit ownership-transfer consent or deliberate cascade deletion, foreign-key strategy and lifecycle tests.
- Adds scalable sitemap index/chunk generation, URL and size limits, canonical/noindex rules, bounded catalogue queries, cache invalidation and scale tests.
- These corrections amend the active specification; they do not expand the initial MVP or override the authoritative roadmap and existing provider/licensing safeguards.

------------------------------------------------------------------------

# CHANGELOG — V9 CONFLICT RESOLUTION AND UX COMPLETENESS

- Fixes the malformed person route and adds the canonical `/tv/[slug]` route.
- Unifies movies and TV series under a stable canonical `titles` model with `content_type`, normalized credits and `title_id` references across ratings, watchlist, history, reviews and lists; defines MVP watch tracking at title level, not episode level.
- Expands the provider adapter contract to cover movie and TV search/details/credits/trending/popular/similar titles and person filmography where supported.
- Resolves the conflicting roadmap in the historical Part 29.9 note; Part 23 alone controls implementation order and approval gates.
- Prevents public reviews from shipping before the report/block/moderation safety gate in Phase 5.
- Consolidates personal and collaborative lists into one canonical list/items model with normalized membership.
- Defines notification preferences, an in-app baseline, optional consent-based web push, privacy-safe payloads, delivery/retry/subscription lifecycle and report-resolution feedback.
- Adds explicit typo-tolerant fuzzy search guidance for PostgreSQL/Supabase using a measured combination of `pg_trgm`, full-text search, exact/prefix matches and provider search where required.
- Adds a non-blocking cold-start widget for users who skip onboarding, with a configurable rating goal and no false personalization claims.
- Adds explicit spoiler semantics for reviews/comments/list descriptions and a configurable minimum-rating threshold for social-image score overlays.
- Clarifies the Phase 0 owner approval boundary and preserves prior licensing, privacy, accessibility, anti-scraping, outage resilience, lazy trailer, SEO and performance safeguards.

This addendum records specification changes only. It does not mean any feature has been implemented, provider access has been approved, or tests/security/legal reviews have passed.

# CHANGELOG — v3 MOVICIN WORKING-NAME EDITION

This edition is based on the supplied v2 master prompt. It preserves the original product ambition and core architecture while clarifying the following:

- Movicin is the provisional working name, not a legal or permanent brand decision.
- Brand strings must be centralized and renameable.
- Final logo and brand assets are deferred until the owner chooses to approve them.
- MVP scope is separated from later social, messaging, AI, and mobile releases.
- UX acceptance criteria are explicitly treated as part of feature completion.
- Third-party movie metadata licensing and attribution remain pre-launch gates.
- The selected Next.js + TypeScript + Supabase/PostgreSQL architecture is documented as a deliberate choice, not silently mixed with MERN.
- Coding agents must report only verified implementation/test outcomes and must not fabricate data, success, legal clearance, or personalization.
- Adds a complete role/access-control and account-lifecycle design: visitor, member, moderator, admin, superadmin and service identity; least-privilege permissions; suspension/ban/deactivation distinctions; appeals; audited moderation; admin UX; and security safeguards.
- Adds acceptance tests for privilege escalation, account restrictions, RLS isolation, role revocation, superadmin recovery and audit integrity.

This document is a product/engineering specification. It is not a generated application, legal opinion, trademark clearance, or proof that any external API/provider is available or permitted for the intended use.


------------------------------------------------------------------------

# CHANGELOG — v4 ADMINISTRATION, MODERATION AND PLATFORM COMPLETENESS

This edition is based on the supplied Movicin v3 document. It preserves the existing product direction and adds cross-cutting requirements that were previously only partially specified.

## Key additions
- Explicit visitor/member/moderator/admin/superadmin roles, plus a separate non-human service identity.
- A default-deny, least-privilege permission model and a role capability matrix.
- Clear distinction between personal blocking, feature restriction, temporary suspension, permanent ban, user deactivation and deletion.
- Protected admin routes, user lookup, report queues, moderation cases, appeals, audit-event viewing and controlled role management.
- Superadmin safeguards, MFA expectations, fresh authentication for critical actions, last-superadmin protection, and a documented break-glass recovery process without hard-coded backdoors.
- Audit records for privileged actions and sensitive access, with privacy-aware retention.
- Required authorization/RLS tests across multiple identities, including attempted privilege escalation and stale sessions.
- Added admin-related MVP and release criteria, repository modules, and operational documentation.
- Broader cross-platform safety checks for account recovery, abuse, uploads, data inventory, sessions, incident response and notifications.

## Important implementation rule
Do not implement every feature at once. Build the authorization foundation early, then implement the minimum safe moderation workflow before public user-generated content is opened. The full advanced admin dashboard can grow in stages, but public content and privileged operations must never ship without server-side enforcement and tested access boundaries.

This remains a specification, not proof of implementation, legal compliance, provider permission, or a completed security audit.



------------------------------------------------------------------------

# PART 29 — V5 A-TO-Z REVIEW HARDENING ADDENDUM

This addendum resolves cross-cutting ambiguities found during a full
specification review. It supplements earlier parts; it does not authorize
building every feature in the MVP. Where this addendum clarifies an
earlier requirement, follow the more specific security rule here.

## 29.1 Version and source-of-truth rules

- This file is v5. The v3 and v4 changelog entries below are historical
  notes, not the current document version.
- Keep the permission catalogue, role-to-permission mapping, account
  status transition rules, and moderation action types in one documented
  source of truth. Do not maintain contradictory copies in UI code,
  database seeds, and server helpers.
- Before implementation, turn this specification into reviewed
  `docs/PRODUCT_SPEC.md`, `docs/ARCHITECTURE.md`,
  `docs/DATABASE_SCHEMA.md`, `docs/SECURITY.md`,
  `docs/ADMIN_AND_MODERATION.md`, `docs/ROLE_PERMISSION_MATRIX.md`,
  `docs/INCIDENT_RESPONSE.md`, and `docs/TEST_PLAN.md`. Record any
  intentional deviation and the owner's decision.

## 29.2 Account state, authorization and superadmin invariants

- Add `deactivated` as an explicit account status if reversible
  user-requested deactivation is supported. Do not represent it as
  `active`, `restricted`, `suspended`, or `deleted`. Document exactly
  which public data remains visible and what reactivation does.
- Define and test the allowed account-status transition table. Reject
  invalid transitions on the server and, where practical, at the
  database boundary. A client must never be able to set or clear status
  directly.
- A suspension expiry must be evaluated against trusted server time.
  Expiry processing must be idempotent, observable, and safe if a
  background job runs late or twice. A failed expiry job must not leave
  the user in an ambiguous state.
- Enforce the last-active-superadmin rule atomically in a trusted
  transaction or equivalent database-safe operation. A UI-only check is
  insufficient because concurrent role changes can race.
- Prevent ordinary administrators from changing their own privileges,
  bypassing a restriction, or using account-management actions against
  a superadmin unless an explicitly reviewed emergency process allows
  it. Log and alert on all break-glass use.
- Define the first-superadmin bootstrap as a one-time, private,
  documented operational procedure using verified hosting/auth-provider
  ownership or an equivalent secure deployment-time process. Never seed
  a production admin account from public signup, a predictable email,
  a committed secret, or a hidden URL. Disable/revoke bootstrap access
  after setup and test recovery before launch.
- Role revocation and account restrictions must invalidate or re-check
  authorization in active sessions, server actions, APIs, realtime
  subscriptions, background jobs, caches and signed URLs where
  applicable. Document any unavoidable provider-specific delay.

## 29.3 Moderation fairness, blocks and appeals

- Define a versioned community policy with action reason codes and
  examples. Give moderators a decision guide, escalation path and
  conflict-of-interest rules. Review policy changes for consistency.
- A user-level block is not a platform ban. Specify its effects on
  follows, follow requests, comments/replies, mentions, lists, profile
  discovery, messages, notifications and realtime updates. Apply those
  rules on the server and database layer, not only in the interface.
- Decide what happens to pre-existing content and shared conversation
  history after a block. Do not silently erase another person's data.
  Avoid revealing who blocked whom through error messages or public
  endpoints beyond what the product intentionally discloses.
- Add safeguards for report brigading, retaliatory reports, duplicate
  reports and moderator abuse. Report counts alone must not prove a
  violation or automatically trigger a permanent ban.
- Define report evidence access, retention and deletion. Keep only what
  is necessary for review, appeal, safety and legal obligations; tightly
  restrict access and record sensitive evidence access.
- Ensure appeals cannot be reviewed solely by the original decision
  maker when a qualified independent reviewer is available. If staffing
  makes independence impossible, record the exception and rationale.
- Notify users about material enforcement actions, the practical impact,
  duration when applicable, appeal path and outcome, without revealing
  reporter identity or sensitive detection methods.
- Provide a safety escalation workflow for credible threats, imminent
  harm, impersonation, targeted harassment and suspected illegal
  content. The workflow must specify who can act, what evidence can be
  retained, how access is logged, and when qualified legal or emergency
  advice is required.

## 29.4 Age policy, user safety and rights complaints

- Before public launch, decide and publish the minimum-age rule, the
  treatment of younger users, and any parental-consent or age-assurance
  requirements that apply to the chosen markets. Do not collect birth
  dates or identity documents without a defined necessity, retention
  policy and legal review.
- Provide clear reporting paths for harassment, impersonation,
  copyright/IP complaints and other prohibited content. Define a
  documented copyright/takedown workflow appropriate to launch markets,
  including evidence, review, action, appeal/counter-notice where
  applicable, and deadlines. Obtain qualified legal advice rather than
  inventing legal procedures.
- Do not imply that movie posters, backdrops, trailers, logos, cast
  photos or user uploads are free to reuse. Verify rights and provider
  terms for each source and use. User-upload terms must explain the
  rights the user grants the platform and the limits of that grant.
- Publish understandable privacy, terms, community-guideline, account
  deletion and support contact information before opening public
  registration. Have qualified advice review legal requirements for
  each launch market; a template page is not proof of compliance.

## 29.5 Upload and user-generated-content safety

- Keep uploads limited to explicitly supported formats and use
  allowlists. Validate actual file content, size, dimensions and
  authorization; do not trust filename extensions or browser MIME
  values.
- For avatar/image uploads, prefer decoding and re-encoding supported
  raster formats, strip EXIF/location metadata, impose pixel/dimension
  limits and storage quotas, and reject or safely sanitize active formats
  such as SVG unless a reviewed use case requires them.
- Store uploads in private-by-default buckets or paths with explicit
  read policies. Use short-lived signed URLs where appropriate. Test
  cross-user access, replaced files, deleted accounts and stale URLs.
- Define moderation states for uploaded/user-generated content:
  pending/reviewed/visible/hidden/removed as appropriate. A hidden item
  must not remain discoverable through search, feeds, cached pages,
  previews, notifications or direct API responses when policy says it is
  hidden.
- Escape/render user content safely. Do not allow arbitrary HTML or
  executable embeds. Apply length limits, posting rate limits, spam
  controls and safe link handling.
- If external scanning or moderation providers are considered, disclose
  the relevant data sharing, minimize what is sent, assess cost and
  false positives, and keep a human review/appeal path for consequential
  decisions.

## 29.6 Database invariants and audit reliability

- For every table, document its owner, read/write actors, RLS policy,
  foreign keys, uniqueness rules, indexes, retention behaviour and
  deletion/anonymization behaviour.
- Enforce uniqueness for active role assignments without preventing
  legitimate re-grant after revocation. Define whether historical role
  grants are stored as events or as current assignments plus audit
  history; do not let multiple conflicting rows create ambiguous
  effective permissions.
- Add database constraints for rating range/increment, no self-follow,
  no self-block, duplicate watchlist items, duplicate reactions,
  unique provider identity, and valid message participants wherever
  applicable. Validate polymorphic targets safely or use normalized
  relationships that can enforce referential integrity.
- Make critical moderation changes and their audit events atomic where
  feasible. If an audit write fails, a privileged action must not
  silently succeed without its required audit record. Define a safe
  failure/retry strategy and test it.
- Treat application audit logs as append-only for ordinary roles, not
  magically immutable against every database or hosting owner. Restrict
  write/read credentials, alert on suspicious access, and use separately
  protected retention or external logging if the threat model warrants it.
- Define deletion across primary data, object storage, search indexes,
  caches, exports and backups. State which records may be retained for
  safety/legal/audit purposes, why, for how long and under what access
  controls. Do not promise immediate erasure from immutable backups if
  the actual backup lifecycle cannot guarantee it.
- Keep production seed scripts free of default privileged users and
  realistic personal data. Use synthetic development fixtures only.

## 29.7 Rating integrity and recommendation transparency

- Document the score increment, average rounding rule, minimum-count
  display policy and behaviour when ratings are edited, removed or
  anonymized. A score of `0` is valid; missing data is not `0`.
- Rate-limit repeated rating changes and detect suspicious rating
  bursts or coordinated manipulation using proportionate, explainable
  controls. Do not secretly weight or suppress ratings without a
  documented policy and review process.
- Avoid treating account age, popularity, report count or a single
  automated signal as proof of trustworthy/untrustworthy activity.
- Record which data signals are used for recommendations, provide a
  way to reset/disable personalization, and do not use private messages
  or private diary entries for personalization by default.
- Make all recommendation and movie facts traceable to permitted,
  validated catalogue data. Provider outages must not cause invented
  titles, scores, availability or cast information.

## 29.8 Launch gates and measurable quality

Before public launch, explicitly record pass/fail evidence for each gate:
- Movie metadata, poster/backdrop, trailer and attribution permissions
  have been checked for the intended use; unresolved provider licensing
  is a launch blocker.
- Privileged accounts have MFA where supported, secure bootstrap and
  recovery have been tested, and no default production admin exists.
- RLS and authorization tests run against separate test identities and
  cover forbidden reads and writes for every sensitive table and
  privileged route.
- Account deletion/export, suspension expiry, appeals, block semantics,
  audit failure handling and role revocation have been tested.
- Backup restore and incident-response procedures have been rehearsed
  at least once for the chosen launch stage; ownership and escalation
  contacts are documented.
- Privacy, terms, community guidelines, age policy, support route and
  rights-complaint workflow are present and reviewed for the intended
  launch markets.
- Accessibility review targets WCAG 2.2 AA, with critical keyboard,
  screen-reader, contrast, reduced-motion and responsive defects
  addressed or explicitly documented.
- Define numeric performance budgets before release for LCP, INP, CLS,
  server/API latency and image payloads. Measure representative pages
  on throttled networks and a mid-range mobile device; do not use
  subjective claims like “instant” as evidence.
- Maintain a release checklist with owner, evidence link, date, status
  and known exception for each gate. A passing visual review is not a
  substitute for security, licensing or usability evidence.

## 29.9 Historical implementation-order note — superseded by Part 23

**This section is retained only for change-history traceability. It is not an active roadmap and must not be followed as an independent phase sequence.** Part 23 is the single authoritative delivery roadmap. If this historical note conflicts with Part 23, follow Part 23 and update `docs/ROADMAP.md` accordingly. The safety invariant remains active: never enable public user-generated content before its reporting, blocking, abuse-prevention and moderation workflow has passed its gate.

------------------------------------------------------------------------

# CHANGELOG — v5 A-TO-Z REVIEW

- Corrects the current-version metadata; v3 and v4 changelog entries
  remain historical.
- Clarifies deactivation status, safe account transitions, atomic
  last-superadmin protection and one-time privileged-account bootstrap.
- Expands block semantics, moderation fairness, evidence access,
  escalation, age policy and rights/copyright complaint handling.
- Strengthens upload processing, visibility after moderation, database
  invariants, audit-write reliability and deletion across storage layers.
- Clarifies rating integrity, recommendation data boundaries, and
  measurable release gates for security, licensing, accessibility,
  performance, backup recovery and legal/privacy readiness.
- Adds an explicit implementation order to keep the project buildable
  without weakening MVP safety.

This addendum is a specification review, not an implementation, legal
opinion, provider approval, or completed penetration/security audit.



------------------------------------------------------------------------

# PART 30 — V6 FEATURE EXPANSION: STREAMING, BADGES, SHARED LISTS, WARNINGS, PWA AND PRO

This section extends the v5 product specification. These features must
be delivered in phases, with provider permissions, privacy, security,
accessibility, cost and acceptance criteria reviewed before release.
Do not turn a planned feature into a fake working control.

## 30.1 Where to Watch — streaming availability

### Product behaviour

- Add a **Where to Watch** section on movie detail pages. When permitted
  and available, show streaming, rental and purchase options separately.
- Display provider names and approved logos/icons only where their use is
  permitted. Link to the provider's relevant title page when a valid,
  trusted deep link is available.
- Let users choose their region/country so results are not incorrectly
  presented as globally available. Default using a documented region
  choice or a safe locale-derived suggestion; let the user change it.
- Show the region and last-checked/update time when useful. Explain when
  availability is unknown or stale; never present missing provider data
  as proof that a title is unavailable.
- Handle different editions, title matching ambiguity, expired offers,
  provider outages, and titles that are available only to rent or buy.
- Do not promise that a subscription includes a title unless the data
  source explicitly distinguishes subscription from rental/purchase.
- Make this section useful without making sign-in mandatory.

### Provider and licensing rules

- Evaluate TMDb watch-provider data and JustWatch or another licensed
  availability source. Verify current official terms, API access,
  attribution, logo usage, commercial-use restrictions, caching/refresh
  limits, regional coverage and deep-link rules before selecting one.
- Do not assume that an API endpoint exists, that a provider grants
  public/commercial use, or that a third-party integration can be used
  without a separate agreement. Do not scrape a service to bypass its
  restrictions.
- Keep watch availability behind a provider adapter, separate from the
  core movie metadata adapter. Normalize provider, region, offer type,
  deep link, source attribution and last-checked timestamp.
- Cache only as permitted. Use bounded refresh and request limits;
  handle rate limits and outages gracefully. Avoid refreshing the same
  title/region for every visitor.
- If no compliant data source is available, hide the unavailable
  integration or show a clearly labelled, honest unavailable state.
  Never fabricate streaming platforms or availability.
- Do not display provider logos or claim an affiliation without permission.

### Acceptance criteria

- Tests cover region selection, subscription versus rent/buy labels,
  missing/stale data, provider failure, malformed links and permitted
  attribution.
- Movie detail pages remain usable when availability is unavailable.
- No source data is shown in a way that violates the selected provider's
  terms.

## 30.2 Earned badges and gamification

### Product behaviour

Support a small, understandable badge system on user profiles. Initial
badge candidates:
- `100 Movies Watched` — awarded when the verified unique watched-movie
  count reaches the documented threshold.
- `Top Reviewer` — only after defining a transparent, abuse-resistant
  qualification rule; do not use raw review count alone as proof of
  quality.
- `Horror Fanatic` — based on a clearly documented threshold for eligible
  horror titles rated or watched, with the user's relevant activity
  privacy respected.
- Future badges may recognize diary milestones, helpful reviews, or
  sustained participation, but avoid rewarding spam or sheer volume.

### Integrity and privacy

- Define each badge's ID, title, description, icon, eligibility rule,
  calculation window, version, award date and whether it can be revoked
  after data correction or moderation.
- Calculate eligibility from validated database records, not values
  supplied by the browser. Awarding must be idempotent and safe if a
  job runs repeatedly or concurrently.
- Recalculate when qualifying activity is removed, anonymized or found
  fraudulent. Preserve a clear policy for revoked badges.
- Do not grant badges for purchased activity, spam, harassment, mass
  duplicate posts or coordinated rating manipulation.
- Do not expose private diary entries or hidden ratings merely to explain
  a badge. Show a short public explanation that does not reveal private
  activity.
- Avoid endless notifications or competitive rankings by default.
  Provide accessible labels and text alternatives for badge icons.
- Do not launch leaderboards until privacy, anti-abuse and ranking rules
  have been reviewed.

### Acceptance criteria

- Boundary tests cover one below, exactly at and one above each
  threshold; duplicate events; deleted/anonymized activity; concurrent
  processing; and revoked or recalculated badges.
- The profile shows earned badges from real records only. Unimplemented
  badge designs must not appear as already earned.

## 30.3 Collaborative lists and shared watchlists

### Product behaviour

Allow a user to create a collaborative list such as
“Weekend Movie Marathon with Friends,” invite other users, and work
together on the same list.

Define separate list concepts:
- **Personal watchlist:** private to its owner by default.
- **Public list:** visible according to its public visibility setting.
- **Collaborative list:** has an owner and explicitly authorized members.
  Membership does not automatically make a private personal watchlist
  shared.

Initial collaborative-list features:
- Create, rename, describe and archive a shared list.
- Invite by username or a safe in-app invitation flow; accept or decline.
- Assign owner/editor/viewer capabilities, with least privilege.
- Add/remove movies, reorder entries and prevent duplicate entries.
- Show who added an item and when, subject to the privacy policy.
- Leave a shared list; owner can remove members and transfer ownership
  through a protected flow.
- Report a shared list or abusive item and apply moderation controls.
- Provide clear loading, empty, permission-denied, conflict and retry
  states. Real-time updates are optional until authorization and
  consistency have been tested.

### Security and data integrity

- Enforce list membership and role permissions in server logic and
  database RLS for every read and write. Guessing a list ID must not
  grant access.
- Validate invitees, membership changes, list visibility and target IDs
  server-side. Rate-limit invitations to prevent spam.
- Only the owner or explicitly permitted editor can mutate list entries.
  Viewers cannot add, reorder or remove items.
- Prevent unauthorized owner changes and define what happens when the
  owner deactivates or deletes their account.
- Blocking must have a documented effect on invitations and membership;
  do not silently expose private lists through notifications, previews,
  search, activity feeds or stale cached pages.
- Use transactions/constraints for membership uniqueness and duplicate
  list entries. If concurrent edits can conflict, explain the outcome
  and avoid silently overwriting another user's change.
- Keep an audit/activity history limited to what is useful and disclosed.
  Do not expose private member data.

### Acceptance criteria

- Tests cover owner/editor/viewer permissions, invite abuse, revoked
  membership, deleted accounts, blocked users, guessed IDs, duplicate
  entries, concurrent edits and RLS isolation across separate users.

## 30.4 Rich-text reviews, spoilers and content/trigger warnings

### Review formatting

- Support a deliberately small, safe Markdown subset such as **bold**,
  *italic*, lists and links if those features are approved. Document the
  supported syntax and show a concise formatting hint in the editor.
- Parse and render Markdown through a maintained safe renderer with
  raw HTML disabled or safely sanitized. Validate on the server and
  enforce review length and link policies. Never inject raw user HTML.
- Provide a readable preview and preserve draft text after recoverable
  failures. Make formatting controls keyboard-accessible.
- Retain the existing spoiler flag. Spoiler text must remain concealed
  until the reader explicitly reveals it, including in previews and
  notification snippets where relevant.

### Spoiler protection across every surface

- A spoiler flag is a content-visibility rule, not merely a formatting hint. Spoiler-marked review/comment text must remain blurred or completely hidden behind an explicit **“Show spoiler”** action in activity feeds, profile activity, list descriptions, comments, notification previews, search snippets and share-card text.
- **Never leak spoiler text through truncation.** Do not truncate the raw spoiler body and then display the beginning of it; decide spoiler visibility before rendering, preview generation, summarization or truncation.
- For server-rendered HTML, metadata, push/email notifications and social preview images, omit spoiler text entirely by default. A client-side blur alone is insufficient if the spoiler is present in page source, metadata or notification payloads.
- Keep the spoiler warning visible even when a user has not expanded the content. Reveal only after a deliberate user action; do not auto-reveal on hover, focus, route change or notification open.
- Add tests for spoilers in long text, truncated previews, feeds, list descriptions, comments, notifications, search results and Open Graph cards.

### Content warnings

- Allow a review author to select from a controlled, documented list of
  warning labels, such as violence, gore, flashing lights and other
  categories approved by the product policy.
- Use the label **Content warning** in general UI copy. “Trigger warning”
  may be offered as a familiar category term, but do not claim a warning
  can predict or prevent every individual's distress.
- Warnings must be optional, specific and separate from the spoiler flag:
  a warning describes potentially distressing content; a spoiler flag
  describes plot-revealing information.
- Display selected warnings before the affected review content and let
  readers choose whether to continue. Do not hide essential warning
  labels behind hover or inaccessible colour alone.
- Do not automatically infer or publicly attach sensitive warning labels
  to a user or review without a clear, reviewed process. Users must be
  able to edit their own warning selections.
- Define moderation handling for abusive/misleading labels and provide a
  report route. Keep the warning vocabulary maintainable and localized.

### Acceptance criteria

- Tests cover safe Markdown rendering, script/HTML injection, dangerous
  links, spoilers in previews, multiple warnings, no-warning reviews,
  keyboard operation, screen-reader labels, and edit/delete behaviour.

## 30.5 Progressive Web App (PWA) and offline behaviour

### Web Push Notifications (opt-in PWA enhancement)

- Support browser Web Push for installed/eligible PWAs where browser, OS and deployment support it; it is not guaranteed on every device and is not identical to native-app push.
- Ask for notification permission only after a clear, user-initiated explanation. Never prompt on first page load or repeatedly after denial.
- Register/version the service worker; securely create, rotate, revoke and delete per-device push subscriptions. Keep VAPID/private keys server-side and protect subscription endpoint/key material.
- Respect `notification_preferences`, event categories, user opt-out, browser permission state, quiet-hour rules if offered, and block/privacy rules.
- Use server-side delivery with idempotency/deduplication, bounded retries, expiry handling, invalid-subscription cleanup and privacy-safe delivery telemetry.
- Push payloads must be minimal: do not include private message bodies, sensitive moderation details or spoiler text by default. Open the relevant authenticated page to view details.
- Push clicks must navigate only to validated internal routes, handle expired sessions safely and never trust arbitrary URLs supplied by notification data.
- Provide states for unsupported browser, permission denied, enabled, disabled, subscription failure and revoked subscription. In-app notifications remain independently available.
- Test permission denial, subscription revocation, duplicate events, expired endpoints, offline/device states, privacy settings, spoiler filtering, click-through routing and supported mobile/desktop browsers.
- Treat Web Push as a later, separately measured feature. Do not claim a “10x” retention improvement or any other impact without analytics evidence.



### Product behaviour

- Make the responsive web application installable as a PWA where the
  target browser and operating system support installation.
- Add a valid web app manifest with app name/short name, icons, theme
  colours, display mode, start URL and scope. Use the provisional brand
  configuration so the name can be changed later.
- Register a service worker using a maintained, compatible approach
  verified against current framework guidance. Avoid adding a service
  worker that conflicts with the hosting platform's routing or caching.
- Provide an offline fallback page that explains the connection is
  unavailable and offers a retry. Cache only the minimal static assets
  and public resources needed for the experience.
- Show install guidance only where appropriate; installation prompts
  differ by browser/platform and must not be falsely promised.
- Provide update handling that avoids trapping users on a broken old
  version or unexpectedly discarding unsaved work.

### Security and privacy

- Do not cache authenticated HTML, private profiles, private lists,
  private messages, admin pages, moderation records, or sensitive API
  responses in a shared or persistent cache by default.
- Do not make private data available offline unless a separately reviewed
  feature defines encryption, device-sharing risk, expiry, logout and
  account-revocation behaviour.
- Ensure logout and account restriction cannot leave sensitive data
  exposed through the service worker cache. Clear appropriate local
  state when the account changes or signs out.
- Define cache versioning, stale-data policy, service-worker update and
  recovery behaviour. Avoid caching privileged API responses.
- Offline interactions that cannot be safely synchronized should be
  read-only with clear messaging; do not pretend a rating/review/message
  has been saved when it has not reached the server.
- Test installation and offline behaviour on supported target browsers.
  Document browser-specific limitations.

### Acceptance criteria

- Verify manifest/icons, service-worker registration, offline fallback,
  cache version upgrade, logout, account switching, stale cache removal,
  reduced-motion/accessibility and normal browser navigation.
- Measure that PWA support does not materially regress initial load or
  runtime performance.

## 30.6 Future monetization and Movicin Pro placeholder

### Product decision and scope

- Prepare a future subscription/entitlement model without implementing
  payment collection now. Existing v5 rule remains in force: no payment
  functionality until the owner explicitly approves it.
- Treat **Movicin Pro** as a provisional plan label, not a final pricing,
  brand, or business decision. Keep the plan name and feature descriptions
  centrally configurable and renameable.
- Candidate future benefits may include custom profile themes, advanced
  personal statistics and an ad-free experience if ads are ever added.
  These are proposals, not promises or committed benefits.
- Do not paywall core safety, accessibility, account deletion/export,
  privacy controls, basic ratings, or essential platform functions.
- Do not add ads or claim “ad-free” as a benefit until an ad-supported
  product actually exists.

### Entitlement-ready architecture

- Model plans and entitlements separately from UI labels. Use a central
  server-side entitlement check such as `canUseFeature(user, feature)`;
  never trust a client-supplied `isPro` boolean.
- A future data model may include plan definitions, feature entitlements,
  user subscriptions/status, provider customer/subscription references,
  billing events and entitlement history. Add these only when a real
  billing provider and launch scope are approved.
- Define free, trial, active, past-due, canceled, expired and refunded
  states only when the chosen provider's billing model requires them.
  Verify signed webhooks, make webhook processing idempotent, and never
  grant paid access from a browser redirect alone.
- Keep billing-provider identifiers and secret credentials server-side.
  Avoid storing raw payment-card data; use a qualified payment provider
  and its hosted/tokenized flow if payments are approved later.
- Do not invent prices, trial terms, tax treatment, refund rules or
  recurring billing consent. These require an explicit product and
  legal/business decision.
- Add no fake upgrade buttons or nonfunctional billing pages. Until
  approved, omit them or label the feature as planned in internal docs
  only.

### Acceptance criteria

- Core application works correctly when no plan/entitlement record
  exists and defaults safely to the free capability set.
- Tests cover forged client entitlement, revoked/expired entitlement,
  stale cache, duplicate provider webhook events and access checks on
  the server. Payment tests are required only when payment integration
  is explicitly approved.

## 30.7 Suggested data model additions

Adapt these names to the reviewed schema and chosen provider. Add
constraints, indexes, ownership rules, RLS policies, retention and
deletion behaviour before implementation.

- `watch_offers` or a provider-normalized availability cache: canonical
  `title_id`, provider/source ID, region, offer type, deep link,
  attribution/source, last checked, expiry/refresh metadata where
  permitted. Store only the data and duration allowed by the provider.
- `badge_definitions`: stable badge key, localized description key,
  rule/version metadata and active state.
- `user_badges`: user ID, badge key/version, awarded/revoked timestamps,
  and an auditable reason/reference where appropriate; unique constraint
  prevents duplicate awards for the same badge version.
- **Do not create separate `collaborative_lists` or
  `collaborative_list_items` tables by default.** Use the canonical
  `lists`, `list_items` and `list_members` model defined in Part 16.
  Keep collaboration-specific fields (invitation state, role, inviter,
  archive state) in `list_members` or a narrowly scoped invitation table
  if the reviewed schema requires them. List items use `title_id` so
  both movies and TV series are supported.
- Review warning associations: review ID and controlled warning key,
  with constraints to prevent duplicate warning labels.
- PWA caches are client runtime data, not a reason to store private
  offline data in the server database.
- Future `plans`, `entitlements`, `subscriptions` and `billing_events`
  tables are deferred until monetization is approved.

Do not store redundant derived values without a defined consistency
strategy. Derived badge counts and plan access must remain correct when
underlying activity, memberships or entitlements change.

## 30.8 Delivery priority and release gates

Recommended order:
1. **Streaming availability investigation first:** confirm licensed data
   access, attribution, region coverage, commercial permission and cost.
   If the source is not approved, do not build a public feature that
   depends on it.
2. **Review safety improvements:** safe Markdown subset, spoiler handling
   and optional content warnings; add injection and accessibility tests.
3. **Collaborative lists:** implement membership/RLS and invitation
   security before realtime polish.
4. **Badges:** begin with a small set of deterministic, explainable
   milestones; add advanced rankings only after anti-abuse review.
5. **PWA:** installability, safe static caching and offline fallback;
   never cache private pages by default.
6. **Pro readiness:** document entitlement boundaries now, but defer
   payment integration, billing UI and paid benefit enforcement until
   the owner approves a real business plan.

Each feature is complete only when its UI, server/database enforcement,
failure states, privacy rules, tests, documentation and measured results
are in place. This section does not authorize shipping all six features
in the initial MVP.

------------------------------------------------------------------------

# CHANGELOG — v6 FEATURE EXPANSION

- Adds a Where to Watch product flow with explicit provider licensing,
  regional availability, offer-type and stale-data rules.
- Adds earned badge definitions and anti-abuse/recalculation requirements.
- Adds collaborative lists with owner/editor/viewer permissions and
  membership security.
- Adds safe Markdown review formatting and optional content warnings,
  separate from spoiler handling.
- Adds PWA installability and offline fallback while protecting private
  and privileged data from unsafe caching.
- Adds a deferred Movicin Pro entitlement architecture without enabling
  payments or promising unapproved benefits.
- Adds suggested schema entities, acceptance tests and phased release
  priorities for all six features.

This is a specification expansion only. It does not establish API
licensing, create an application, enable billing, or prove that these
features have been implemented or security-tested.

------------------------------------------------------------------------

# PART 31 — V7: GOOGLE SIGN-IN, CINEMATIC UX, MOVIE/PERSON PAGES AND DATA SOURCES

This section records the v7-era requirements and is retained for traceability; the current consolidated instructions and phase order are governed by the main sections and Part 23. It does not authorize copying Cinejoy or any
other site's branding, layout, code, assets, or distinctive visual
identity. The goal is to understand useful experience patterns and build
an original, premium, fast, accessible product.

## 31.1 Google sign-up and sign-in

Google sign-in is a first-class authentication option on both registration
and login screens.

### UX
- Show a clearly labelled **Continue with Google** button on `/signup`
  and `/login`, alongside the existing email/password path.
- Keep the official provider identity and required button-branding rules;
  do not create a misleading imitation Google button.
- After successful first-time Google authentication, create or complete
  the Movicin profile using only the permitted identity fields. Ask the
  user to choose a unique username if one is not already available.
- Existing Google users should return to their existing account.
- Create/update the local profile idempotently after OAuth; handle username conflicts and recoverable partial provisioning without duplicate profiles or orphaned identities.
- Keep onboarding skippable and do not require Google sign-in to browse
  public movies.
- Show loading, cancellation, provider failure, duplicate-account and
  retry states. Never silently create duplicate app accounts for the
  same verified identity.
- Preserve a safe internal return path. Validate redirect destinations
  against relative paths or an explicit allowlist; never accept arbitrary
  external `next` URLs.
- One Tap is optional, not a requirement. Start with the standard button;
  add One Tap only after privacy, browser compatibility and UX testing.

### Implementation and security
- Use Supabase Auth's supported Google provider flow with the current
  Next.js SSR/cookie approach and PKCE callback exchange where applicable.
- Configure Google Cloud OAuth consent/branding, web client credentials,
  allowed origins, and the exact Supabase callback URL for development,
  preview and production. Keep the Google client secret server-side.
- Keep secrets out of `NEXT_PUBLIC_*`, logs and source control.
- Validate the callback/session server-side. Use the provider's stable
  subject/identity identifier rather than email as the sole permanent
  identity key.
- Do not automatically merge accounts based only on an unverified or
  matching email. Use the auth provider's supported identity-linking
  flow and require an authenticated, explicit action when linking.
- Keep role assignment, moderation status, profile visibility and
  entitlements server-controlled; Google sign-in must not bypass any
  existing authorization or account-status rule.
- Add end-to-end tests for first-time signup, returning login, cancel,
  invalid callback, redirect allowlist, duplicate identity, disabled/
  suspended account, logout and session refresh.

### Acceptance criteria
- Both signup and login offer Google and email/password choices.
- OAuth callback works in local, preview and production configurations.
- No open redirect, duplicate-account path, client-trusted role, or
  secret exposure is found in the reviewed flow.
- Email/password remains available unless a separate product decision
  explicitly changes it.

## 31.2 Visual reference review: Cinejoy

Reference URL supplied by the owner: https://cinejoy.pk/

- Inspect the live site manually in a real browser when available. Review
  first-load impression, typography, poster scale, whitespace, navigation,
  hover/focus behaviour, transitions, loading, route changes, mobile
  scrolling, reduced-motion behaviour and Core Web Vitals.
- Record the date, browser/device/viewport, what was directly observed,
  and what could not be inspected in `docs/REFERENCE_REVIEW.md`.
- A crawler returning no useful page content is not evidence that the
  website has no features or animations. If automated inspection cannot
  see the page, record that limitation and do not invent observations.
- Take inspiration from general qualities such as pacing, clarity,
  consistency and cinematic presentation. Do not copy its code, source
  assets, wording, brand, exact composition or distinctive design.
- Translate observations into measurable hypotheses and test them on
  Movicin rather than declaring one site objectively superior.

## 31.3 Animation and smooth scrolling decision

### Existing stack remains the default
- Tailwind CSS is for styling and responsive layout; it is not an
  animation engine and does not by itself create a premium motion system.
- CSS transitions/native browser APIs handle simple hover, focus, opacity
  and transform changes.
- Motion for React remains the default for React UI transitions,
  gestures, layout changes and restrained reveal effects.
- GSAP is optional and should be loaded only for a specific complex
  cinematic timeline or coordinated scroll sequence that cannot be
  expressed cleanly with CSS/Motion.
- Never make Motion and GSAP animate the same property on the same
  element at the same time.
- Do not add a second smooth-scroll library. Lenis, if adopted, is the
  only custom smooth-scroll layer.

### Lenis: conditional, measured adoption
Evaluate the current stable Lenis release for desktop wheel scrolling,
but do not assume it is automatically faster, more accessible or better
than native scrolling.

- Prototype Lenis behind a small, isolated client-side provider.
- Enable it only for fine-pointer, non-touch desktop environments after
  feature detection; keep native browser scrolling on touch/mobile and
  fall back to native scrolling if initialization fails.
- Respect `prefers-reduced-motion` both at initial load and when the
  preference changes. When reduction is requested, disable smoothing and
  make programmatic scrolls immediate.
- Do not enable touch-sync/inertial scrolling by default. Native touch
  scrolling should remain native.
- Keep keyboard, anchors, browser back/forward, focus movement, sticky
  headers, nested scroll containers, dialogs, text selection, browser
  zoom, find-in-page and scroll restoration working.
- Integrate with GSAP ScrollTrigger only if GSAP is actually used and
  only through the documented integration. Avoid duplicate RAF loops.
- Clean up listeners, observers and animation frames on unmount.
- Do not globally intercept scroll in ways that break modals, code blocks,
  menus, or other nested scroll areas.
- Compare native scrolling vs Lenis on representative mid-range laptops,
  trackpads and browsers. Check scroll latency, dropped frames, CPU,
  battery impact, focus/anchor behaviour and user preference.
- Ship Lenis only if usability testing shows a clear improvement without
  regressions. If the difference is subjective, inconsistent or negative,
  remove it. Native scrolling is the correct fallback, not a failure.

### Premium feel without unnecessary weight
- Use short, consistent transition timings and easing tokens.
- Prefer `transform` and `opacity`; avoid animating layout dimensions,
  giant shadows, heavy backdrop blur or large full-screen filters.
- Keep the first viewport useful immediately. Do not make users wait for
  a hero intro, page transition or scroll reveal before clicking.
- Use modest card hover lift/scale only for pointer devices; controls
  must remain available to touch and keyboard users.
- Use skeletons only where they reduce uncertainty; preserve image and
  text geometry to prevent layout shifts.
- Use route-level loading states and progressive rendering instead of
  masking slow API calls with animation.
- Respect reduced motion across page transitions, carousels, parallax,
  animated counters, shared-element transitions and Lenis.
- Load optional animation code only on pages that need it. Avoid large
  autoplaying video backgrounds and continuously animating decorative
  elements.
- Test with CPU/network throttling and real mid-range mobile hardware.
  Measure Core Web Vitals; do not claim smoothness based on appearance
  alone.

## 31.4 Movie and TV show detail pages

Every movie and TV show should have a useful, shareable detail route,
using canonical routes `/movie/[slug]` and `/tv/[slug]`; person profiles use `/person/[slug]`. Resolve each slug to a stable internal/provider ID, handle collisions deterministically, and redirect legacy ID URLs to the canonical URL when safe. Visitors may
read these pages without signing in.

### Information hierarchy
1. Title, original title where relevant, poster/backdrop, release year
   or first-air year, content type, genres, runtime/episode information
   when available, and release/status metadata.
2. A concise synopsis/overview, with localization/original-language
   handling and no invented facts.
3. Clearly separated scores: Movicin community score/count, external
   provider score/source, and popularity/trending signals. Missing data
   must not display as zero.
4. Primary actions: rate, add/remove watchlist, mark watched, and write
   a review (authenticated actions only).
5. Main cast, director(s), writer(s), producer(s), cinematographer,
   editor, composer and other notable crew where the data source provides
   them. Show roles clearly; do not imply every title has every role.
6. Production companies/studios, production countries, original language,
   release dates, runtime, official trailer/media only when available
   and legitimately embeddable.
7. Where to Watch, only where a permitted, current-enough source supports
   the region and offer type.
8. Box-office/financial information for theatrical movies only when
   reliable fields exist; see section 31.7.
9. Reviews/discussion, related titles, recommendations and relevant
   collections lower on the page.

### UX and performance
- Use a clear top-level summary, then grouped sections/tabs or anchored
  navigation for Credits, Details, Where to Watch, Box Office and Reviews.
  Do not bury the synopsis or core actions below an oversized hero.
- On mobile, prioritize title, synopsis and core actions; avoid sticky
  panels that cover content.
- Load the first meaningful details server-side where appropriate.
  Defer below-the-fold credits, recommendations and secondary imagery
  until useful; avoid a separate API call per cast member.
- Use stable image dimensions, responsive image sizes, lazy loading below
  the fold and a clear missing-image fallback.
- Use pagination or a deliberate “show more” control for very long cast
  lists. Avoid downloading a huge crew payload when only the top credits
  are initially displayed.
- Provide loading, missing-data, provider-error and retry states. Keep
  movie pages readable if a provider is unavailable.
- Use canonical URLs, accurate metadata and structured data only when
  the data is accurate and the provider/license permits it.

### Trailer and teaser media performance

- Use a **facade / Lite YouTube Embed pattern** for YouTube trailers and teasers. Before explicit user interaction, render only a responsive thumbnail/poster, accessible play button and any lightweight required metadata; do not create the YouTube iframe or load its player scripts yet.
- Load the real embed only after the user activates Play. Use a click-to-load component or an equivalent tested implementation; do not use a decorative/fake play control that fails to play.
- Provide a meaningful accessible label, keyboard operation, focus visibility, consent/privacy behaviour where applicable, and a fallback link to the official trailer if embedding fails or is blocked.
- Respect autoplay restrictions, reduced-motion preferences and mobile data/performance. Avoid loading multiple trailer iframes in a list or carousel.
- Use only official/legitimately embeddable media and follow provider/platform terms. Do not download, proxy or re-host copyrighted trailers without permission.
- Test initial page load with no iframe present, activation-to-play behaviour, layout stability and mobile performance.

## 31.5 Clickable cast and crew profiles

Each cast/crew member should link to a public `/person/[slug]`
profile when a stable provider person record is available.

### Person profile content
- Name, profile image when available, known-for/departments, biography
  when provided, birthday/death date only when provided and appropriate,
  place of birth when available, and other factual metadata from the
  selected source.
- A “Known for” section followed by credits grouped by movies and TV.
- Credit cards should show poster, title, release/air year, content type
  and the person's role (actor/character or crew job/department).
- Sort credits by popularity or date only with a clear, documented rule;
  offer a useful alternate sort where appropriate. Do not show duplicate
  credits because the same title appears in multiple departments.
- Clicking a title opens its movie or TV detail page. Clicking a person
  anywhere should resolve to the same canonical person route.
- Support empty biographies, missing portraits, name collisions and
  provider records that no longer exist.
- Do not infer relationships between people based on similar names.
  Disambiguate people using stable provider IDs and available metadata.
- Keep the page public and SEO-friendly without exposing private Movicin
  user data.

### Efficient loading
- Fetch person details and combined credits through the server-side
  provider adapter. Avoid making one network request per displayed
  credit/person.
- Render a sensible first page and progressively load more credits.
  Do not load every image and every credit at initial page load.
- Cache provider data only within the provider's current terms.
- Preserve internal IDs/mappings so a future provider change does not
  break links from reviews, lists or existing records.

## 31.6 Movie metadata provider strategy — verify access before building

There is no single API that can be assumed to provide every movie/show
fact, cast/crew, images, accurate box office, streaming availability and
unrestricted commercial rights for free. “Free API key” and “permission
for public/commercial use” are different questions.

### Primary candidate: TMDb
TMDb is the strongest initial technical candidate for broad movie, TV,
cast/crew, person and image metadata because its documented API includes
title details, credits, person details, combined credits, release dates
and watch-provider endpoints. However:

- TMDb's official FAQ says its API is free for non-commercial use with
  attribution; commercial projects must contact TMDb about licensing.
- A public launch, advertising, subscriptions, paid benefits or other
  revenue-oriented use may affect whether the intended project is
  considered commercial. Obtain a decision/permission before relying on
  TMDb for that use.
- Follow the current attribution and logo rules, including the required
  notice in an appropriate About/Credits area. Re-check official terms
  before release because rules can change.
- Watch-provider results are powered by a JustWatch partnership.
  Follow the explicit JustWatch attribution requirement and provider
  endpoint rules. Do not assume the API returns direct links to each
  streaming service; it may return a TMDb title URL instead.
- Do not assume unrestricted image storage, bulk catalogue copying,
  cache duration, scraping, AI/embedding use or redistribution. Verify
  each relevant rule.
- Keep the provider behind a server-only adapter so the application can
  replace it if licensing, quality, pricing or coverage changes.

### Other sources and fallbacks
- OMDb: potentially useful as a supplementary source for selected fields,
  but it requires an API key and has its own request limits, terms and
  coverage. Verify the current plan, rights, attribution and commercial
  permissions before using it; do not treat it as a guaranteed free,
  unrestricted fallback.
- Wikidata: potentially useful for selected factual identifiers and
  cross-links, subject to its licensing, data-quality and sourcing
  requirements. It is not a complete replacement for rich credits,
  current streaming availability, images or box-office reporting.
- TVmaze or other TV-focused APIs may supplement television metadata
  only after checking current API terms, attribution, rate limits and
  suitability for the exact use. Do not mix providers silently or imply
  equal coverage.
- IMDb downloadable datasets, web pages, Box Office Mojo, The Numbers,
  studio announcements and news sources must not be scraped or reused
  simply because they are publicly visible. Verify their terms and
  rights independently before using them.
- Never scrape a site to bypass API access restrictions.
- If a field is not available from a permitted source, omit it or label
  it unavailable. Do not manufacture a value from an LLM or a guess.

### Provider adapter contract
Use separate, typed server-only interfaces where appropriate:
- Movie/TV metadata: search, title details, release dates, credits,
  genres, images, similar titles and external identifiers.
- Person metadata: details, movie credits, TV credits and combined
  credits.
- Watch availability: title, region, provider, offer type, source,
  permitted link, last-checked time and attribution.
- Financial/box-office facts: amount, currency, geography, period,
  whether it is budget/gross/other, source and retrieval date.

Normalize provider responses at the boundary. Validate IDs and URLs,
handle missing fields, timeouts, rate limits, partial responses and
provider outages. Do not expose private API keys to the browser.

## 31.7 Box office, budget and hit/flop reporting

This section is for theatrical movies. Do not force a box-office section
onto a TV series, streaming-first movie or title with no reliable data.

### Display when data is available
- Worldwide theatrical gross, if the source clearly identifies it.
- Domestic/regional gross only when the territory and currency are
  explicit (for example, India gross or US/Canada gross).
- Production budget, if a reliable source provides it.
- Original theatrical release date and release territory when relevant.
- Source/attribution and a small note that reported figures can be
  incomplete, revised or vary by source.
- Currency and units must be explicit. Never silently mix INR, USD,
  nominal values, inflation-adjusted figures, gross collections,
  distributor share, net collections or box-office revenue.

### Hit/flop label policy
- Do not use “hit”, “superhit”, “blockbuster”, “average” or “flop” as an
  official fact unless a named, credible source explicitly reports that
  classification and the source is permitted for reuse.
- Revenue minus production budget is not the same as studio profit:
  marketing, distribution, exhibitor shares, taxes, financing and other
  costs are not fully captured by a simple comparison.
- If Movicin later offers an internal estimate, label it prominently as
  **Movicin estimate**, explain the method and territory, and do not
  present it as a universal industry verdict. Prefer not to create such
  a label for MVP.
- If budget or gross is missing, zero, uncertain, or contradictory,
  display “Not reliably available” rather than infer a verdict.
- Do not infer that a streaming-first movie was a theatrical flop
  because it lacks box-office numbers. Streaming viewership/revenue
  generally cannot be compared fairly without a source and methodology.
- TV shows should show relevant facts such as seasons, episodes, status,
  first/last air dates and networks/platforms only where available and
  permitted, not theatrical hit/flop labels.

### Acceptance criteria
- Financial fields have source, geography, currency and data-quality
  semantics.
- Missing values do not become zero or trigger a hit/flop badge.
- A user can distinguish provider data from Movicin community data.
- Unit tests cover absent, conflicting and regionally ambiguous values.

## 31.8 Schema and implementation guidance

Use existing normalized movie/person/provider models where possible.
Do not duplicate a separate database row for every role/person/title
relationship if a normalized credit model is appropriate.

Suggested conceptual records (adapt after inspecting the actual schema):
- `external_title_ids`: internal title ID, provider name, provider ID,
  content type, mapping confidence and timestamps.
- `external_person_ids`: internal person ID, provider name and provider ID.
- `title_credits`: title ID, person ID, credit type, department, job,
  character, billing/order and source; enforce suitable duplicate rules.
- `title_financial_facts`: title ID, fact type, amount, currency, territory,
  source, source URL/reference, reported date, fetched time and confidence/
  notes where permitted.
- `provider_fetch_metadata`: provider, record ID, fetched time, expiry/
  refresh policy and last error. Do not persist raw payloads unless
  permitted and genuinely needed.
- Store community ratings/reviews separately from provider scores and
  external facts.

Do not add all suggested tables automatically. Start with the smallest
schema that supports the agreed MVP, and document migrations and
integrity constraints.

## 31.9 Delivery source of truth

**Part 23 is the single canonical delivery roadmap.** This section is not a second roadmap and must not redefine phase order. The acceptance requirements in Part 31 apply when their relevant feature is reached in Part 23. Provider licensing/permission must be verified before public use of provider data. Do not claim a provider is licensed, an API is free for commercial use, a page is performant, or a reference site has been fully inspected unless that specific fact has been verified.

------------------------------------------------------------------------

# PART 32 — V10 FEATURE EXPANSION: EPISODES, STRICT SPOILER MODE, EDITORIAL AND INTEGRATIONS

This part adds requirements and acceptance criteria. **Part 23 remains the only authoritative delivery roadmap.** The features below are not a request to build everything at once. Treat each as a separately scoped vertical slice with a product decision, dependency/licensing review, schema plan, tests, and rollback strategy. V10 supersedes older statements wherever this part and v9/v9.1 conflict.

## 32.1 High-priority future feature: TV season/episode tracking

Title-level TV tracking remains the initial core release. Episode/season tracking is the **first high-priority post-core product expansion** in Part 23 Phase 6; do not silently pull it into the initial MVP and do not leave it indefinitely unspecified.

### User experience
- On a TV series page, show seasons and their episodes where reliable, permitted metadata exists. Provide a clear progress summary such as watched episodes / known episodes, while explaining when special episodes or provider coverage make the denominator incomplete.
- Let an authenticated user mark an individual episode watched/unwatched, record a viewing date if useful, and optionally record rewatches without duplicate accidental taps. Provide undo/correction.
- Provide “Mark season watched” and similar bulk actions only with clear consequences, confirmation for destructive/bulk changes, idempotent writes, and the ability to correct individual episode states afterward.
- Show the next unwatched episode only when the ordering and episode list are sufficiently reliable. Handle specials, season 0, split/numbering differences, unknown episode numbers, unaired episodes, delayed/cancelled episodes, and region-specific schedules without inventing a next episode.
- Keep “series watched”, “season complete”, and “all currently known episodes watched” as distinct concepts. Define whether title-level watched state is user-entered or derived and never overwrite explicit user intent with a silent inferred value.
- The user must be able to keep a TV series in the watchlist while tracking episode progress. Rating/review state remains separate from progress.
- Support private-by-default viewing progress. Publicly sharing a progress update must obey profile/privacy preferences and spoiler safeguards.

### Suggested normalized data model (adapt after schema review)
- `tv_seasons`: canonical title ID, provider/source identifiers, season number or source-defined ordering, name, air dates and fetch metadata only where permitted. Handle specials and unknown numbering explicitly rather than using invalid sentinel numbers without a documented rule.
- `tv_episodes`: canonical series/title relation, season relation where known, provider/source IDs, episode number/order fields with their semantics, title, synopsis, still image and air date only if licensed and allowed to store/cache; unique constraints should use the source/provider identity and not assume every provider numbers episodes identically.
- `episode_watch_history`: user ID, canonical episode ID, watched timestamp/date semantics, created/updated timestamps, optional note and event/idempotency key. Use a separate event/history shape if unwatching and rewatching require a durable audit trail; do not overload one boolean if it destroys user history.
- Enforce ownership, foreign keys, appropriate unique constraints and indexes. Keep user-owned episode progress independent from provider refreshes or missing metadata. Do not create a duplicated `tv_progress` source of truth unless it is explicitly an invalidatable derived cache.
- Build a documented migration/compatibility policy for existing title-level watched history. **Never infer which episodes a user saw from a title-level “watched” record.** Preserve the old event and ask the user to choose whether to mark episodes individually or leave episode progress unknown.

### Spoiler/performance requirements
- Future/unwatched episode titles, synopses, stills, guest stars and surprise-cast data must follow Strict Spoiler-Free Mode where source classification is available. When classification is unavailable, do not claim that all spoilers are removed.
- Fetch seasons/episodes lazily or progressively where appropriate; paginate/virtualize exceptionally long episode lists when measured necessary. Episode interactions should update promptly without waiting for decorative animations.
- Accept this feature only after migrations, data-order edge cases, provider outage/cache behaviour, duplicate prevention, RLS tests with separate users, accessibility checks and end-to-end tests pass.

## 32.2 Global Strict Spoiler-Free Mode

Add a global preference such as `strict_spoiler_free_mode`, plus a clear per-title watched/progress basis. The setting should be user-controlled, easy to find, reversible, and consistent across the product. Explain the limits: this is a layered safety feature, not a guarantee that every external image, headline or cameo will be classified correctly.

### Behaviour
- For titles the user has not marked watched, prioritize synopsis-free cards or spoiler-safe short summaries; collapse spoiler-flagged reviews/comments/list descriptions, hide known spoiler-tagged images/stills, and suppress known surprise/guest-cast/cameo credits from the default view. The main cast may be shown only where the product has a reasonable basis to consider it non-spoiling; let users choose a more restrictive setting.
- For TV, determine watched/unwatched at episode level once that capability ships. Protect future/unwatched episode names, synopses, thumbnails and guest-cast details. Until episode-level progress exists, use conservative series-level behaviour and clearly state its limitations rather than pretending to know the user's episode position.
- Support spoiler metadata such as `contains_spoilers`, `spoiler_scope` (title/season/episode/ending/cameo where appropriate), `spoiler_level`, source/provenance and review/moderation status. Do not trust client-provided tags alone for privileged classification.
- Apply filtering **before** truncation, summarization, notification generation, search snippet generation, server-rendered metadata, JSON-LD, Open Graph images, copied share text and Wrapped cards. Spoiler text must not leak through alt text, accessible labels, hidden DOM content, tooltips, preload data or notification previews.
- A placeholder can say “Potential spoiler hidden” and offer an intentional reveal action. Reveal must be explicit, keyboard/touch accessible, and scoped clearly to one item or session based on the user's choice. Do not reveal merely on hover or keyboard focus. Explain whether a reveal persists.
- Provide a user override for a specific title or item, but make the override explicit and do not silently disable the global setting. Provide a “report spoiler” action so incorrect/missing labels can be corrected.
- External links, autoplay, user-generated forum posts, images and unstructured news headlines may escape automated detection. Use source labels/moderation, warning placeholders, and transparent limitations; never claim perfect detection.

### Acceptance criteria
- Automated tests cover every listed surface, including SSR/SEO/social previews, cached responses, notifications and share exports.
- A user who has not watched a movie does not receive a spoiler-bearing still or known cameo credit in a default strict-mode response where the app has classified it as a spoiler.
- Strict mode works identically in light/dark themes, keyboard/touch, locale variants and reduced-motion mode.
- Disabling/re-enabling the preference, changing watched state, deleting content, or revoking a share does not leave stale unprotected data in shared caches.

## 32.3 Trivia, goofs, awards and soundtrack information

Treat these as optional, sourced cinephile enrichment sections, not fields that must be fabricated for every title. Each section can be unavailable, empty or omitted when data rights/quality are insufficient.

### Trivia and goofs
- Prefer a licensed metadata source or original community/editor submissions with source notes, clear contributor rights, moderation, abuse reporting, correction/removal workflow, and provenance timestamps.
- Require spoiler classification and source/claim notes. A goof may itself reveal a plot point; apply Strict Spoiler-Free Mode before truncation, notification, search and social sharing.
- Do not scrape IMDb or other databases to populate a public product. IMDb's official reuse guidance restricts its downloadable datasets to specific non-commercial conditions and disallows scraping; verify current terms and obtain permission for any other usage. Reference: https://help.imdb.com/article/imdb/general-information/can-i-use-imdb-data-in-my-software/G5JTRESSHJBBHTGX
- For community submissions, provide “suggest a correction”, report, moderator review and a way to retract/correct a mistaken claim. Distinguish a sourced factual note from opinion or interpretation.

### Awards
- Support award body/name, ceremony/edition/year, category, nominee/work, winner/nominee status, source, geographic/context notes and source update date where permitted.
- Do not invent nominations/wins from title popularity, and do not display a trophy or “award-winning” badge without a specific verified fact. Handle ties, renamed categories, multiple ceremonies and conflicting reports.
- Use a licensed source or curated record whose rights allow display. Attribute according to the source's conditions; include an uncertainty/unavailable state.

### Soundtracks and Spotify link-outs
- Display official soundtrack/score album information, track titles/artists and licensed cover art only where a legitimate source permits the display. Prefer official label, artist, composer or rights-holder pages where reliable.
- A Spotify API integration is **not assumed approved or commercially available**. Before building it, read the current Spotify Developer Terms/Policy, API access/quota eligibility, attribution/branding requirements and commercial-use rules. Official starting point: https://developer.spotify.com/policy and https://developer.spotify.com/compliance-tips
- The default safe target is a clearly attributed outbound link to an authorized Spotify album/track/playlist page where the URL/data source is lawfully obtained and its current terms permit that display. Link-outs must not imply Spotify endorsement. Do not scrape Spotify or cache/repackage metadata/artwork against its terms.
- Do not build embedded music playback, player controls, audio-preview playback, or music/video synchronization as a shortcut. Spotify's policy contains restrictions on streaming/commercial integrations and synchronization of sound recordings with visual media, so re-check the exact proposed use and secure written approval if required. The app must continue working when Spotify API access is denied or later withdrawn.
- Separate music discovery from soundtrack ownership: a Spotify link is not evidence that a track is part of the official film soundtrack. Store source/provenance and mark unofficial/community-curated playlists clearly.

### Suggested conceptual records
- `title_awards`: canonical title, award organization, ceremony/edition, year, category, nominee/winner status, credited person/work, source URL, attribution, verification/fetched date, and licensing notes where permitted.
- `title_facts` or purpose-specific `trivia_items` / `goof_items`: canonical title, author/source, body, spoiler metadata, moderation/publication status, provenance, correction/retraction history and timestamps.
- `soundtrack_links`: canonical title, track/album/artist labels, official/unofficial classification, external URL, source/provenance, territory and verification date. Avoid storing restricted audio assets or unnecessary provider payloads.

## 32.4 Upcoming-release calendar and reminders

Create an upcoming-release experience for theatrical movies, streaming premieres and TV episodes only when source data supports those concepts. A “release date” is not necessarily worldwide, final or the same across cinema, streaming and territories.

### Calendar UX and data semantics
- Add a calendar/list view with filters for movies/TV episodes, region/territory, theatrical vs streaming where known, and date range. Default to the user's configured region/timezone, with a clear manual selector; do not silently infer exact location from coarse context.
- Display the release type, territory, source/provider and “last checked” or freshness state. Different releases for different countries/platforms must be distinct facts; never collapse them into one unqualified global date.
- Users can opt into watchlist reminders globally and/or per title/episode. Let them choose timing where supported (for example, release day or an advance reminder), timezone, and enabled channels. Do not trigger an external message just because a title is in the watchlist unless the user has explicitly enabled that reminder/channel.
- Prevent duplicate reminders with idempotency keys. If a release date moves, cancel/reschedule stale pending jobs and tell the user about material changes only according to preferences. Handle TBD dates, cancelled releases, time-zone boundaries, daylight-saving changes and provider outages. Avoid reminder storms after bulk imports or provider refreshes.
- In-app notifications are the default MVP channel. Email/web push must follow the existing channel-specific gates. Use quiet hours/preferences if external channels are later enabled. Do not expose spoiler plot details in reminder previews.
- Prefer a downloadable `.ics` event or a standards-based calendar export as the first calendar integration. Validate text/URLs to prevent calendar injection; represent date-only releases as all-day events rather than inventing a start time.

### Optional Google Calendar integration
- Direct sync is later/optional and must be opt-in. Ask only for the narrowest practical Google OAuth scope (for example an owned-events scope if it covers the intended workflow); do not request access to read all calendar events just to insert release reminders. Verify current Google scope and verification requirements before launch.
- Official references: https://developers.google.com/workspace/calendar/api/auth and https://developers.google.com/workspace/calendar/api/guides/create-events
- Keep refresh/access tokens in protected server-side storage, never browser local storage or logs; disclose why calendar access is required; handle OAuth callback/redirect allowlists, CSRF/state, token rotation/revocation, disconnect and deletion. Store the provider event ID and a stable idempotency mapping so retries do not create duplicates.
- Define what happens when a reminder is removed in Movicin: offer a clear choice to delete the corresponding event created by Movicin, without deleting unrelated user-created events. Test partial failures and stale remote event IDs.
- Do not make Google Calendar a dependency for local reminders or the release calendar. The feature must work if authorization is declined, revoked or the API is unavailable.

### Suggested conceptual records
- `release_facts`: title/episode reference, release type, country/territory, platform/venue if known, date or datetime with source-defined semantics, source/provenance, confidence/status, fetched/verified time and correction history.
- `release_reminders`: user, title/episode, reminder timing, timezone, selected channels, opt-in state, idempotency key, next send time, lifecycle status and timestamps.
- `calendar_connections` / `calendar_events`: user, provider, protected credential reference, scopes/consent timestamps, connection status, provider event ID, local reminder ID, sync status and revocation/deletion state. Keep secrets out of logs and ordinary app queries.

## 32.5 Theatrical ticket booking and authorized outbound links

Extend the discovery layer beyond streaming availability to theatrical showtimes/ticket links, but only with reliable territory-aware data and a real permission/affiliate/partner path.

- Consider official ticketing-provider deep links, cinema chain links, approved affiliate links or a licensed event/showtime data provider. **Do not assume that BookMyShow exposes a public API, that Movicin has affiliate approval, or that any link guarantees inventory or commission.** Those details must be verified directly during Phase 0/when this milestone begins.
- At minimum, store/show title ID mapping, territory/city where required, cinema/provider, showtime and timezone if supplied, last-verified timestamp, booking URL, link provenance, availability status and affiliate disclosure/relationship. Do not invent showtimes, seats, price, discount, commission or booking success.
- Let users select their city/region explicitly or grant location permission only when needed and optional. Handle ambiguous title remakes/versions, language formats, dubbed/subtitled versions, date changes, sold-out showings and stale links.
- Use a safe server allowlist or validated destination policy for supported providers to prevent open redirects and malicious URL injection. Make it clear when the user leaves Movicin to book externally. Clearly disclose affiliate links and possible commission near the link, not only in a distant legal page.
- Actual checkout, ticket issuance, refunds, customer support, seat inventory and payment processing remain outside scope unless the owner separately approves a fully designed provider integration. Do not add Movicin payment functionality implicitly.
- Test region matching, stale/invalid URLs, unapproved providers, unavailable inventory, affiliate labels, keyboard/touch interactions and provider outages.

## 32.6 News, editorials and community discussion forums

Separate editorial journalism from user-generated discussion. They have different trust, rights and moderation needs.

### News/editorials
- Add public `/news` and `/news/[slug]` only after defining who can publish and how sources/corrections are handled. Prefer original articles, short attributed factual summaries with links, reviews/analysis written by authorized contributors, and transparent publication/update dates.
- Do not scrape or republish full third-party articles, images, headlines or feeds without a licence/permission. A link and attribution alone do not automatically grant republication rights.
- Store article status (draft/review/scheduled/published/withdrawn), author/byline, editor, created/published/updated timestamps, source links, correction note/history, content warnings/spoiler labels, canonical slug, locale and rights/asset provenance. Preserve editorial audit history where appropriate.
- Require editorial-role authorization for publishing and changing canonical public pages. Provide correction/takedown, abuse report, stale-story update and source validation workflows. Prevent unpublished drafts from appearing in sitemap, search, RSS/feed or Open Graph metadata.
- Do not generate fake “breaking news” or imply a report is confirmed when it is only a rumour. Label rumours/opinion/official announcement accurately and link to primary sources when practical.

### Forums/discussion boards
- Forums are public user-generated content and must not launch before the Part 23 Phase 5 safety gate. Apply existing report/block, rate limiting, anti-spam, account restrictions, moderation logs, appeals, spoiler handling and privacy controls.
- Support topic/category, thread, post/reply, author, timestamps, edit/delete state, pinned/locked state where authorized, moderation status, and subscription/follow settings only as justified. Start with bounded nesting, pagination and clear content ownership; avoid adding every Reddit feature in one pass.
- Add title/season/episode spoiler scope, report reason and a visible warning before publishing. Strict Spoiler-Free Mode must protect tagged forum content, but make clear that users can post untagged spoilers and provide reporting/moderation.
- Avoid leaking hidden/private posts into search, feeds, notifications, summaries or OG images. Search indexing is an explicit per-route/content moderation decision; deleted/removed content must be purged from caches/sitemaps on the documented schedule.
- If community votes/sorting are added, define abuse resistance and do not present vote count as factual verification. Do not expose private reporter identities or internal moderation notes.

### Suggested conceptual records
- `editorial_articles`: slug, locale, byline/author, editor, workflow status, source/correction metadata, publication dates, spoiler/content-warning fields, and rights/asset provenance.
- `forum_categories`, `forum_topics`, `forum_posts` (or a reviewed equivalent): author/target relations, access visibility, spoiler scope, moderation workflow, timestamps, report/block relationships, pagination indexes and deletion semantics. Use separate policies for public reads vs owner edits vs moderation actions.

## 32.7 Form validation and authentication feedback

- Implement live client-side validation for login, registration, password confirmation and password reset forms using the same documented rules/configuration as server validation and the selected auth provider. Client validation improves UX; it is never the security boundary.
- Provide real-time password-requirement checklist/strength hint only for requirements actually enforced. Keep feedback useful while typing and announce meaningful state changes accessibly without announcing every keystroke to screen readers.
- Do not unnecessarily block pasting or password managers. Do not add misleading strength percentages or arbitrary composition rules just to make a meter look advanced. Show password visibility controls with accessible names and safe focus behaviour.
- On submit, show field-specific messages, a form-level summary where useful, disabled/loading state only while needed, and preserved values after recoverable errors. Do not echo passwords/tokens to errors or logs. Avoid account enumeration in authentication errors (for example, reset-password flows should use provider-appropriate neutral language).
- Test malformed data, network failure, keyboard/screen reader interaction, short viewport, password manager/autofill and backend/client rule parity.

## 32.8 Consistent layout, spacing and navigation geometry

- Establish shared layout tokens for header height, page max-width, horizontal gutters, vertical rhythm, section spacing, content widths and overlay offsets. Main content must not unexpectedly overlap a fixed/sticky header or jump between routes.
- Define consistent responsive page-container rules for public pages, settings, forms, long editorial text, detail pages, lists and admin screens. A wide movie-artwork layout and a narrow reading column may intentionally differ, but the choices must be explicit design tokens/variants rather than arbitrary per-page margins.
- Account for mobile safe areas, sticky navigation, bottom bars, focus rings, anchored headings and keyboard overlays. Hash-linked headings must not sit hidden behind a sticky header (`scroll-margin` or equivalent).
- Keep horizontal carousels optional and keyboard/touch accessible; do not let them become the only way to access a collection. Test long translated titles, browser zoom, narrow viewports and both themes.
- Avoid “fixing” spacing with scattered magic numbers or global negative margins. Update shared tokens/components and test affected routes together.

## 32.9 Shareable annual Wrapped

- Wrapped is an opt-in presentation of a user's annual viewing summary, not an automatic public disclosure. Before generating a public share link or downloadable image, display a preview and explain which fields may be visible.
- Default public/share output must omit private profile details, diary notes, hidden ratings, private lists, precise event timestamps, blocked/follow relationships and anything the user did not authorize. Include aggregate statistics only when their underlying data is reliable and the user opts in.
- Offer image download and the Web Share API where supported; provide a copy-link or download fallback. Do not promise direct Instagram posting/Instagram API integration unless current official access and permissions are verified.
- Use dynamic OG images with bounded parameters, caching, abuse protection and privacy-safe URLs. Public share pages need a revocation mechanism and defined `index`/`noindex` rules. Revocation must invalidate cached OG images where technically possible and should stop future public rendering; explain limitations if already-downloaded copies cannot be recalled.
- Make Wrapped accessible, localized and spoiler-safe, and allow users to preview different layouts without exposing the unapproved public version. Do not generate a Wrapped page with fabricated statistics to fill empty years.

## 32.10 Third-party integration principles and official policy checks

Every integration must have a short `docs/INTEGRATIONS.md` entry before implementation, recording: purpose/user value; official documentation and applicable terms; API coverage and quota/access status; data fields used; allowed persistence/cache/transformation/display; attribution; commercial/affiliate terms; OAuth scopes/consent; costs; rate limits; outage/deletion behaviour; and a test plan.

- Re-check official rules at the time of implementation and again before public launch. Search results or a working API key do not constitute rights to store, display, cache, monetize or repurpose the data.
- Keep provider integrations behind typed server-side adapters, with minimum required scopes, timeouts, bounded retries, secrets server-side, safe logs and documented provider-outage behaviour.
- Never scrape a site to bypass a missing API or denied permissions. If permission/coverage is unclear, leave the integration as a documented, hidden/planned capability and offer a lawful manual/curated alternative where reasonable.
- No external provider should become a single point of failure for user-owned ratings, diary progress, reviews, lists, profiles, local reminder preferences or local forum content.

## 32.11 V10 additional release checklist

Before accepting each applicable feature, verify:
- TV episodes: progress semantics and migration from title-level watched state are documented; no episode history is invented; permission/outage/order edge cases are tested.
- Strict spoilers: no known protected details leak via visible UI, HTML/SSR data, accessible labels, search/SEO/social metadata, notifications, copied text or cached content.
- Enrichment data: source rights, provenance, attribution, correction/takedown and missing-data UX have been reviewed.
- Release reminders/calendar: explicit opt-in, correct region/timezone/date semantics, idempotency and unsubscribe/revocation work.
- Ticket links: provider permission, territory mapping, link freshness, affiliate disclosure and outbound-link security are reviewed.
- News/forums: original-content rights, role permissions, moderation, correction/removal, sitemap/cache behaviour and spoiler controls are tested.
- Auth forms: client feedback exactly mirrors documented rules but server validation remains authoritative; accessibility and account-enumeration safety pass.
- Performance: data/state/action feedback is not animation-blocked; long content and episode lists stay navigable and responsive.
- Wrapped: the share preview reflects the actual export/OG output, all private fields are opt-in, and public access can be revoked.

------------------------------------------------------------------------

# CHANGELOG — V7

- Adds Google sign-up/sign-in to registration and login using the
  Supabase Auth Google provider, with callback, identity-linking,
  redirect and account-security requirements.
- Adds a Cinejoy reference-review procedure and records that automated
  inspection limitations must not be filled with invented observations.
- Evaluates Lenis as an optional desktop-only enhancement, with native
  touch scrolling, reduced-motion handling, a native fallback and a
  measured ship/no-ship decision.
- Expands movie and TV detail pages with synopsis, main cast/crew,
  production companies, release facts, Where to Watch and reviews.
- Adds clickable cast/crew person profiles with filmography/TV credits.
- Deepens the data-provider plan, separating metadata, people, streaming
  availability and financial facts, and documenting the limits of free
  APIs and commercial licensing.
- Adds cautious box-office/budget reporting and prevents unsupported
  hit/flop claims.
- Preserves the v6 streaming, badges, collaborative lists, content
  warnings, PWA, future Pro-entitlement, moderation, privacy and security
  requirements. Payment functionality remains deferred unless explicitly
  approved by the owner.
- This addendum is a specification, not implementation, API approval,
  legal advice, performance testing or a completed security audit.


------------------------------------------------------------------------

# CHANGELOG — V8 CONSOLIDATION AND RESILIENCE

- Consolidates current implementation sequencing into Part 23 as the sole authoritative roadmap; Part 31.9 no longer defines competing phases.
- Makes Cinejoy the primary visual reference and Moctale a documented fallback only when Cinejoy is genuinely inaccessible; forbids invented observations and copying either site's identity/assets.
- Standardizes public title/person routes around `/movie/[slug]`, `/tv/[slug]` and `/person/[slug]`, with stable ID resolution and canonical redirects.
- Makes normalized people and movie/TV credit relations required for the public discovery MVP.
- Adds provider-outage behaviour: permitted stale-while-revalidate caching, last-known-good featured homepage data, bounded retries, graceful service-unavailable states and separation of provider metadata from Movicin-owned user data.
- Adds click-to-load trailer embeds using a facade/Lite YouTube Embed pattern.
- Extends spoiler safety to feeds, truncated previews, list descriptions, notifications, search snippets, metadata and social cards; spoilers must be filtered before truncation.
- Adds rate limiting, bot/WAF/challenge options and anti-abuse controls to reduce abusive harvesting of public Movicin content without promising scraping can be made impossible or blocking legitimate indexing.
- Adds dynamic Open Graph image generation for public movie/TV pages, profiles and lists with privacy, spoiler, cache and abuse safeguards.
- Defines measurable Core Web Vitals targets and frames Lighthouse ≥ 90 as a goal rather than a guarantee.
- Preserves the existing requirements for authentication, moderation, privacy, provider licensing, streaming availability, badges, collaborative lists, PWA, deferred Pro, accessibility and testing.

This v8 is retained as a historical changelog, not the active specification. V10 is the active consolidated specification; this document is not proof that code has been implemented, provider rights have been granted, or performance/security tests have passed.

------------------------------------------------------------------------

# CHANGELOG — V10.0 FINAL CONSOLIDATION

- Fixes the remaining approval-gate conflict: pre-approval work is limited to repository inspection and reversible Phase 0 documentation; app scaffolding, dependencies, theme tokens, test setup and initial layout wait for explicit owner approval.
- Updates document metadata and cross-cutting acceptance tests to v10.
- Promotes TV episode/season progress to the first high-priority post-core enhancement and adds a normalized data model, migration rules, progress semantics and tests.
- Adds global Strict Spoiler-Free Mode across visible UI, server-rendered data, search, notifications, accessibility text and social/SEO output, with explicit limits and override behaviour.
- Adds license-aware trivia/goofs, awards and soundtrack sections; explicitly restricts Spotify use to verified, permitted use cases and defaults to safe link-outs rather than embedded playback.
- Adds territory-aware upcoming releases, opt-in reminders, `.ics` export and optional least-scope Google Calendar integration.
- Adds permission-gated theatrical ticket links/affiliate disclosures without assuming BookMyShow API or affiliate availability.
- Adds original editorial/news workflows and community forums under the existing public-UGC safety gate.
- Adds real-time accessible authentication validation, consistent layout/spacing tokens, non-blocking animation/data principles and privacy-safe shareable annual Wrapped.
- Integrates the new work into Part 23, the canonical roadmap, schema guidance and cross-cutting acceptance tests; the prompt remains a staged specification, not evidence of implementation or external-provider approval.

------------------------------------------------------------------------
