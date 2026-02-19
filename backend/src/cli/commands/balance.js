const { Command } = require('commander');
const { getBalance } = require('../../db/queries');
const { formatCurrency } = require('../utils/formatting');

const balanceCommand = new Command('balance')
    .description('Show current balance')
    .action(async () => {
        const balance = await getBalance();
        console.log(`Current balance: ${formatCurrency(balance)}`);
    });

module.exports = balanceCommand;






