const { Command } = require('commander');
const { getAllTransactions } = require('../../db/queries');
const { closeDatabase } = require('../../db/connection');
const { formatCurrency, formatTable } = require('../utils/formatting');

const listCommand = new Command('list')
    .description('List all transactions')
    .action(async () => {
        try {
            const transactions = await getAllTransactions();

            if (transactions.length === 0) {
                console.log('No transactions found.');
                return;
            }

            const rows = transactions.map(t => [
                String(t.id),
                t.transaction_date,
                t.category_name,
                formatCurrency(t.amount),
                t.description || '-',
            ]);

            const headers = ['ID', 'Date', 'Category', 'Amount', 'Description'];
            console.log(formatTable(headers, rows));
            console.log(`\n${transactions.length} transaction(s) total.`);
        } catch (error) {
            console.error('Error listing transactions:', error.message);
        } finally {
            await closeDatabase();
        }
    });

module.exports = listCommand;