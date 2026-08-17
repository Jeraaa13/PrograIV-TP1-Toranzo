# Sala de Juegos (Game Room)

Angular app built for the Programacion IV course at UTN. A game room with four mini-games,
user accounts, real-time chat and a leaderboard.

## Features

- Auth (login/register) with Supabase, route guards on all game routes
- Four games: Hangman, Higher-or-Lower (card deck), Trivia (Preguntados), and a Guitar Hero clone
- "Who am I" guessing game using the Unsplash API
- Real-time chat (Supabase)
- Leaderboard / results screen
- Custom validators for username and password fields

## Stack

Angular 21 (standalone components, lazy-loaded routes), Supabase (Auth + Realtime + DB),
Unsplash API, Bootstrap, SweetAlert2

## Running locally

```bash
cd PrograIV-TP1-Toranzo
npm install
ng serve
```

Needs a `src/environments/environment.ts` with `supabaseUrl`, `supabaseKey`, and `unsplashKey`.
