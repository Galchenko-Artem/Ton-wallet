'use client';

import { useState } from 'react';
import WalletScreen from '../../components/WalletScreen';
import TransactionScreen from '../../components/TransactionScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [showTransactionScreen, setShowTransactionScreen] = useState(false);
  const [balance, setBalance] = useState(0);
  const goToTransactionScreen = () => {
    setShowTransactionScreen(true);
  };
  const goBack = () => {
    setShowTransactionScreen(false);
  };

  return (
    <div>
      {showTransactionScreen ? (
        <TransactionScreen goBack={goBack} balance={balance} />
      ) : (
        <WalletScreen
          goToTransactionScreen={goToTransactionScreen}
          setBalance={setBalance}
        />
      )}
      <ToastContainer />
    </div>
  );
}
