import React from 'react'
import Stats from '../ui/Stats';
import Table from '../ui/Table';
import FilterGroup from '../ui/FilterGroup';
import jobConfig from '../config/dashboards/jobConfig';
import { JobContext } from '../context/jobContext';

const JobDashboard = () => {

  return (
    <div className='bg-light'>
      <Stats entityConfig={jobConfig} />
      <FilterGroup fields={jobConfig.fields} context={JobContext} />
      <Table entityConfig={jobConfig} context={JobContext} />
    </div>
  )
}

export default JobDashboard