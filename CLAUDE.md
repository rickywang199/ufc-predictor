# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Next.js)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint

npx prisma migrate dev --name <migration_name>   # Create and apply a new migration
npx prisma migrate deploy                        # Apply pending migrations (production)
npx prisma generate                              # Regenerate Prisma client after schema changes
npx prisma studio                                # Open Prisma Studio GUI
```

There are no test commands configured.

## Architecture

This is a **Next.js 16 UFC fight prediction web app** using the App Router, React 19, TypeScript, Tailwind CSS, and PostgreSQL via Supabase with Prisma ORM.

### Auth System

Authentication uses **NextAuth v5 (beta)** with three providers: GitHub OAuth, Google OAuth, and credentials (username + bcrypt password). The Prisma adapter backs session/account storage.

- Config: `src/auth.ts`
- Server actions (login, register, logout): `src/lib/actions/authActions.ts`
- NextAuth route handler: `src/app/api/auth/[...nextauth]/route.ts`
- DB singleton: `src/lib/db.ts` (Prisma client with dev logging)

### Database Schema (Prisma + Supabase)

Two main domains in `prisma/schema.prisma`:

**Auth models:** `User`, `Account`, `Session`, `VerificationToken` — standard NextAuth adapter schema.

**UFC models:**
- `Fighter` — base fighter info (class, weight, reach, stance, ELO ratings, win/loss record)
- `FightResults` — links two fighters, stores method of victory, rounds, date
- `PerFightStats` → `PerStrikingStats` + `PerGrapplingStats` — per-fight statistics for each fighter
- `AvgFighterStats` → `AvgStrikingStats` + `AvgGrapplingStats` — aggregated averages across all fights

Fighter is the root entity; stats are children. `AvgFighterStats` is optional on `Fighter` (not required at creation).

### Enums

- `fightStatus`: `WON`, `LOST`, `TIED`, `CANCELED`
- `MethodOfVictory`: `KO_TKO`, `SUBMISSION`, `UNANIMOUS_DECISION`, `MAJORITY_DECISION`, `SPLIT_DECISION`, `NO_CONTEST`, `DQ`, `DOCTOR_STOPPAGE`

### Path Alias

`@/*` maps to `./src/*`.

### Environment

Requires `.env.local` with:
- `DATABASE_URL` / `DIRECT_URL` (Supabase connection strings — pooled vs. direct)
- `AUTH_SECRET`
- `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`
- `AUTH_RESEND_KEY` (email via Resend)
