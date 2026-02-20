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
                 ORDER BY t.transaction_Date ASC`;
    return await db.all(sql);
};

const getBalance = async () => {
    const db = getDatabase();
    const result = await db.get('SELECT SUM(amount) as balance FROM transactions');
    return result.balance || 0;
};

const getTransactionsByMonth = async (year, month) => {
    const db = getDatabase();
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-31`;
    
    const sql = `SELECT t.*, c.name AS category_name, c.type AS category_type
                 FROM transactions t
                 JOIN categories c ON t.category_id = c.id
                 WHERE t.transaction_date >= ? AND t.transaction_date <= ?
                 ORDER BY t.transaction_date ASC`;
    
    return await db.all(sql, [startDate, endDate]);
};

const getSummaryByCategory = async (year, month) => {
    const db = getDatabase();
    let sql = `SELECT c.name AS category_name,
                      c.type AS category_type,
                      SUM(t.amount) AS total
               FROM transactions t
               JOIN categories c ON t.category_id = c.id`;
    
    const params = [];
    
    if (year && month) {
        const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
        const endDate = `${year}-${String(month).padStart(2, '0')}-31`;
        sql += ` WHERE t.transaction_date >= ? AND t.transaction_date <= ?`;
        params.push(startDate, endDate);
    }
    
    sql += ` GROUP BY c.id ORDER BY c.type, total DESC`;
    
    return await db.all(sql, params);
};



module.exports = {
    getCategories,
    addTransaction,
    getAllTransactions,
    getBalance,
    getTransactionsByMonth,
    getSummaryByCategory
}