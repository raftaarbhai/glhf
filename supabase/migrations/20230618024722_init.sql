-- Create a table called "data" with columns "prompt", "response-1", "response-2", "category", "original_response", and "external_id"
create table if not exists
  data (
    prompt text,
    "response_one" text,
    "response_two" text,
    "response_three" text,
    "response_four" text,
    category text,
    original_response text,
    external_id text,
    id integer primary key generated always as identity
  );

alter table data
add column user_id uuid references auth.users (id) on delete cascade;

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table data
  enable row level security;

create policy "Authenticated users can select their own data" on data
  for select to authenticated using (true);

create policy "Authenticated users can insert their own data" on data
  for insert to authenticated with check (auth.uid() = user_id);
