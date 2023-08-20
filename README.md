# Supabase Starter

Bitcoin turk - complete jobs, help improve models via RLHF, and get paid.


## How to use

1. Run `npm install` to install dependencies
1. Rename `.env.local.example` to `.env.local` and update the values for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api). Fill out `REPLICATE_API_TOKEN` obtained from your Replicate account as well. Also head to [Zeebeedee](dashboard.zebedee.io) to obtain an API Key for the payments.
1. Run `supabase/migrations/20230618024722_init.sql` against your Supabase DB by copying the Script and heading to the SQL Editor on the Supabase Dashboard with a Test user by going to Projects > Test Users on ZBD. Alternatively, you can pay to a lightning address by changing `sendGamertagPayments` to [this function call](https://github.com/zebedeeio/zbd-node)
1. Replace Gamertag in `glhf/components/turk/outputSelection.tsx`
1. Run `npm run dev` to start the local development server

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

### Create a Supabase client

Check out the [`/app/_examples`](./app/_examples/) folder for an example of creating a Supabase client in:

- [Client Components](./app/_examples/client-component/page.tsx)
- [Server Components](./app/_examples/server-component/page.tsx)
- [Route Handlers](./app/_examples/route-handler/route.ts)
- [Server Actions](./app/_examples/server-action/page.tsx)

Be sure to add `http://localhost:3000/**` under Auth > Redirect URLs.

### Model Schema

To insert

### Training with Argilla

To insert

## Relevant links

- [Argilla Training](https://docs.argilla.io/en/latest/guides/llms/examples/train-reward-model-rlhf.html)
