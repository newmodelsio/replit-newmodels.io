# Discord message family — deferred

This family is inventoried but not part of the initial pilot. Continue only after
the pilot is approved.

## Source

- `artifacts/new-models/src/components/DiscordPost.jsx`
- `artifacts/new-models/src/components/DiscordSubmit.jsx`
- `artifacts/new-models/src/utils/linkify.jsx`
- `artifacts/new-models/src/api/discord.js`
- Composed by the data-fetching page `artifacts/new-models/src/components/Dark.jsx`.

## Original data shape

`DiscordPost({ post })` reads:

- `content: string`
- `embeds?: { url, title, description, thumbnail?: { url } }[]`
- `attachments?: { url, filename }[]`
- `reactions?: { emoji: { id?, name? }, count }[]`
- The parent uses `post.id` as the list key.

`DiscordSubmit` keeps message, sending, success, and error state, then calls
`postDiscord(message.trim())`. That API posts JSON `{ message }` to
`/api/discord`. The component belongs in the design system only with its service
boundary represented as a consumer-provided callback; the package must not own
or import the app's API route.

## Source patterns

- Discord surfaces use `#36393f`, `#2b2d31`, and `#40454b`.
- Embeds use a dark card with a left rule and blue link titles.
- Reactions are compact gray chips with an emoji and count.
- Submission uses a 2000-character textarea and a periwinkle action button.

## Open safety and accessibility notes

The CDN image URLs and custom emoji IDs need validation if user-controlled.
Attachment images currently have no meaningful alt text. The submit form needs a
label, a live status for sending/success, and a disabled success state. The
component package should render content and invoke an `onSubmit` callback; the
consuming app should retain server-side authentication, validation, and rate
limits.