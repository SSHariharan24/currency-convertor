import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

function App() {
const [amount,setAmount]= useState(1); 
const [fromCurrency,setFromCurrency]= useState("USD"); 
const [toCurrency,setToCurrency]= useState("INR"); 
const [convertedAmount,setConvertedAmount]= useState(null); 
const [exchangeRate,setExchangeRate]= useState(null);
useEffect(() =>{
  const getExchangeRate = async() => {
    try {
      let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
      const res = await axios.get(url);
      setExchangeRate(res.data.rates[toCurrency])
    } catch (error) {
      console.log("Error fetching exchange rate:",error);
    }
  };
  getExchangeRate();
},[fromCurrency,toCurrency]);

useEffect(()=> {
  if(exchangeRate !== null){
    setConvertedAmount((amount * exchangeRate).toFixed(2))
  }
},[amount,exchangeRate])

const handleAmountChange = (e) => {
  const value = parseFloat(e.target.value);
  setAmount(isNaN(value)? 0 : value);
};

const handleFromCurrency = (e) => {
  setFromCurrency(e.target.value);
}

const handleToCurrency = (e) => {
  setToCurrency(e.target.value);
}
return (
    <>
      <div className="currency-convertor">
        <div className="box"></div>
        <div className="data">
          <h1>currency convertor</h1>
          <label htmlFor="amt">Amount:</label>
          <input type="number" id='amt' value={amount} onChange={handleAmountChange}/>
        
        <div className="input-container">
          <label htmlFor="fromCurrency" > From Currency:</label>
          <select  id="fromCurrency" value={fromCurrency} onChange={handleFromCurrency}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling </option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Ruppes</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="ToCurrency">To Currency:</label>
          <select  id="ToCurrency" value={toCurrency} onChange={handleToCurrency}> 
          <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling </option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Ruppes</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>

        <div className="result">
          <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency} </p>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
