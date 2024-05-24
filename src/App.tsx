import React from 'react';
import { MainDashboard } from './components/MainDashboard/MainDashboard';

const App: React.FC = () => {
  return (
    <div className="App h-screen w-screen bg-gray-100">
      <MainDashboard />
    </div>
  );
};

export default App;
