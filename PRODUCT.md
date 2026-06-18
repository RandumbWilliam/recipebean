# Product

## Register

product

## Users

Everyday **home cooks** — non-technical people keeping the dishes worth making again. They're saving family recipes, screenshots, and scattered links into one place they can trust. Their context is the kitchen: often standing at the stove, hands busy, glancing at a phone or laptop across the counter. The job to be done is *"find the recipe I loved last time and follow it without friction."* Secondary jobs: capture a new recipe quickly, organize by category, and jot the tweak that made it perfect.

The product surface (library, dashboard, categories, search) is the primary register. The marketing landing page at `/` is the front door — important, but design there serves conversion to the app, not the other way around.

## Product Purpose

recipebean is a personal cookbook — one tidy, searchable library for the recipes a person actually cooks. It exists because recipes today live everywhere (screenshots, bookmarks, blog tabs, texts) and nowhere usefully. Success looks like: a cook opens recipebean instead of scrolling their camera roll, adds recipes without it feeling like data entry, and can pull up the right one in seconds while cooking. Retention beats acquisition — the win is the library someone keeps coming back to, not a one-time signup.

## Brand Personality

**Cozy, warm, trustworthy.** The voice is a friend who's good in the kitchen — encouraging, plain-spoken, never fussy or technical ("Start your cookbook," "the dishes worth making again"). It feels like a well-loved physical recipe box: personal, a little handmade, made to last. Warmth is carried by the coral accent, the Newsreader serif italic for emotional beats, and soft organic shapes — not by cute overload. The product should feel calm and glanceable under kitchen conditions, with generous, readable type.

## Anti-references

- **Cluttered recipe-blog SEO sites** — ad-choked, endless life-story-before-the-recipe, fighting the reader for attention. recipebean is the opposite: the recipe is the point, immediately.
- **Cold enterprise SaaS** — generic blue-gray dashboards, dense data tables, corporate sterility. This is a kitchen tool, not a CRM.
- **Trendy AI-gradient startups** — glassmorphism, purple gradients, gradient text, hero-metric templates. None of it.
- **Childish / over-cute** — kawaii touches are seasoning, not the meal. It must read as a tool adults trust with recipes that matter, never a kids' app.

## Design Principles

1. **Kitchen-legible.** Optimize for glancing while cooking: large, high-contrast ingredients and steps that read from across the counter. Legibility outranks density everywhere.
2. **Capture without friction.** Adding and editing a recipe should never feel like data entry. Fewest fields, smart defaults, forgiving input.
3. **Warm, not cute.** Coziness comes from type, color, and soft shape — used with restraint. Every cute element must earn its place against the "adults trust this" bar.
4. **The recipe is the hero.** Chrome recedes; content leads. No decoration that competes with the food.
5. **A library worth returning to.** Design for the 100th visit, not the first — organization, search, and recall are the real product.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Body text ≥4.5:1, large text ≥3:1 — especially important given the warm tinted background and muted-gray secondary text already in the tokens (audit these). Full keyboard navigation and visible focus rings. Honor `prefers-reduced-motion` for the floating hero and any future motion (the `rbfloat` animation needs a reduced-motion fallback). Don't rely on category color alone to convey meaning — pair with labels. No known specialized user needs beyond standard AA at this stage; revisit if usage data says otherwise.
