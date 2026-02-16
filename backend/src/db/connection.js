const path = require('path');
const fs = require('fs').promises;
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
let db = null;

const initDatabase = async () => {
    try{
        db = await open({
            filename: path.join(__dirname, '../../data/finance.db'),
            driver: sqlite3.Database
        });

        await db.exec(`PRAGMA foreign_keys = ON;`);

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = await fs.readFile(schemaPath, 'utf-8');
        await db.exec(schema);

        console.log('Database connection established'); 
        console.log('Schema initialized successfully');

        return db;
    } catch (e) {
        console.error('Error connecting to database:', e);
        throw e;
    }
}

const getDatabase = () => {
    if (!db) {
        throw new Error('Database connection not established. Call initDatabase() first.');
    }
    return db;
}

const closeDatabase = async () => {
    if(db) {
        await db.close();
        db = null;
        console.log('Database connection closed');
    }
}

module.exports = {
    initDatabase,
    getDatabase,
    closeDatabase
};