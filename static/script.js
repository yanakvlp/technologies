// Конфигурация графиков для валют
var ctx1 = document.getElementById('currencyChart1').getContext('2d');
var currencyChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'USD to UAH',
            data: [40, 42, 43, 44, 44.5, 45],
            borderColor: '#1f8ef1',
            backgroundColor: 'rgba(31, 142, 241, 0.1)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
});

var ctx2 = document.getElementById('currencyChart2').getContext('2d');
var currencyChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'BTC to USD',
            data: [35000, 40000, 42000, 45000, 48000, 50000],
            borderColor: '#ff6347',
            backgroundColor: 'rgba(255, 99, 71, 0.1)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
});

// Функция для обновления графиков в зависимости от выбранной валюты
function updateChart(chart, selectedCurrency) {
    var data = {
        'USD': [40, 42, 43, 44, 44.5, 45],
        'EUR': [35, 37, 39, 41, 42, 43],
        'UAH': [1, 1.1, 1.2, 1.3, 1.4, 1.5]
    };

    var cryptoData = {
        'BTC': [35000, 40000, 42000, 45000, 48000, 50000],
        'USDT': [1, 1.01, 1.02, 1.03, 1.04, 1.05]
    };

    var labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    if (chart === 'chart1') {
        currencyChart1.data.datasets[0].data = data[selectedCurrency];
        currencyChart1.update();
    } else if (chart === 'chart2') {
        currencyChart2.data.datasets[0].data = cryptoData[selectedCurrency];
        currencyChart2.update();
    }
}

// Обработчики событий для выбора валют и обновления графиков
document.getElementById('currencySelector1').addEventListener('change', function () {
    var selectedCurrency = this.value;
    updateChart('chart1', selectedCurrency);
});

document.getElementById('currencySelector2').addEventListener('change', function () {
    var selectedCurrency = this.value;
    updateChart('chart2', selectedCurrency);
});

// Конвертация валют
document.getElementById('convertBtn').addEventListener('click', function () {
    var fromCurrency = document.getElementById('currencyFrom').value;
    var toCurrency = document.getElementById('currencyTo').value;
    var amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount)) {
        document.getElementById('conversionResult').innerText = 'Please enter a valid amount.';
        return;
    }

    // Примерные курсы для конвертации
    var conversionRates = {
        'USD-UAH': 44,
        'USD-EUR': 0.91,
        'EUR-USD': 1.1,
        'UAH-USD': 0.022,
        'BTC-USD': 40000,
        'USDT-USD': 1
    };

    var conversionKey = fromCurrency + '-' + toCurrency;

    if (conversionRates[conversionKey]) {
        var convertedAmount = amount * conversionRates[conversionKey];
        document.getElementById('conversionResult').innerText = `Converted amount: ${toCurrency} ${convertedAmount.toFixed(2)}`;
    } else {
        document.getElementById('conversionResult').innerText = 'Conversion not available.';
    }
});
