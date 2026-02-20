const { Command } = require('commander');
const { getSummaryByCategory } = require('../../db/queries');
const { formatCurrency, formatTable } = require('../utils/formatting');

const summaryCommand = new Command('summary')
    .description('Show spending summary by category')
    .option('--month <YYYY-MM>', 'Filter by month (e.g., 2026-02)')
    .action(async (options) => {
        let year, month;
        
        if (options.month) {
            const match = options.month.match(/^(\d{4})-(\d{2})$/);
            if (!match) {
                console.error('Error: Invalid month format. Use YYYY-MM (e.g., 2026-02)');
                process.exit(1);
            }
            year = parseInt(match[1]);
            month = parseInt(match[2]);
        }
        
        const summary = await getSummaryByCategory(year, month);
        
        if (summary.length === 0) {
            console.log('No transactions found.');
            return;
        }
        
        const rows = summary.map((s) => [
            s.category_name,
            s.category_type,
            formatCurrency(s.total)
        ]);
        
        const headers = ['Category', 'Type', 'Total'];
        console.log(formatTable(headers, rows));
    });

module.exports = summaryCommand;






