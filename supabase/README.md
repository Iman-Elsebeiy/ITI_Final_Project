# Supabase Setup for UniTool

This project is designed to use a Supabase backend for authentication, storage, and marketplace data.

## Required database objects

The `supabase/schema.sql` file defines:
- `profiles`
- `items`
- `favorites`
- `rentals`
- `messages`

It also enables RLS policies for authenticated user operations.

## Storage buckets

Create the following storage buckets in your Supabase project:
- `item-images`
- `student-ids`
- `avatars`

For a simple deployment, make these buckets public so that uploaded images can be read directly by the frontend. If you prefer private storage, update the app to use signed URLs when rendering images.

## Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase project values.

## Apply the schema

Use the Supabase CLI or the SQL editor in the Supabase dashboard:

```bash
# if you have the Supabase CLI installed
supabase db push --file supabase/schema.sql
```

Or open `supabase/schema.sql` in the Supabase SQL editor and run it directly.

## Notes

- `profiles` is linked to `auth.users`; users must sign up through Supabase Auth.
- `items.image_paths` stores uploaded paths for item photos in `item-images`.
- The frontend uses the `supabase` client to query data and upload images directly.
