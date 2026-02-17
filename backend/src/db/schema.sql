CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK(type IN ('income', 'expense'))
);

CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category_id INTEGER NOT NULL,
    description TEXT,
    transaction_date TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT OR IGNORE INTO categories (name, type) VALUES
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