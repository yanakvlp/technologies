from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Ваш API-ключ Open Exchange Rates
API_KEY = 'ffed118769fc9c5f933e278a'


def get_exchange_rates():
    """Получение актуальных курсов валют с Open Exchange Rates"""
    url = f'https://openexchangerates.org/api/latest.json?app_id={API_KEY}'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return data['rates']
    else:
        print(f"Ошибка при получении данных: {response.status_code}")
        return {}


def get_crypto_rates():
    """Получение актуальных курсов криптовалют"""
    url = f'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether&vs_currencies=usd'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return {
            'BTC': data['bitcoin']['usd'],
            'USDT': data['tether']['usd']
        }
    else:
        print(f"Ошибка при получении данных: {response.status_code}")
        return {}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_rates', methods=['GET'])
def get_rates():
    exchange_rates = get_exchange_rates()
    crypto_rates = get_crypto_rates()
    return jsonify({
        'exchange_rates': exchange_rates,
        'crypto_rates': crypto_rates
    })


@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()
    from_currency = data['from_currency']
    to_currency = data['to_currency']
    amount = data['amount']

    # Получаем актуальные курсы
    exchange_rates = get_exchange_rates()

    if not exchange_rates:
        return jsonify({"error": "Unable to fetch exchange rates."})

    # Проверяем, что валюта существует в курсах
    if from_currency not in exchange_rates or to_currency not in exchange_rates:
        return jsonify({"error": "Invalid currencies."})

    # Конвертация для обычных валют
    if from_currency != 'USD':
        amount = amount / exchange_rates[from_currency]  # Переводим в доллары

    result = amount * exchange_rates[to_currency]  # Переводим из долларов в нужную валюту

    return jsonify({"result": round(result, 2)})


if __name__ == '__main__':
    app.run(debug=True)
