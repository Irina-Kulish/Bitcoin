import axios from 'axios';
import { ChartData } from '../interface/chartData';

export const fetchBitcoinData = async (selectedMonth: string): Promise<ChartData> => {
  let url: string;
  const currentYear = new Date().getFullYear();

  if (selectedMonth) {
    const yearMonth = selectedMonth.split('-');
    const year = parseInt(yearMonth[0], 10);
    const month = parseInt(yearMonth[1], 10);
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
    url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
  } else {
    const startDate = `${currentYear}-01-01`;
    const endDate = `${currentYear}-12-31`;
    url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
  }

  const response = await axios.get(url);
  const data = response.data.bpi;

  console.log('API response:', data);

  const filteredData: { [key: string]: number } = selectedMonth
    ? Object.keys(data)
        .filter(date => date.startsWith(selectedMonth))
        .reduce((obj: { [key: string]: number }, key) => {
          obj[key] = data[key];
          return obj;
        }, {})
    : data;

  const dates = Object.keys(filteredData);
  const closingPrices = Object.values(filteredData) as number[];

  return {
    labels: dates,
    datasets: [
      {
        label: 'Bitcoin Closing Prices',
        data: closingPrices,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };
};
