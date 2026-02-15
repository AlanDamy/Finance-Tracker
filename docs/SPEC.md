# Finance Tracker - Project Specification

## Problem Statement

I need a simple way to track my monthly expenses and income to understand where my money goes and stay within budget.

---

## User

**Primary:** Myself (CS student)  
**Secondary:** Other students who want lightweight expense tracking

---

## Core Features (Phase 1 - CLI)

### Must Have
- Add transactions (amount, category, description, date)
- List all transactions
- View transactions by date range
- Calculate current balance
- View spending summary by category
- Export data to CSV

### Nice to Have (Later Phases)
- Edit/delete transactions
- Recurring transactions
- Budget limits and alerts
- Multi-currency support
- Receipt attachments

---

## Out of Scope (For Now)

- Bank API integrations
- Multi-user support
- Mobile app
- Receipt scanning/OCR
- Investment tracking
- Bill reminders

---

## Technical Constraints

- **Single-user:** No authentication needed
- **Local-first:** Data stored in SQLite, no cloud sync
- **Offline:** Must work without internet
- **Lightweight:** Minimal dependencies

---

## Success Criteria

### Phase 1 Complete When:
- I can track all my expenses for a month using only the CLI
- Data persists across restarts
- I can export a CSV for my records
- Code is clean, tested, and documented

### Phase 2 Complete When:
- REST API exposes all CLI functionality
- Postman collection works end-to-end
- API has basic error handling

### Phase 3 Complete When:
- Web dashboard visualizes spending trends
- I prefer using the web UI over the CLI
- Charts are interactive and useful

---

## Non-Functional Requirements

- **Performance:** CLI commands respond instantly (<100ms)
- **Reliability:** No data loss on crash
- **Maintainability:** Clean code, easy to add features
- **Usability:** Clear error messages, helpful help text