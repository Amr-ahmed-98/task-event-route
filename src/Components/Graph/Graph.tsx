import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface TransactionData {
  date: string;
  amount: number;
  id: string;
  customer_id: number;
}

interface CustomerDataProps {
  id: string;
  name: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const [transData, setTransData] = useState<TransactionData[]>([]);
  const [customersData, setCustomersData] = useState<CustomerDataProps[]>([]);
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedCustomerTransactions, setSelectedCustomerTransactions] = useState<TransactionData[]>([]);

  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/Amr-ahmed-98/task-event-route/main/db.json')
      .then(({ data }) => setTransData(data.transactions))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/Amr-ahmed-98/task-event-route/main/db.json')
      .then(({ data }) => setCustomersData(data.customers))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedName) {
      const selectedCustomer = customersData.find((customer) => customer.name === selectedName);
      
      if (selectedCustomer) {
        const customerTransactions = transData.filter(
          (trans) => trans.customer_id === +selectedCustomer.id
        );
        setSelectedCustomerTransactions(customerTransactions);
      }
    } else {
      setSelectedCustomerTransactions([]);
    }
  }, [selectedName, customersData, transData]);

  const defOrSelectedDate = selectedCustomerTransactions.length > 0 ? selectedCustomerTransactions.map((data) => data.date) : transData.map((data) => data.date);
  const defOrSelectedAmount = selectedCustomerTransactions.length > 0 ? selectedCustomerTransactions.map((data) => data.amount) : transData.map((data) => data.amount);

  const chartData = {
    labels: defOrSelectedDate,
    datasets: [
      {
        label: 'Transaction Amount',
        data: defOrSelectedAmount,
        borderColor: '#85bb65',
        backgroundColor: '#85bb65',
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        ticks: {
          color: '#FFF',
        },
      },
      y: {
        ticks: {
          color: '#FFF',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#FFF',
        },
      },
    },
  };

  return (
    <>
      <form className='max-w-sm mx-auto'>
        <select
          id='countries'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value=''>Choose from customers</option>
          {customersData.map((customer) => (
            <option key={customer.id} value={customer.name}>{customer.name}</option>
          ))}
        </select>
      </form>
      <Line data={chartData} options={chartOptions} />
    </>
  );
}

export default Chart;