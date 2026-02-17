const { Command } = require('commander');
const { initDatabase, closeDatabase } = require('../db/connection');
const listCommand = require('./commands/list');
const addCommand = require('./commands/add');

const program = new Command();

program
    .name('finance-tracker')
    .description('A CLI tool to track your finances')
    .version('1.0.0');

program.addCommand(addCommand);
program.addCommand(listCommand);

(async () => {
    try {
        await initDatabase();
        await program.parseAsync(process.argv);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
})();