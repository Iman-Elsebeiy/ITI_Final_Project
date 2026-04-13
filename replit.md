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
- `components/` - Shared React components
- `lib/supabase/` - Supabase client configurations (browser, server, admin, middleware)
- `middleware.ts` - Route protection middleware
- `public/` - Static assets

## Authentication

- Login, Signup, Forgot Password connected to Supabase Auth
- Server actions in `app/auth/actions.ts`
- Route protection via `middleware.ts`
- Auth callback at `app/auth/callback/route.ts`

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
- `SUPABASE_ITEM_IMAGES_BUCKET` - Storage bucket for item images
- `SUPABASE_STUDENT_IDS_BUCKET` - Storage bucket for student IDs
- `SUPABASE_AVATARS_BUCKET` - Storage bucket for avatars

## Supabase Clients

- `lib/supabase/client.ts` - Browser client (for client components)
- `lib/supabase/server.ts` - Server client (for server components/actions)
- `lib/supabase/admin.ts` - Admin client (service role, server-only)
- `lib/supabase/middleware.ts` - Middleware client (for route protection)
