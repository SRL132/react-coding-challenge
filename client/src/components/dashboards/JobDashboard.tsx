import React from 'react'
import Stats from '../ui/Stats';
import Table from '../ui/Table';
import FilterGroup from '../ui/FilterGroup';
import jobConfig from '../config/dashboardConfig/jobConfig';
import { JobContext } from '../context/jobContext';
import { UPDATE_FILTERS, UPDATE_SORTING } from '../reducers/job/jobReducerTypes';

const JobDashboard = () => {

  return (
    <div className='bg-light'>
      <Stats entityConfig={jobConfig} />
      <FilterGroup fields={jobConfig.fields} context={JobContext} updateFilters={UPDATE_FILTERS} />
      <Table entityConfig={jobConfig} context={JobContext} updateSorting={UPDATE_SORTING} />
    </div>
  )
}

export default JobDashboard