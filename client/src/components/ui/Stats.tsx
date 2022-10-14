import React from 'react'
import { useQuery } from 'react-query'
import { EntityConfig, FunctionType } from '../config/main/schema'
type StatsProps = {
    entityConfig: EntityConfig
}

type ReduceType = {
    amount?: number
    key?: string
}

export default function Stats({ entityConfig }: StatsProps) {
    const { stats, normalQueryName } = entityConfig
    const { data, status, isSuccess } = useQuery<unknown>(normalQueryName, entityConfig.fetchAll)

    const filterBoolean = (field: string, value: boolean) => {
        return (data as Record<string, any>[]).filter((e) =>
            e[field] === value
        )
    }

    const getSet = (field: string) => {
        const arr: any[] = [];
        (data as Record<string, any>[]).map(e => {
            if (e[field]) {
                arr.push(e[field])
            }
        })
        return Array.from(new Set(arr))
    }

    const getMostFrequent = (arr: string[]) => {
        const filteredArray = arr.filter(e => e !== undefined)
        if (filteredArray.length > 0) {
            const hashmap = filteredArray.reduce<ReduceType>((acc, val) => {
                //@ts-ignore
                (acc)[val] = (acc[val] || 0) + 1
                return acc
            }, {})
            //@ts-ignore
            return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
        }
    }

    const getEarliestDateSinceNow = (dates: Array<string>) => {
        const filteredDates = dates.filter(date => +new Date(date) > +Date.now())
        return filteredDates.sort(function (a, b) {
            return +new Date(a) - +new Date(b)
        })[0];
    }

    const getTop = (targetField: string) => {
        let targetArray: string[] = [];

        (data as Record<string, any>[]).map(e => {
            return targetArray.push(e[targetField])
        });
        return getMostFrequent(targetArray)
    }

    const getPercentage = (field: string, value: string) => {
        const filteredData = (data as Record<string, any>[]).filter((e) => {
            return e[field] === value
        })
        return filteredData.length / (data as unknown[]).length * 100
    }

    const extractNestedFieldArray = (field: string) => {
        const array: any[] = [];
        (data as Record<string, any>[]).map((el) => {
            el[field].forEach((subElement: { name: any }) => {
                return array.push((subElement.name))
            });
        })
        return array
    }

    const getNestedFieldWithMostByField = (mostField: string, byField: string, byValue: any) => {
        let resultArray: string[] = [];
        (data as Record<string, any>[]).filter((e) => {
            return e[byField] === byValue
        }).map((filteredEl) => {
            filteredEl[mostField].forEach((element: { name: string }) => {
                return resultArray.push((element.name))
            });

        })
        return getMostFrequent(resultArray)
    }

    const getFieldWithMostByTopField = (getField: string, byField: string) => {
        const topValue = getTop(byField)
        let resultArray: string[] = [];

        (data as Record<string, any>[]).filter((e) => {
            return e[byField] === topValue
        }).map(filteredEl => {
            return filteredEl[getField] && resultArray.push(filteredEl[getField])
        });
        return getMostFrequent(resultArray)
    }

    const renderResult = (comparisonType: FunctionType, args: any[] = ['']) => {
        switch (comparisonType) {
            case 'getDataSize':
                return (data as unknown[]).length

            case 'getAmount':
                return getSet(args[0]).length

            case 'getFilterBooleanAmount':
                return filterBoolean(args[0], args[1]).length

            case 'getTop':
                return getTop(args[0])

            case 'getEarliestDeadline':
                return getEarliestDateSinceNow((getSet(args[0]) as unknown as string[]))

            case 'getNestedFieldWithMostByField':
                return getNestedFieldWithMostByField(args[0], args[1], args[2])

            case 'getFieldWithMostByTopField':
                return getFieldWithMostByTopField(args[0], args[1])

            case 'getPercentage':
                return getPercentage(args[0], args[1]) + '%'

            case 'getMostFrequentNestedArray':
                return getMostFrequent(extractNestedFieldArray(args[0]))

            default:
                return comparisonType
        }
    }

    if (status === 'loading') return <h6>{'Loading stats...'}</h6>
    if (status === 'error') return <h6>{'Error loading stats'}</h6>
    return (
        <div className="d-flex justify-content-between p-5">
            {isSuccess && stats?.map(statGroup => {
                return <div className={statGroup.divClass}>
                    <h5>
                        {statGroup.title}
                    </h5>
                    <ul className="list-group">
                        {statGroup.statsList.map(stat => {
                            return <li key={1} className="list-group-item">
                                <span>{stat.description + ' '} </span>
                                <strong>{
                                    renderResult(stat.comparisonType, stat.comparisonArgs)?.toString()
                                }
                                </strong>
                            </li>
                        })}
                    </ul>
                </div>
            })}
        </div>
    )
}
