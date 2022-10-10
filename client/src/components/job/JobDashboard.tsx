import React, { ChangeEvent, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import jobConfig from '../config/dashboards/jobConfig'
import { useInfiniteQuery } from 'react-query'
import { job } from '../config/dashboards/jobConfig'
import Stats from '../ui/Stats';

const JobDashboard = () => {
  const [fetchOptions, setFetchOptions] = useState({
    itemsPerPage: 10, sortOptions: {
      sortBy: 'id',
      sortOrder: 'asc'
    }, filterOptions: []
  })

  const { data, status, hasNextPage, fetchNextPage, isSuccess
    //@ts-ignore
  } = useInfiniteQuery(["InfiniteQueryData", fetchOptions], ({ pageParam = 1 }) => jobConfig.fetch(pageParam, fetchOptions), {

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage
    }
  })

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === true) {
      //@ts-ignore
      setFetchOptions({ ...fetchOptions, filterOptions: [...fetchOptions.filterOptions, { filterBy: event.target.name, filterParam: 'true' }] })
    } else {
      //@ts-ignore
      setFetchOptions({ ...fetchOptions, filterOptions: fetchOptions.filterOptions.filter(options => options?.filterBy !== event.target.name) })
    }
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    console.log(fetchOptions)
    //@ts-ignore
    if (!fetchOptions.filterOptions.some(filter => filter.filterBy === 'q')) {
      //@ts-ignore
      setFetchOptions({ ...fetchOptions, filterOptions: [...fetchOptions.filterOptions, { filterBy: 'q', filterParam: event.target.value }] })
    } else {
      //@ts-ignore
      const SearchOptionIndex = fetchOptions.filterOptions.findIndex((option) => option.filterBy === 'q')
      //@ts-ignore
      fetchOptions.filterOptions[SearchOptionIndex] = { filterBy: 'q', filterParam: event.target.value }
      const newFetchOptions = fetchOptions
      //@ts-ignore
      setFetchOptions(newFetchOptions)
      console.log(fetchOptions);

    }
  }

  //@ts-ignore
  const sortData = (newFetchOptions) => {
    if (fetchOptions.sortOptions.sortBy !== newFetchOptions.sortOptions.sortBy) {
      setFetchOptions(newFetchOptions)
    } else {
      newFetchOptions.sortOptions.sortOrder = fetchOptions.sortOptions.sortOrder === 'asc' || fetchOptions.sortOptions.sortOrder === undefined ? 'desc' : 'asc'
      setFetchOptions(newFetchOptions)
    }
  }

  const fields = jobConfig.fields

  return (
    <>
      {/*@ts-ignore*/}
      <div>
        <Stats />
        <h6 >
          Filters
        </h6>
        <div className='d-flex justify-content-center'>
          <div>
            <label htmlFor="isUnassigned">Unassigned</label>
            <input name="isUnassigned" onChange={handleCheckboxChange} type="checkbox"></input>
          </div>
          <div>
            <input name='textSearch' type="text" placeholder='Search' onChange={handleSearchChange}></input>
          </div>
        </div>
        {status === 'loading' && <h1>Loading...</h1>}
        {status === 'error' && <h1>There has been an error</h1>}


        <table className="table table-hover min-vh-100">
          <thead>
            <tr>
              {Object.keys(fields)
                .map(fieldString =>
                  <th scope="col">
                    <div className='d-flex'>{fields[fieldString].label}
                      <i className="fa fa-fw fa-sort"
                        onClick={() => sortData({ ...fetchOptions, sortOptions: { sortBy: fields[fieldString].name } })}
                      >
                      </i>
                    </div>
                  </th>)}
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              data.pages.map((page) => {
                return (page as job[]).map((e) => {
                  return <tr>
                    <td >{e.id}</td>
                    <td>{e.originalId}</td>
                    <td>{e.talentId}</td>
                    <td>{e.talentName}</td>
                    <td>{e.talentGrade}</td>
                    <td>{e.bookingGrade}</td>
                    <td>{e.operatingUnit}</td>
                    <td>{e.officeCity}</td>
                    <td>{e.officePostalCode}</td>
                    <td>{e.jobManagerName}</td>
                    <td>{e.jobManagerId}</td>
                    <td>{e.totalHours}</td>
                    <td>{e.startDate?.toString()}</td>
                    <td>{e.endDate?.toString()}</td>
                    <td>{e.clientName}</td>
                    <td>{e.clientId}</td>
                    <td>{e.industry}</td>
                    <td>{e.requiredSkills?.map(skill => <div>
                      <span>Name: {skill.name}</span>
                      <span>Category: {skill.category}</span>
                    </div>)}</td>
                    <td>{e.optionalSkills?.map(skill => <div>
                      <span>Name: {skill.name}</span>
                      <span>Category: {skill.category}</span>
                    </div>)}</td>
                    <td>{e.isUnassigned ? 'true' : 'false'}</td>
                  </tr>
                });
              }
              )}</tbody>
        </table>
        { /*@ts-ignore*/}
        {isSuccess && data?.pages?.length > 0 && < InfiniteScroll loadMore={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
        ></InfiniteScroll>}
      </div>
    </>
  )
}

export default JobDashboard