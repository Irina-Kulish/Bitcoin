import React, { useState } from 'react';
import { DateFilterProps } from '../../interface/dateFilterProps';

export const DateFilter: React.FC<DateFilterProps> = ({ onMonthChange, onReset }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const handleApplyFilter = () => {
    onMonthChange(selectedMonth);
  };

  const handleReset = () => {
    setSelectedMonth('');
    onReset();
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <label className="block mb-4 text-gray-700 font-bold">
        Month:
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2 mt-2 block w-full bg-[#4cc1c0] text-white rounded-md"
        />
      </label>
      <button
        onClick={handleApplyFilter}
        className="w-full mt-2 bg-[#4cc1c0] text-white p-2 rounded-md hover:bg-[#39a7a6]"
      >
        Apply Filter
      </button>
      <button
        onClick={handleReset}
        className="w-full mt-2 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-400"
      >
        Reset Filter
      </button>
    </div>
  );
};
