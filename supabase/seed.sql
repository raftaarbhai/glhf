
-- Create a table called "data" with columns "prompt", "response-1", "response-2", "category", "original_response", and "external_id"
create table
  data (
    prompt text,
    "response-1" text,
    "response-2" text,
    category text,
    original_response text,
    external_id text,
    id integer primary key generated always as identity
  );
