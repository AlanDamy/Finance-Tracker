const formatCurrency = (amount) => {
    const abs = Math.abs(amount).toFixed(2);
    return amount < 0 ? `-$${abs}` : `$${abs}`;
};

const formatTable = (headers, rows) => {
    const all = [headers, ...rows];
    const widths = headers.map((_, i) => Math.max(...all.map(row => row[i].length)));

    const formatRow = (row) => row.map((cell, i) => cell.padEnd(widths[i])).join(' | ');
    const seperator = widths.map(w => '-'.repeat(w)).join('-+-');

    return [formatRow(headers), seperator, ...rows.map(formatRow)].join('\n');
};

module.exports = {
    formatCurrency,
    formatTable,
}