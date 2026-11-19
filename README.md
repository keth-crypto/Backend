# Backend

## Deploy to Vercel

Import `keth-crypto/Backend` as a Vercel project with the repository root as the
project root. The included Vercel configuration builds the NestJS application
and routes requests to its serverless Express handler.

Set these environment variables in the Vercel project settings. Do not commit
them or put their values in this repository:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_PORT` (optional; defaults to `3306`)
- `JWT_ACCESS_TOKEN_SECRET`
- `JWT_REFRESH_TOKEN_SECRET`

The MySQL server must accept connections from the deployed function. Deploying
the `main` branch on GitHub will trigger a deployment after the repository is
connected to the Vercel project. The API root (`/`) returns a health message.
