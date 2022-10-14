import React, { Context, useContext } from 'react'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroller';
import { ContextType, EntityConfig, FieldConfig } from '../config/main/schema';

type TableProps = {
    entityConfig: EntityConfig
    context: Context<ContextType>
    updateSorting: string
}

export default function Table({ entityConfig, context, updateSorting }: TableProps) {
    //@ts-ignore
    const [state, dispatch] = useContext(context)
    const fields = entityConfig.fields
    const { data, status, hasNextPage, fetchNextPage, isSuccess

    } = useInfiniteQuery([entityConfig.infiniteQueryName, state],
        //@ts-ignore
        ({ pageParam = 1 }) => entityConfig.fetch(pageParam, state), {
        getNextPageParam: (_lastPage, allPages) => {
            const nextPage = allPages.length + 1
            return nextPage
        }
    })

    const sortData = (newSortOptions: { sortBy: string; }) => {
        if (state.sortOptions.sortBy !== newSortOptions.sortBy) {
            dispatch({ type: updateSorting, payload: { sortBy: newSortOptions.sortBy, sortOrder: 'asc' } })
        } else {
            const newSortOrder = state.sortOptions.sortOrder === 'asc' || state.sortOptions.sortOrder === undefined ? 'desc' : 'asc'
            dispatch({ type: updateSorting, payload: { sortBy: newSortOptions.sortBy, sortOrder: newSortOrder } })
        }
    }

    return (
        <div>
            {status === 'loading' && <h6>{'Loading...'}</h6>}
            {status === 'error' && <h6>{'There has been an error'}</h6>}

            {isSuccess &&
                <table className="table align-middle table-bordered table-striped table-hover table-responsive">
                    <thead className='bg-warning align-middle '>
                        <tr>
                            {Object.keys(fields)
                                .map(fieldString =>
                                    <th className='pointer' scope="col" key={fieldString}
                                        onClick={() => sortData({ sortBy: fields[fieldString].name })}>
                                        <div key={fields[fieldString].label} className="d-flex justify-content-center align-items-center "
                                        >
                                            <span>
                                                {fields[fieldString].label}
                                            </span>
                                            <i
                                                className="fa fa-fw fa-sort"
                                            >
                                            </i>
                                        </div>
                                    </th>
                                )}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isSuccess && data.pages.map((page) => {
                                return (page as Array<Record<string, any>>).map((e) => {
                                    return <tr>
                                        {Object.keys(fields).map(fieldString => {
                                            switch (fields[fieldString].type) {
                                                case ('keyValueArray'):
                                                    return <td>{e[fieldString].map((field: FieldConfig) =>
                                                        <div>
                                                            <span className='m-2'>
                                                                {field.name}
                                                            </span>
                                                        </div>)}
                                                    </td>
                                                case ('boolean'):
                                                    return <td>{(e[fieldString] as boolean) ? 'true' : 'false'}</td>
                                                default:
                                                    return <td>{e[fieldString] || ''}</td>
                                            }
                                        })}
                                    </tr>
                                })
                            })
                        }
                    </tbody>
                </table>
            }
            {/*@ts-ignore*/}
            {isSuccess && data?.pages[0].length > 9 && <InfiniteScroll loadMore={fetchNextPage}
                hasMore={hasNextPage}
                loader={<h4>{'Loading...'}</h4>}
                key={0}
            >
                <></>
            </InfiniteScroll>}
        </div>
    )
}