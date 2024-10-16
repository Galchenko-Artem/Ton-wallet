'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Wallet } from '@tonconnect/sdk';
import { getTonConnect } from '../utils/tonconnect';
import dynamic from 'next/dynamic';

const WalletConnectButton = dynamic(() => import('./WalletConnectButton'), { ssr: false });

interface WalletScreenProps {
  goToTransactionScreen: () => void;
  setBalance: (balance: number) => void;
}

const WalletScreen: React.FC<WalletScreenProps> = ({ goToTransactionScreen, setBalance }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setLocalBalance] = useState(0);
  const [tonConnect, setTonConnect] = useState<any>(null);

  useEffect(() => {
    const tonConnectInstance = getTonConnect();
    if (!tonConnectInstance) return;
    setTonConnect(tonConnectInstance);
    const handleStatusChange = async (walletInfo: Wallet | null) => {
      if (walletInfo) {
        const address = walletInfo.account.address;
        setWalletAddress(address);
        await fetchBalance(address);
      } else {
        setWalletAddress('');
        setLocalBalance(0);
        setBalance(0);
      }
    };
    tonConnectInstance.onStatusChange(handleStatusChange);
    if (tonConnectInstance.wallet) {
      handleStatusChange(tonConnectInstance.wallet);
    }
    return () => {
      tonConnectInstance.onStatusChange(handleStatusChange);
    };
  }, []);

  const fetchBalance = async (address: string) => {
    try {
      const response = await axios.get(
        `https://testnet.toncenter.com/api/v2/getAddressBalance`,
        {
          params: {
            address: address,
            api_key: 'YOUR_TONCENTER_API_KEY',
          },
        }
      );
      const balanceTon = parseInt(response.data.result, 10) / 1e9;
      setLocalBalance(balanceTon);
      setBalance(balanceTon);
    } catch (error) {
      console.error('Ошибка при получении баланса:', error);
      toast.error('Не удалось получить баланс');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between bg-blue-600 p-4 text-white">
        <WalletConnectButton />
        <div>Баланс: {balance} TON</div>
      </header>
      <main className="flex flex-col flex-grow items-center justify-center p-4">
        <div className="text-lg font-semibold">Адрес кошелька:</div>
        <div className="break-all text-center mt-2">{walletAddress || 'Кошелёк не подключен'}</div>
        <button
          onClick={goToTransactionScreen}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Перевести средства
        </button>
      </main>
    </div>
  );
};

export default WalletScreen;
