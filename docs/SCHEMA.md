# Database Schema

## Overview

Simple relational schema with two main tables: `categories` and `transactions`.

---

## Tables

### `categories`

Predefined list of transaction categories.
```sql
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK(type IN ('income', 'expense'))
);
```

**Columns:**
- `id` - Auto-incrementing primary key
- `name` - Category name (unique, e.g., "Groceries", "Salary")
- `type` - Either "income" or "expense"

**Seed Data:**
```sql
INSERT INTO categories (name, type) VALUES
    ('Salary', 'income'),
    ('Freelance', 'income'),
    ('Groceries', 'expense'),
    ('Rent', 'expense'),
    ('Transportation', 'expense'),
    ('Entertainment', 'expense'),
    ('Utilities', 'expense'),
    ('Dining Out', 'expense'),
    ('Healthcare', 'expense'),
    ('Other', 'expense');
```

---

### `transactions`

Individual income/expense records.
```sql
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category_id INTEGER NOT NULL,
    description TEXT,
    transaction_date TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

**Columns:**
- `id` - Auto-incrementing primary key
- `amount` - Transaction amount (positive = income, negative = expense)
- `category_id` - Foreign key to `categories.id`
- `description` - Optional note (e.g., "Weekly groceries at Costco")
- `transaction_date` - When the transaction occurred (ISO 8601: "2025-02-15")
- `created_at` - When the record was added to the database

---

## Design Decisions

### Why use signed `amount` instead of separate columns?

**Decision:** Single `amount` field; positive = income, negative = expense

**Reasoning:**
- Simpler balance calculation: `SELECT SUM(amount) FROM transactions`
- Fewer columns to manage
- Natural representation (debits/credits in accounting)

**Trade-off:** Slightly less explicit than separate `income`/`expense` columns, but easier to query.

---

### Why TEXT for dates?

**Decision:** Store dates as ISO 8601 strings (`"2025-02-15"`)

**Reasoning:**
- SQLite doesn't have a native DATE type
- ISO 8601 strings sort correctly lexicographically
- Human-readable in raw database queries
- Easy to parse in JavaScript (`new Date(dateString)`)

**Trade-off:** Slightly more storage than Unix timestamps, but much easier to debug.

---

### Why separate `transaction_date` and `created_at`?

**Decision:** Two date fields

**Reasoning:**
- `transaction_date` = when the expense/income actually happened (user input)
- `created_at` = audit trail (when the record was added)
- Allows retroactive entry (e.g., adding yesterday's coffee purchase today)

**Use case:** User adds transactions at end of week but wants to track them by actual date.

---

### Why foreign key to `categories`?

**Decision:** Enforce referential integrity with FK constraint

**Reasoning:**
- Prevents typos ("groceries" vs "Groceries" vs "grocery")
- Ensures valid categories
- Makes queries faster (indexed lookups)
- Easy to rename categories globally

**Trade-off:** Users can't create custom categories on the fly (by design for Phase 1; can add later).

---

## Future Enhancements (Not in Phase 1)

### Tags Table
For multi-tagging (e.g., "groceries + bulk-buy + weekly")
```sql
CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE transaction_tags (
    transaction_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (transaction_id, tag_id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

### Recurring Transactions Table
For subscriptions, monthly bills
```sql
CREATE TABLE recurring_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category_id INTEGER NOT NULL,
    description TEXT,
    frequency TEXT NOT NULL CHECK(frequency IN ('daily', 'weekly', 'monthly', 'yearly')),
    next_date TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

---

## Indexes (Add Later for Performance)
```sql
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_category ON transactions(category_id);
```

Not needed for Phase 1 (small dataset), but add when dataset grows.