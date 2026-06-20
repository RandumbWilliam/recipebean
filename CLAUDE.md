# CLAUDE.md

This file provides context and conventions for Claude when working on this codebase.

---

## Package Manager
 
**Always use `bun` — never `npm`, `yarn`, or `pnpm`.**
 
```bash
bun install
bun add <package>
bun remove <package>
bun run <script>
```

## Use Context7 by Default
Always use context7 when I need code generation, setup or configuration steps, or library/API documentation. This means you should automatically use the Context7 MCP tools to resolve library id and get library docs without me having to explicitly ask.

## Database Migrations (Drizzle Kit)

**Never run Drizzle Kit commands unless I explicitly ask you to.**

This applies in all modes — including planning, auto-mode, and agent mode. Do not run them proactively, even when schema files change.

Forbidden commands include (but are not limited to):

```bash
bun run db:generate   # drizzle-kit generate
bun run db:migrate    # drizzle-kit migrate
bun run db:push       # drizzle-kit push
bun run db:studio     # drizzle-kit studio
drizzle-kit generate
drizzle-kit migrate
drizzle-kit push
drizzle-kit studio
```

When working on schema changes, edit the schema files and stop there. Tell me what migration command to run and let me run it myself.