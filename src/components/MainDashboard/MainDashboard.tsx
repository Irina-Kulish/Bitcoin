import React, { useState } from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import { ChartComponent } from '../ChartComponent/ChartComponent';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { DateFilter } from '../DateFilter/DateFilter';

export const MainDashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [filterKey, setFilterKey] = useState<number>(0);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setFilterKey(prevKey => prevKey + 1);
  };

  const handleReset = () => {
    setSelectedMonth('');
    setFilterKey(prevKey => prevKey + 1);
  };

  return (
    <>
      <Header />
      <div 
        className="flex flex-row gap-5 flex-grow bg-white" 
        style={{ height: 'calc(100vh - 100px)' }}
      >
        <div className="w-1/5 min-h-full p-5 flex-shrink-0 mt-3">
          <DateFilter 
            onMonthChange={handleMonthChange} 
            onReset={handleReset} 
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4 flex-grow h-full">
          <Mosaic
            className="mosaic-container h-full"
            renderTile={(id, path) => (
              <MosaicWindow 
                path={path} 
                title={`Chart ${id}`}
              >
                <ChartComponent 
                  key={`${id}-${filterKey}`} 
                  selectedMonth={selectedMonth} 
                />
              </MosaicWindow>
            )}
            initialValue={{
              direction: 'row',
              first: '1',
              second: {
                direction: 'column',
                first: '2',
                second: '3',
              },
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
