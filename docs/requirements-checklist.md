# HCM Lite requirements checklist

## Source brief distilled
- [x] Three roles: Admin, HR, Employee
- [x] Empty-first experience with no fabricated employee or KPI data
- [x] Role-aware navigation and dashboard surfaces
- [x] Firebase Authentication for sign-in and first-run setup
- [ ] Firestore persistence beyond the initial company record and server authorization
- [ ] Organization setup: company, departments, designations, leave types, holidays
- [x] Employee records, search, duplicate-ID protection, and company-scoped creation
- [ ] Employee account creation and temporary password flow
- [ ] Attendance rules: 09:00 start, 15-minute grace, half day under 5 hours, weekends
- [ ] Leave quotas: annual 14, sick 8, casual 10, unpaid unlimited
- [ ] Payroll formulas and tax slabs from brief
- [ ] Analytics from persisted data
- [ ] Gemini assistant with scoped server tools
- [ ] Announcements, notifications, and audit log
- [ ] Firestore rules, tests, README, demo script, interview guide

## Current delivery
- Visual foundation: implemented and build-verified
- Backend workflows: not started
- AI integration: not started
- Verification: production build passed; user workflows not yet verified

## Assumptions from the brief
- The official PDF is the source of truth for rules and permissions.
- Optional camera and face detection are deferred until core web workflows are stable.
- New installations show setup guidance rather than invented KPIs.
