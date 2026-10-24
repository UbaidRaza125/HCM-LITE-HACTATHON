# HCM Lite interview guide

## Architecture
The browser presents role-aware screens. Next.js Route Handlers are the trusted boundary for protected actions. Firebase Authentication identifies the user, Firestore stores company-scoped records, and Firebase Admin verifies sessions and performs privileged operations.

## Security
The server checks identity, role, company, and record ownership on every protected request. The AI assistant receives only allowlisted tool results; it never receives a database connection or arbitrary query ability.

## Business rules
Attendance transitions are validated on the server and remain unique per employee and day. Leave balances count working days after weekends and configured holidays are excluded. Payroll is calculated from reusable JavaScript functions and finalized runs become immutable.

## Honest empty states
A new company starts with zero employees and zero activity. The interface explains what to configure next instead of inventing numbers for the demo.
