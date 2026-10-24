# HCM Lite implementation plan

## Phase 1 — Foundation
- Premium responsive app shell
- Role-aware navigation surface
- Honest empty-state dashboards
- Shared visual language for metrics, panels, buttons, and AI surfaces

## Phase 2 — Access and setup
- [x] Firebase email/password sign-in
- [x] First-run company and Admin setup
- [ ] Server-verified session cookie
- [ ] Role and company guards in every protected route

## Phase 3 — Core people operations
- [x] Company settings record and initial company persistence
- [x] Employee registration, search, and duplicate-ID protection
- [ ] Departments, designations, leave types, and holidays
- [ ] Employee account creation and temporary password flow
- Attendance transitions with one record per employee per day
- Leave balance, overlap, working-day, and approval rules

## Phase 4 — Payroll and insight
- Pure payroll and tax calculation functions
- Draft and finalized payroll runs
- Payslip visibility scoped to the current employee
- Server-aggregated analytics and audit records

## Phase 5 — AI and quality
- Gemini server integration with allowlisted tools
- Scoped policy Q&A, dashboard summaries, and leave parsing
- Security rules, authorization tests, calculation tests, and full demo verification

## Important brief rules
- Office start 09:00 with a 15-minute grace period
- Half day for less than 5 working hours
- Saturday and Sunday are weekends
- Annual 14, sick 8, casual 10, unpaid unlimited
- Gross salary is 1.5 × basic salary
- HRA is 40% of basic and medical is 10% of basic
- Finalized payroll cannot be silently changed
