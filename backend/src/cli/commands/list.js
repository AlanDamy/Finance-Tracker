const { Command } = require('commander');
const { getAllTransactions, getTransactionsByMonth } = require('../../db/queries');
const { formatCurrency, formatTable } = require('../utils/formatting');

const listCommand = new Command('list')
    .description('List all transactions')
    .option('--month <YYYY-MM>', 'Filter by month (e.g., 2026-02)')
    .action(async (options) => {
        let transactions;
        
        if (options.month) {
            // Parse YYYY-MM
            const match = options.month.match(/^(\d{4})-(\d{2})$/);
            if (!match) {
                console.error('Error: Invalid month format. Use YYYY-MM (e.g., 2026-02)');
                process.exit(1);
            }
            const year = parseInt(match[1]);
            const month = parseInt(match[2]);
            transactions = await getTransactionsByMonth(year, month);
        } else {
            transactions = await getAllTransactions();
        }

        if (transactions.length === 0) {
            console.log('No transactions found.');
            return;
        }

        const rows = transactions.map((t) => [
            String(t.id),
            t.transaction_date,
            formatCurrency(t.amount),
            t.category_name,
            t.description || '-',
        ]);

        const headers = ['ID', 'Date', 'Amount', 'Category', 'Description'];
        console.log(formatTable(headers, rows));
        console.log(`${transactions.length} transaction(s) total.`);
    });

module.exports = listCommand;