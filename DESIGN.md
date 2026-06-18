---
name: recipebean
description: A cozy personal cookbook — one warm, searchable home for the recipes you actually cook.
colors:
  coral: "oklch(0.691 0.201 17.2)"
  coral-ring: "oklch(0.6907 0.2007 17.18)"
  blush-accent: "oklch(0.9525 0.0243 8.16)"
  warm-paper: "oklch(0.9898 0.0079 73.75)"
  ink: "oklch(0.2675 0.0113 36.49)"
  warm-muted: "oklch(0.5058 0.0218 56.89)"
  card-white: "oklch(1 0 0)"
  neutral-surface: "oklch(0.97 0 0)"
  hairline: "oklch(0.922 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  on-coral: "oklch(0.985 0 0)"
typography:
  display:
    fontFamily: "Newsreader, ui-serif, Georgia, Cambria, 'Times New Roman', serif"
    fontSize: "clamp(2.25rem, 5vw, 3.875rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Newsreader, ui-serif, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  pill: "9999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "44px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.on-coral}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.on-coral}"
  button-lg:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.on-coral}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0 24px"
  button-ghost:
    backgroundColor: "{colors.blush-accent}"
    textColor: "{colors.coral}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 16px"
  input:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0 12px"
  card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  pill-badge:
    backgroundColor: "{colors.blush-accent}"
    textColor: "{colors.coral}"
    rounded: "{rounded.pill}"
    height: "32px"
    padding: "0 16px"
---

# Design System: recipebean

## 1. Overview

**Creative North Star: "The Well-Loved Recipe Box"**

recipebean looks and feels like a cherished physical recipe box that someone has kept for years — warm to the touch, a little personal, built to be opened a thousand times. The warmth is real but grown-up: it comes from a single confident coral, a Newsreader serif that handles the emotional beats in italic, and soft organic shapes — never from cute overload or a wall of pastel. The interface is calm and glanceable, the kind of thing you can read across a kitchen counter with flour on your hands.

The system runs on a **warm-paper** canvas (`oklch(0.9898 0.0079 73.75)`) with near-black warm **ink** for text and a single saturated **coral** doing all the emotional and action work. The product surfaces (library, sidebar, dashboard) stay restrained and tool-like — coral is reserved for primary actions, the current selection, and the occasional serif-italic flourish. The marketing landing is allowed to bloom a little more: a peach-to-blush gradient blob, kawaii icons on pastel tiles, a floating hero illustration. Both registers share the same paper, the same ink, the same one coral.

This system explicitly rejects four things, carried verbatim from PRODUCT.md: the **cluttered recipe-blog SEO** look (ad-choked, endless scroll, life-story-before-the-recipe); **cold enterprise SaaS** (blue-gray dashboards, dense corporate tables); **trendy AI-gradient startups** (glassmorphism, purple gradients, gradient text, hero-metric templates); and **childish over-cute** (so kawaii it reads as a kids' app). Kawaii touches are seasoning, not the meal — every cute element earns its place against the "adults trust this with recipes that matter" bar.

**Key Characteristics:**
- One warm coral carries every action and emotional accent; everything else is paper, ink, and hairline.
- Newsreader serif (often italic, often coral) for headlines and emotional words; Hanken Grotesk for everything functional.
- Soft, generous radii (8–14px) and a warm-paper background — never stark white chrome.
- Kitchen-legible first: large, high-contrast type beats density everywhere it counts.
- Restrained in the app, a touch more expressive on the landing — same palette, different volume.

## 2. Colors

A warm-paper neutral base, near-black warm ink, and one saturated coral that owns every action and accent. Pinks and peaches appear only as soft decorative tints, never as a second voice.

### Primary
- **Coral** (`oklch(0.691 0.201 17.2)`): The single brand color. Primary buttons, links, the current selection, star ratings, and the serif-italic emphasis words ("*finally*", "*back*"). Also the logo fill. This is the one color a user remembers.
- **Coral Ring** (`oklch(0.6907 0.2007 17.18)`): The focus-ring coral — effectively the same hue as Coral, rendered at reduced opacity (`ring-coral/50`) for visible-focus halos on inputs and buttons.

### Secondary
- **Blush Accent** (`oklch(0.9525 0.0243 8.16)`): A pale coral-pink tint. Backs the "Your kitchen, beautifully organized" status pill and ghost-button hovers. The quietest member of the coral family — a whisper of the brand, used for surfaces that should feel warm but not loud.

### Neutral
- **Warm Paper** (`oklch(0.9898 0.0079 73.75)`): The body and sidebar background. A barely-warm off-white (the warmth is the brand's, not a default cream tint). Never use stark `#ffffff` for the page itself.
- **Card White** (`oklch(1 0 0)`): True white, reserved for cards and inputs that need to lift off the warm paper. The contrast between paper and card *is* the elevation.
- **Ink** (`oklch(0.2675 0.0113 36.49)`): The warm near-black for all primary text. Carries a trace of the brand's hue so it reads as warm-dark, not cold gray.
- **Warm Muted** (`oklch(0.5058 0.0218 56.89)`): Secondary text — descriptions, helper copy, captions. Warm gray, never cold. **Use deliberately:** on warm paper this is the contrast pinch point (see the Muted-Floor Rule).
- **Neutral Surface** (`oklch(0.97 0 0)`): The shadcn `secondary`/`muted` surface for secondary buttons and quiet fills.
- **Hairline** (`oklch(0.922 0 0)`): All borders, dividers, and input strokes. 1px, low-contrast, structural.

### Tertiary
- **Destructive** (`oklch(0.577 0.245 27.325)`): Errors and destructive actions only — error banners, invalid-field rings, delete confirmations. Never decorative.
- **Decorative Pastels** (`#ffe9ec` pink, `#e8f0e4` green, `#fff0df` cream): Landing-page kawaii-icon tile backgrounds only. The peach→blush hero blob (`linear-gradient(140deg, rgb(255,228,215), rgb(255,219,225))`) lives here too. These are imagery, not UI tokens — they never touch the product surfaces.

### Named Rules
**The One Coral Rule.** There is exactly one accent color, and it is Coral. Pinks, peaches, and pastels are decorative imagery, not a second accent. If a screen needs to "add color," it adds coral or it adds nothing.

**The Muted-Floor Rule.** Warm Muted on Warm Paper is the system's contrast floor, and it is close to the AA line. Body and placeholder text must hit ≥4.5:1; never push secondary text lighter "for elegance." When in doubt, step toward Ink, not away from it.

## 3. Typography

**Display Font:** Newsreader (with `ui-serif, Georgia, Cambria, 'Times New Roman', serif`)
**Body Font:** Hanken Grotesk (with `ui-sans-serif, system-ui, -apple-system, sans-serif`)

**Character:** A true contrast-axis pairing — a literary, slightly old-world serif against a clean, friendly geometric-humanist sans. Newsreader brings the cookbook warmth and handles every emotional moment, usually in italic and often in coral. Hanken Grotesk does all the functional work — buttons, labels, data, body — and keeps the product feeling modern and legible. Never set a UI label in the serif; never set a hero in the sans.

### Hierarchy
- **Display** (Newsreader, 500, `clamp(2.25rem, 5vw, 3.875rem)`, line-height 1.04, `-0.015em`): Hero and page-defining headlines. Emotional words go italic + coral ("Every recipe you love, *finally* in one cozy place."). `text-wrap: balance`.
- **Headline** (Newsreader, 500, ~2.25rem): Section and auth headings ("Welcome *back*."). The serif, scaled down — still the warm voice.
- **Title** (Hanken Grotesk, 700, 1rem): Card titles, feature names, inline emphasis. Sans takes over the moment we're inside the product.
- **Body** (Hanken Grotesk, 400, 1rem, line-height 1.5): Default reading text. Secondary copy uses Warm Muted. Cap prose at 65–75ch.
- **Label** (Hanken Grotesk, 600, 0.75rem, `0.05em`, occasionally uppercase): Form dividers ("OR CONTINUE WITH EMAIL"), small UI labels, metadata. The *only* place uppercase tracking is allowed.

### Named Rules
**The Two-Voice Rule.** Newsreader speaks; Hanken Grotesk works. Serif is for headlines and emotional words only — never buttons, labels, inputs, or data. Sans is for everything you operate. A serif button is always wrong.

**The Coral-Italic Rule.** The signature flourish is a single word set in Newsreader italic and colored Coral inside an otherwise plain headline. Use it once per heading, on the word that carries the feeling — never on a whole line.

## 4. Elevation

The system is **flat by default and lifts with tone, not shadow.** Depth comes from the contrast between Warm Paper (the page) and Card White (the surface), reinforced by a single 1px Hairline border. There is no ambient drop-shadow vocabulary on content; cards on the landing are `border + white fill` on warm paper, full stop. The only shadow in the system is the shadcn `shadow-xs` on outline buttons — a near-invisible hairline lift, not a card elevation.

### Named Rules
**The Tonal-Lift Rule.** A surface lifts by being whiter than the paper around it and ringed by one hairline — not by casting a shadow. If you reach for `box-shadow` to separate a card from the page, you've already lost the warmth; change the fill or the border instead.

## 5. Components

### Buttons
- **Shape:** Gently rounded (`rounded-md`, 8px). Consistent across every size.
- **Primary:** Coral fill, white text (`bg-coral` / `text-on-coral`), `font-medium`, default height 36px (`h-9`) / `px-4`. The `lg` size (40px / `px-6`) is the canonical CTA on the landing and auth forms ("Start your cookbook", "Sign in").
- **Hover / Focus:** Hover dims the coral to 90% (`hover:bg-coral/90`) over `transition-all`. Focus-visible draws a 3px coral ring at 50% opacity plus a ring-colored border. Disabled drops to 50% opacity, pointer-events off.
- **Ghost:** Transparent at rest; hovers to Blush Accent fill with coral text. Used for low-emphasis nav actions ("Sign In" in the header).
- **Secondary / Outline / Link:** Secondary uses Neutral Surface; outline adds a hairline border + `shadow-xs`; link is coral text with underline-on-hover. Never invent a new button shape.

### Cards / Containers
- **Corner Style:** `rounded-xl` (14px) for landing feature tiles; `rounded-xl` for dashboard content blocks.
- **Background:** Card White on the Warm Paper page — the tonal contrast is the lift.
- **Shadow Strategy:** None. See the Tonal-Lift Rule.
- **Border:** A single 1px Hairline.
- **Internal Padding:** 24px (`p-6`) for feature cards.
- **Caution:** The landing's three feature tiles are a same-size icon+title+text grid — exactly the "identical card grid" PRODUCT.md flags. When this surface is reworked, vary size, weight, or affordance; don't extend the pattern.

### Inputs / Fields
- **Style:** 1px Hairline border, Card White fill (forms set `bg-white` explicitly over the warm paper), `rounded-md` (8px), 40px tall (`h-10`), `px-3`. Placeholder uses Warm Muted — verify it against the Muted-Floor Rule.
- **Focus:** Border shifts to Coral Ring and a 3px coral ring at 50% opacity blooms (`focus-visible:ring-3 ring-ring/50`). No glow, no scale.
- **Error:** `aria-invalid` turns the border Destructive and adds a destructive ring at 20%. Field-level errors pair with the Destructive error banner (`border-destructive bg-destructive/5`, coral-red text).
- **Labels:** `FieldLabel` in Hanken Grotesk; inline secondary actions (e.g. "Forgot?") are coral, `font-bold`, `text-sm`.

### Navigation
- **Marketing header:** 72px (`h-20`), bottom Hairline, `container` width. Logo left (coral, 28px tall), centered text nav (Recipes / Collections / About) in Hanken Grotesk, auth buttons right (ghost + primary).
- **App sidebar:** shadcn sidebar on Warm Paper (`--sidebar` matches the page), collapsible to icon rail. Sections: search, primary nav, user-created categories (each with its stored `color`), and a footer NavUser with avatar + dropdown. Categories carry per-user colors — pair the color swatch with the label text; never rely on color alone (accessibility).
- **States:** Default / hover (Neutral Surface or Blush) / active (selection state) / focus-visible (coral ring). Mobile collapses the sidebar to a Sheet.

### Signature: The Coral-Italic Headline
The defining component isn't a control — it's the headline treatment. A Newsreader display heading in Ink with a single word pulled into coral italic ("*finally*", "*back*"). It appears on the hero and every auth screen and is the fastest way to make a new surface feel like recipebean. Reuse it; don't dilute it by coloring whole lines.

## 6. Do's and Don'ts

### Do:
- **Do** keep Coral as the only accent — actions, current selection, links, ratings, and the serif-italic flourish. One coral, everywhere it matters (The One Coral Rule).
- **Do** set headlines and emotional words in Newsreader (italic + coral for the signature beat) and everything operable in Hanken Grotesk (The Two-Voice Rule).
- **Do** lift surfaces with tone — Card White on Warm Paper plus one Hairline — not with shadows (The Tonal-Lift Rule).
- **Do** keep Warm Paper (`oklch(0.9898 0.0079 73.75)`) as the page background; reserve true white for cards and inputs.
- **Do** verify Warm Muted text clears 4.5:1 on Warm Paper, and bump toward Ink whenever it's close (The Muted-Floor Rule).
- **Do** prioritize kitchen-legibility: large, high-contrast ingredients and steps over dense layouts.
- **Do** give every interactive element its full state set — default, hover, focus-visible (3px coral ring), active, disabled, error.
- **Do** pair category colors with text labels; never encode meaning in color alone.

### Don't:
- **Don't** look like a **cluttered recipe-blog SEO site** — no ad-stuffed columns, no life-story-before-the-recipe, no fighting the reader for the content.
- **Don't** drift toward **cold enterprise SaaS** — no blue-gray dashboards, no dense corporate tables, no sterile chrome. This is a kitchen tool.
- **Don't** reach for **trendy AI-gradient startup** moves — no glassmorphism, no purple gradients, no `background-clip: text` gradient text, no hero-metric template.
- **Don't** go **childish or over-cute** — kawaii icons and pastels are seasoning. If a screen reads as a kids' app, it's wrong.
- **Don't** set UI labels, buttons, inputs, or data in Newsreader. The serif never operates anything.
- **Don't** color a whole headline line coral — the flourish is one word, on the word that carries the feeling.
- **Don't** add drop-shadows to cards to separate them from the page; change the fill or border instead.
- **Don't** extend the identical icon+title+text feature-card grid on the landing — vary size, weight, or affordance when reworking it.
- **Don't** introduce a second accent color or a fourth named font; the system is one coral and two families.
