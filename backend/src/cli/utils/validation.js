const validateAmount = (raw) => {
    const n = parseFloat(raw);
    if(isNaN(n)) return null;
    return n;
};

const validateDate = (raw) => {
    if (!raw || raw == 'today'){
        return new Date().toISOString().slice(0,10);
    }
    if(!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
    return raw;
};

module.exports = {
    validateAmount,
    validateDate,
}