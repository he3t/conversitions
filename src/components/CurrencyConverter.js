// src/components/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState();
    const [convertedAmount, setConvertedAmount] = useState();

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_NNVsuNAtrL03lQDvlFpiUCkKc2Amlpe8Vr7phN6D`;
                const response = await axios.get(apiUrl);
                const rates = response.data.data;
                const currencyList = Object.keys(rates);
                setCurrencies(currencyList);
                setExchangeRate(rates[toCurrency]);
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        fetchCurrencies();
    }, [toCurrency]);

    useEffect(() => {
        if (exchangeRate) {
            setConvertedAmount((parseFloat(amount) * exchangeRate).toFixed(2));
        }
    }, [amount, exchangeRate]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    };

    return (

        <div className="bg-gray-50 p-8 m-4 shadow-xl">
            <h1 class="pb-8 text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Currency Converter</span></h1>
            <form className="flex mb-4">
                <div className='mr-4'>
                    <div class="relative">
                        <input type="number" id="hs-leading-icon" name="hs-leading-icon" class="py-2 pb-2.5 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-md text-base text-black font-semibold focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter amount (USD $)" value={amount} onChange={handleAmountChange} />
                        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <select className="border p-2 mr-4 rounded-md" value={toCurrency} onChange={handleToCurrencyChange}>
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </form>
            <div className="grid grid-cols-3 gap-4">
                <div class="bg-white p-4 border">
                    <h2 class="text-xl font-bold mb-2">{fromCurrency}</h2>
                    <p class="text-xl font-bold">{amount}</p>
                </div>
                <div class="bg-white p-4 border">
                    <h2 class="text-xl font-bold mb-2">{toCurrency}</h2>
                    <p class="text-xl font-bold">{convertedAmount}</p>
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
