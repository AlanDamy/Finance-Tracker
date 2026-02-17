const {Command  } = require('commander');
const { getAllTransactions } = require('../../db/queries');
const { formatCurrency, formatTable } = require('../../utils/format');

const listCommand = new Command('list')
    .description('List all transactions')
    .action(async () => {
        const transactions = await getAllTransactions();

        if(transactions.length === 0){
            console.log('No transactions found.');
            return;
        }

        const rows = transactions.map(t => [
            String(t.id),
            t.trasaction_date,
            t.category_name,
            formatCurrency(t.amount),
            t.description || '-',
        ]);

        const headers = formatTable(['ID', 'Date', 'Category', 'Amount', 'Description']);
        console.log(formatTable(headers, rows));
        console.log(`${transactions.length} transaction(s) total.`);
    });

    modiule.exports = listCommand;