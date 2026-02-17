const { Command } = require('commander');
const { getCategories, addTransaction } = require('../../db/queries');
const { closeDatabase } = require('../../db/connection');
const { formatCurrency } = require('../utils/formatting');
const { validateAmount, validateDate } = require('../utils/validation');

const addCommand = new Command('add')
    .description('Add a new transaction')
    .argument('<amount>', 'Transaction amount (positive for income, negative for expense)')
    .argument('<category>', 'Transaction category (e.g. Food, Salary, etc.)')
    .argument('<description>', 'Short description for the transaction')
    .option('-d, --date <date>', 'Transaction date (YYYY-MM-DD or "today")', 'today')
    .action(async (amountarg, categoryarg, description, options) => {
        try {
            const amount = validateAmount(amountarg);
            if (amount === null) {
                console.error('Invalid amount. Please enter a valid number.');
                process.exit(1);
            }

            const date = validateDate(options.date);
            if (date === null) {
                console.error('Invalid date. Please enter a date in YYYY-MM-DD format or "today".');
                process.exit(1);
            }

            const categories = await getCategories();
            const match = categories.find(c => c.name.toLowerCase() === categoryarg.toLowerCase());

            if (!match) {
                const names = categories.map(c => `  ${c.name} (${c.type})`).join('\n');
                console.error(`Category not found. Available categories:\n${names}`);
                process.exit(1);
            }

            const id = await addTransaction(amount, match.id, description, date);
            console.log(`✓ Transaction added successfully!`);
            console.log(`ID: ${id} | Amount: ${formatCurrency(amount)} | Category: ${match.name} | Date: ${date}`);
        } catch (error) {
            console.error('Error adding transaction:', error.message);
            process.exit(1);
        } finally {
            await closeDatabase();
        }
    });

module.exports = addCommand;