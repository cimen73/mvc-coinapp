import axios from 'axios';
import { createContext, useState } from 'react';

export const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);

// fetches coins and transfers them to state
  function getCoins() {
    axios
      .get('https://api.coincap.io/v2/assets')
      .then((res) => setCoins(res.data.data));
  }

  return (
    <CoinContext.Provider value={{ coins, getCoins }}>
      {children}
    </CoinContext.Provider>
  );
};