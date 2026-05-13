# UniTool - Student Marketplace

A Next.js 16 application migrated from Vercel to Replit with Supabase backend.

## Tech Stack

- **Framework**: Next.js 16.2.2 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Libraries**: Heroicons, Lucide React
- **Forms**: React Hook Form
- **Backend**: Supabase (Auth, Database, Storage)
- **Package Manager**: npm

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `app/auth/` - Auth callback route and server actions
- `components/` - Shared React components (Sidebar.tsx)
- `lib/supabase/` - Supabase client configurations (browser, server, admin, middleware)
- `lib/types.ts` - TypeScript types, constants (CATEGORIES, PERIOD_LABELS, etc.)
- `lib/data/` - Server action data access layer:
  - `profile.ts` - Profile CRUD, user settings
  - `items.ts` - Items CRUD, search, filtering
  - `rentals.ts` - Rentals, history, stats
  - `favorites.ts` - Favorite toggle, list
  - `messages.ts` - Conversations, messages, unread count
  - `notifications.ts` - Notifications, mark read
- `supabase/schema.sql` - Full database schema (10 tables, RLS policies, triggers)
- `scripts/` - Seed scripts (fix-and-seed.ts for sample items + storage images)
- `middleware.ts` - Route protection middleware
- `public/` - Static assets

## Database Schema

Tables: `profiles`, `items`, `rentals`, `favorites`, `conversations`, `conversation_participants`, `messages`, `reviews`, `notifications`, `user_settings`

**Items table columns**: `id`, `owner_id`, `title`, `description`, `category`, `condition`, `price`, `rental_period`, `availability_date`, `location`, `deposit`, `image_paths` (TEXT[]), `available`, `created_at`, `updated_at`

All tables have RLS policies. Triggers auto-create profiles and user_settings on signup, and update `updated_at` timestamps.

**Setup**: Run `supabase/schema.sql` in Supabase SQL Editor to create all tables.

## Supabase Storage

- **Bucket**: `item-images` (public, 10MB limit, allows png/jpeg/gif/webp/svg+xml)
- Images uploaded via `uploadItemImage()` server action in `lib/data/items.ts`
- Public URLs stored in `items.image_paths` array
- Seed images at `seed/item-{1..12}.svg` in the bucket
- Run `npx tsx scripts/fix-and-seed.ts` to seed 12 sample items with storage images

## Data Architecture

- All data fetching uses **server actions** (`"use server"`) in `lib/data/`
- Pages are `"use client"` components that call server actions via `useEffect`
- Layout (`app/layout.tsx`) is `"use client"` (uses `usePathname` for sidebar visibility)
- Sidebar fetches profile + unread count on mount via server actions

## Authentication

- Login, Signup, Forgot Password connected to Supabase Auth
- Server actions in `app/auth/actions.ts`
- Route protection via `middleware.ts`
- Auth callback at `app/auth/callback/route.ts`
- Signup redirects to `/setup`, login redirects to `/home`

## Pages (all connected to Supabase)

- **Home** (`/home`) - Real stats, recent items, notifications
- **Browse** (`/browse`) - Real items with search, filter, sort, favorite toggle
- **Rentals** (`/rentals`) - Real rental data with borrowed/lended tabs
- **History** (`/history`) - Completed/cancelled rentals with earnings/spending stats
- **Favorites** (`/favorites`) - Real favorites with bulk actions
- **Messages** (`/messages`) - Real conversations and messages
- **Profile** (`/profile`) - Real profile data and rental stats
- **Settings** (`/settings`) - Real profile editing, notification/privacy/preference settings saved to DB
- **List Item** (`/list-item`) - Creates real items in Supabase
- **Setup** (`/setup`) - Saves university/major/role to profile
- **Welcome** (`/welcome`) - Real profile data and item count

## Running the App

The app runs on port 5000 via the "Start application" workflow:

```
npm run dev
```

## Scripts

- `npm run dev` - Start dev server on port 5000
- `npm run build` - Build for production
- `npm run start` - Start production server on port 5000
- `npm run lint` - Run ESLint

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Supabase anon/publishable key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (secret, server-only)
- `NEXT_PUBLIC_APP_URL` - Application URL

## Supabase Clients

- `lib/supabase/client.ts` - Browser client (for client components)
- `lib/supabase/server.ts` - Server client (for server components/actions)
- `lib/supabase/admin.ts` - Admin client (service role, server-only)
- `lib/supabase/middleware.ts` - Middleware client (for route protection)

## Important Notes

- **Turbopack**: Next.js 16 uses Turbopack by default, cannot be disabled
- **PostCSS**: `postcss.config.mjs` uses `Declaration` visitor to strip `mask-image: url(...)` rules (only visitor that fires with Turbopack)
- **Public routes**: `/`, `/login`, `/signup`, `/forgot-password`, `/setup`, `/terms`, `/privacy`, `/support`, `/auth/*`
