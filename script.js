const apiKey = '9c08ecce5b4d544243a3ef44';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Função para buscar taxa de câmbio da API
async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        const response = await fetch(`${apiURL}${fromCurrency}`);
        const data = await response.json();

        if (data.result === 'success') {
            return data.conversion_rates[toCurrency];
        } else {
            throw new Error('Erro ao buscar a taxa de câmbio');
        }

    } catch (error) {
        console.error("Erro: ", error);
        return null;

    }
}

document.getElementById('currency-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const valor = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

    if (exchangeRate) {
        const convertedValue = valor * exchangeRate;
        // Exibir o resultado
        const conversao = document.getElementById('conversao');
        conversao.textContent = `Resultado: ${convertedValue.toFixed(2)} ${toCurrency}`;
    }

});