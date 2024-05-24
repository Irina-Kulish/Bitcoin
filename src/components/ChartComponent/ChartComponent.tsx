import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchBitcoinData } from '../../api/api';
import { Loading } from '../Loading/Loading';
import { ErrorComponent } from '../Error/Error';
import { ChartComponentProps } from '../../interface/chartComponentProps';
import { ChartData } from '../../interface/chartData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartComponent: React.FC<ChartComponentProps> = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for month:', selectedMonth);
        const data = await fetchBitcoinData(selectedMonth);
        console.log('Data fetched:', data);
        setChartData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err as Error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div className="h-full w-full">
      {error && <ErrorComponent error={error} />}
      {chartData ? <Line key={JSON.stringify(chartData)} data={chartData} /> : <Loading />}
    </div>
  );
};
