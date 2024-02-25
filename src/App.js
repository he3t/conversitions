import React from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import TempConverter from './components/TempConverter';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='my-10'>
        <CurrencyConverter  />
      </div>
      <div className='mb-10'>
        <TempConverter />
      </div>
    </div>
  );
}

export default App;
