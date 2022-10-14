import React from 'react';
import './App.css';
import JobDashboard from './components/dashboards/JobDashboard';
import { ReactQueryDevtools } from "react-query/devtools"
import { JobProvider } from './components/context/jobContext';

function App() {
  return (
    <div className="App">
      <JobProvider>
        <JobDashboard />
      </JobProvider>
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
