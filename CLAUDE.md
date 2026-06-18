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