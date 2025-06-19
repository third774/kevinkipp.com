# Agent Guidelines for kevinkipp.com

## Build/Test Commands
- `npm run dev` - Start development server with Wrangler types
- `npm run build` - Build for production with commit hash
- `npm run typecheck` - Type check without emitting files
- `npm run prettier` - Format all files with Prettier
- `npm run preview` - Preview build with Wrangler Pages

## Code Style
- **Formatting**: Use tabs for indentation, trailing commas everywhere
- **Imports**: Auto-organized by prettier-plugin-organize-imports
- **Types**: Strict TypeScript with strictNullChecks enabled
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Files**: .astro for components, .ts for utilities, .mdx for content
- **CSS**: Tailwind CSS with utility classes, use `cn()` helper for conditional classes
- **Error Handling**: Use tiny-invariant for assertions, proper error boundaries

## Project Structure
- `src/components/` - Astro components (PascalCase filenames)
- `src/pages/` - Route pages and API endpoints
- `src/utils/` - Utility functions and helpers
- `src/content/` - MDX blog posts and JSON data
- `src/api/` - External API integrations

## Database
- Use Drizzle ORM with D1 database
- `npm run db:generate` - Generate migrations
- `npm run db:migrate:local` - Apply migrations locally