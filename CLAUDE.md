# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (uses Turbopack for faster builds)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

This is a Next.js 15 e-commerce application using the App Router architecture with TypeScript and TailwindCSS v4.

### Key Architecture

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: TailwindCSS v4 (note: uses new v4 syntax with `@import "tailwindcss"`)
- **Font**: Geist Sans and Geist Mono from Google Fonts
- **Path Aliases**: `@/*` maps to `./src/*`

### Directory Structure

- `src/app/` - App Router pages and layouts
  - `page.tsx` - Homepage 
  - `layout.tsx` - Root layout with fonts and metadata
  - `login/` - Login page (currently basic implementation)
  - `globals.css` - Global styles with TailwindCSS v4 and CSS custom properties

### Styling Notes

- Uses TailwindCSS v4 with new syntax (`@import "tailwindcss"`)
- CSS custom properties defined in `:root` for theming
- Dark mode support via `prefers-color-scheme`
- PostCSS configured with `@tailwindcss/postcss` plugin

### Configuration

- TypeScript path mapping configured for `@/*` imports
- Next.js config is minimal (default configuration)
- Turbopack enabled for development server