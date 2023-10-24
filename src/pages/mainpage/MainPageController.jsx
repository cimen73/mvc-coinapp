import React, { useContext, useEffect } from 'react';
import MainPageView from './MainPageView';
import { CoinContext } from '../../context/coinContext';
import UserContext from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const MainPageController = () => {
  const { coins, getCoins } = useContext(CoinContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  //send api request
  useEffect(() => {
    getCoins();
  }, []);

  // tracking user
  useEffect(() => {
    // redirect to login if logged out
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return <MainPageView coins={coins} />;
};

export default MainPageController;