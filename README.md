# HCM Lite

A JavaScript and JSX Next.js app for the Saylani HCM Lite hackathon brief.

## Status

The project currently contains the premium responsive application shell, an honest empty-state dashboard, Firebase sign-in, first-run company setup, and initial Firestore company persistence. Employee workflows, server authorization for protected operations, payroll calculations, and the scoped Gemini assistant remain tracked in `docs/requirements-checklist.md`.

## Planned architecture

- Next.js App Router and Route Handlers
- Firebase Authentication for sign-in and first-run setup
- Firestore for company-scoped records
- Firebase Admin SDK for trusted server operations
- Gemini through a server-only integration with allowlisted tools
- JavaScript and JSX only

No employee, attendance, payroll, or analytics data is seeded.
