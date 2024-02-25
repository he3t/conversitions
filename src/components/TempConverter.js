import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TempCel from '../celsius.png';

const TempConverter = () => {
    const [temperatures, setTemperatures] = useState([]);
    const [baseTemperature, setBaseTemperature] = useState(0);
    const [convertedTemperatureFahrenheit, setConvertedTemperatureFahrenheit] = useState();
    const [convertedTemperatureKelvin, setConvertedTemperatureKelvin] = useState();

    useEffect(() => {
        const fetchTemperatures = async () => {
            try {
                // Replace this API with the appropriate one that provides temperature data in Celsius
                const apiUrl = `https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max&latitude=0&longitude=0`;
                const response = await axios.get(apiUrl);
                const temperatureList = response.data.daily.temperature_2m_max;
                setTemperatures(temperatureList);
            } catch (error) {
                console.error('Error fetching temperatures:', error);
            }
        };

        fetchTemperatures();
    }, []);

    useEffect(() => {
        setConvertedTemperatureFahrenheit(convertTemperature(baseTemperature, 'Celsius', 'Fahrenheit'));
        setConvertedTemperatureKelvin(convertTemperature(baseTemperature, 'Celsius', 'Kelvin'));
    }, [baseTemperature]);

    const convertTemperature = (value, from, to) => {
        if (from === 'Celsius' && to === 'Fahrenheit') {
            return (value * 9 / 5) + 32;
        } else if (from === 'Celsius' && to === 'Kelvin') {
            return value + 273.15;
        } else {
            return value; // Conversion not needed
        }
    };

    const handleBaseTemperatureChange = (e) => {
        setBaseTemperature(parseFloat(e.target.value) || 0);
    };

    return (
        <div className="bg-gray-50 p-8 m-4 shadow-xl">
            <h1 className="pb-8 text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-400">
                    Temperature Converter
                </span>
            </h1>
            <form className="flex mb-4">
                <div className="mr-4">
                    <div className="relative">
                        <input
                            type="number"
                            id="temperature-input"
                            name="temperature-input"
                            className="py-2 pb-2.5 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-md text-base text-black font-semibold focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            placeholder={`Enter temperature (Celsius)`}
                            value={baseTemperature}
                            onChange={handleBaseTemperatureChange}
                        />
                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                            <img src={TempCel} className='w-5 h-5' />
                        </div>
                    </div>
                </div>
            </form>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 border">
                    <h2 className="text-xl font-bold mb-2">Fahrenheit</h2>
                    <p className="text-xl font-bold">{convertedTemperatureFahrenheit}</p>
                </div>
                <div className="bg-white p-4 border">
                    <h2 className="text-xl font-bold mb-2">Kelvin</h2>
                    <p className="text-xl font-bold">{convertedTemperatureKelvin}</p>
                </div>
            </div>
        </div>
    );
};

export default TempConverter;
