import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from 'react-query'
import JobDashboard from './components/job/JobDashboard';
import { ReactQueryDevtools } from "react-query/devtools"

function App() {
  return (
    <div className="App">
      <JobDashboard />
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
