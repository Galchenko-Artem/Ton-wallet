'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

interface TransactionScreenProps {
  goBack: () => void;
  balance: number;
}

const TransactionScreen: React.FC<TransactionScreenProps> = ({ goBack, balance }) => {
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const handleTransaction = async () => {
    if (!amount || !recipientAddress) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }
    if (parseFloat(amount) > balance) {
      toast.error('Недостаточно средств на балансе');
      return;
    }
    toast.success('Транзакция успешно обработана');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between bg-blue-600 p-4 text-white">
        <button onClick={goBack} className="font-semibold">
          Назад
        </button>
        <div>Баланс: {balance} TON</div>
      </header>
      <main className="flex flex-col flex-grow p-4">
        <input
          type="number"
          placeholder="Количество TON"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Адрес получателя"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="mt-2 p-2 border rounded"
        />
        <button
          onClick={handleTransaction}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Отправить
        </button>
      </main>
    </div>
  );
};

export default TransactionScreen;
