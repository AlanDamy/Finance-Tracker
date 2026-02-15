# Development Roadmap

## Phase 1: CLI (Weeks 1-3)

Goal: Functional command-line tool for personal expense tracking.

---

### Week 1: Foundation

**Goal:** Database setup + basic add/list functionality

#### Tasks
- [ ] **Database Layer**
  - [ ] Write `schema.sql` with CREATE TABLE statements
  - [ ] Write `connection.js` to initialize SQLite
  - [ ] Seed categories in database
  - [ ] Write `queries.js` helper functions:
    - `addTransaction(amount, categoryId, description, date)`
    - `getAllTransactions()`
    - `getCategories()`

- [ ] **CLI Commands**
  - [ ] Parse command-line arguments (use `process.argv` or `commander`)
  - [ ] Implement `finance add <amount> <category> <description>`
  - [ ] Implement `finance list` (show all transactions)

- [ ] **Testing**
  - [ ] Manually test add/list with sample data
  - [ ] Verify data persists across restarts

**Deliverable:** Can add and view transactions via CLI.

---

### Week 2: Core Features

**Goal:** Balance calculation, filtering, and summary views

#### Tasks
- [ ] **CLI Commands**
  - [ ] Implement `finance balance` (show current balance)
  - [ ] Implement `finance list --month YYYY-MM` (filter by month)
  - [ ] Implement `finance summary` (spending by category)
  - [ ] Implement `finance summary --month YYYY-MM` (monthly summary)

- [ ] **Query Functions**
  - [ ] Add `getBalance()` - returns SUM(amount)
  - [ ] Add `getTransactionsByMonth(year, month)`
  - [ ] Add `getSummaryByCategory(startDate, endDate)`

- [ ] **Input Validation**
  - [ ] Validate amount is a number
  - [ ] Validate category exists
  - [ ] Validate date format (or accept "today", "yesterday")
  - [ ] Show helpful error messages

**Deliverable:** Can view balance, filter transactions, and see spending breakdown.

---

### Week 3: Polish & Export

**Goal:** CSV export, better UX, code cleanup

#### Tasks
- [ ] **CSV Export**
  - [ ] Implement `finance export <filename.csv>`
  - [ ] Include headers: Date, Amount, Category, Description
  - [ ] Handle file write errors gracefully

- [ ] **UX Improvements**
  - [ ] Add `--help` flag to all commands
  - [ ] Format currency properly ($1,234.56)
  - [ ] Color-code output (optional: use `chalk` library)
  - [ ] Add confirmation messages ("✓ Transaction added")

- [ ] **Code Quality**
  - [ ] Refactor repeated code into utils
  - [ ] Add JSDoc comments to functions
  - [ ] Write basic unit tests (optional but recommended)

- [ ] **Documentation**
  - [ ] Update README with usage examples
  - [ ] Add screenshots of CLI output
  - [ ] Document all commands

**Deliverable:** Polished CLI ready for daily use.

---

## Phase 2: REST API (Week 4)

Goal: Expose backend functionality via HTTP endpoints.

### Tasks
- [ ] Set up Express server
- [ ] Define routes:
  - `GET /api/transactions` - List all transactions
  - `POST /api/transactions` - Add a transaction
  - `GET /api/transactions/:id` - Get single transaction
  - `GET /api/balance` - Get current balance
  - `GET /api/summary?month=YYYY-MM` - Category summary
  - `GET /api/categories` - List categories
- [ ] Add request validation middleware
- [ ] Add error handling middleware
- [ ] Enable CORS for frontend
- [ ] Test all endpoints with Postman/curl
- [ ] Document API in `docs/API.md`

**Deliverable:** Working REST API that CLI and future frontend can use.

---

## Phase 3: React Dashboard (Weeks 5-7)

Goal: Visual interface with charts and better UX.

### Week 5: Setup & Basic UI
- [ ] Initialize React app (Vite or Create React App)
- [ ] Set up API client (fetch or axios)
- [ ] Build transaction form component
- [ ] Build transaction list component
- [ ] Add basic styling (CSS or Tailwind)

### Week 6: Visualizations
- [ ] Install charting library (Chart.js or Recharts)
- [ ] Build spending by category chart (pie/donut)
- [ ] Build balance over time chart (line)
- [ ] Build monthly comparison chart (bar)

### Week 7: Filters & Polish
- [ ] Add date range filter
- [ ] Add category filter
- [ ] Add search by description
- [ ] Make charts responsive
- [ ] Add loading states
- [ ] Add error handling
- [ ] Deploy frontend + backend

**Deliverable:** Fully functional web dashboard.

---

## Backlog (Future Enhancements)

Ideas for after Phase 3:

- [ ] Edit/delete transactions
- [ ] Recurring transactions
- [ ] Budget limits with alerts
- [ ] Multiple accounts (checking, savings, credit card)
- [ ] Dark mode
- [ ] Import from CSV
- [ ] Mobile-responsive improvements
- [ ] PWA for offline use
- [ ] Multi-user support (requires auth)
- [ ] Bank API integration (Plaid)

---

## Time Estimates

| Phase | Duration | Effort |
|-------|----------|--------|
| Phase 1 (CLI) | 3 weeks | ~15-20 hours |
| Phase 2 (API) | 1 week | ~5-8 hours |
| Phase 3 (Frontend) | 3 weeks | ~15-20 hours |
| **Total** | **7 weeks** | **~35-50 hours** |

Assumes ~5-7 hours/week of focused work.