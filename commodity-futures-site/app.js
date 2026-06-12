const prices = {
    CL: { label: 'Crude Oil', value: 83.72 },
    GC: { label: 'Gold', value: 2054.30 },
    ZC: { label: 'Corn', value: 655.25 },
};

function formatPrice(value) {
    return `$${value.toFixed(2)}`;
}

function refreshMarketPrices() {
    document.querySelectorAll('.price').forEach((node) => {
        const symbol = node.dataset.symbol;
        const commodity = prices[symbol];
        if (!commodity) return;
        const drift = (Math.random() - 0.5) * 1.5;
        commodity.value = Math.max(commodity.value + drift, 10);
        node.textContent = formatPrice(commodity.value);
    });
}

function updateTradeResult(event) {
    event.preventDefault();
    const symbol = document.getElementById('commodity-select').value;
    const price = Number(document.getElementById('contract-price').value);
    const quantity = Number(document.getElementById('quantity').value);
    const direction = document.getElementById('direction-select').value;
    const current = prices[symbol].value;
    const pnl = direction === 'long' ? (current - price) * quantity * 100 : (price - current) * quantity * 100;

    const result = document.getElementById('trade-result');
    result.innerHTML = `
        <h3>Trade result</h3>
        <p><strong>${prices[symbol].label}</strong> current market price: <strong>${formatPrice(current)}</strong></p>
        <p>Position: <strong>${direction.toUpperCase()}</strong> ${quantity} contract(s) at <strong>${formatPrice(price)}</strong></p>
        <p>Estimated P/L: <strong>${pnl >= 0 ? '+' : '-'}${formatPrice(Math.abs(pnl))}</strong></p>
        <p class="trade-note">This is a simulated result for planning only.</p>
    `;
}

document.getElementById('trade-form').addEventListener('submit', updateTradeResult);
refreshMarketPrices();
setInterval(refreshMarketPrices, 4500);
