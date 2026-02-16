const { getDatabase } = require('./connection');

const getCategories = async () => {
    const db = getDatabase();
    return await db.all('SELECT * FROM categories ORDER BY type, name');
};

const addTransaction = async (amount, category_id, description, _date) => {
    const db = getDatabase();
    const sql = `INSERT INTO transactions (amount, category_id, description, transaction_date) VALUES (?,?,?,?)`;
    const result = await db.run(sql, [amount, category_id, description, _date]);
    return result.lastID;
};

const getAllTransactions = async () => {
    const db = getDatabase();
    const sql = `SELECT t.*, c.name AS category_name, c.type AS category_type
                 FROM transactions t
                 JOIN categories c ON t.category_id = c.id
                 ORDER BY t.transaction_Date DESC`;
    return await db.all(sql);
};

module.exports = {
    getCategories,
    addTransaction,
    getAllTransactions
}