import React from 'react'
import { useQuery } from 'react-query'
import { EntityConfig } from '../config/main/schema'

type StatsProps = {
    entityConfig: EntityConfig
}

export default function Stats({ entityConfig }: StatsProps) {
    const { fields, normalQueryName } = entityConfig
    const { data, status, isSuccess } = useQuery(normalQueryName, entityConfig.fetchAll)
    //@ts-ignore

    const filterBoolean = (field: string, value: boolean) => {
        //@ts-ignore
        return data.filter((e) =>
            e[field] === value
        )
    }

    const getSet = (field: string) => {
        const arr: Iterable<Array<string>> | null | undefined = []
        //@ts-ignore
        data.map(e => {
            if (e[field]) {
                //@ts-ignore
                arr.push(e[field])
            }
        }
        )
        return Array.from(new Set(arr))
    }
    const getMostFrequent = (arr: string[]) => {
        const filteredArray = arr.filter(e => e !== undefined)
        if (filteredArray.length > 0) {
            const hashmap = filteredArray.reduce((acc, val) => {
                //@ts-ignore
                (acc)[val] = (acc[val] || 0) + 1
                return acc
            }, {})
            //@ts-ignore
            return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
        }
    }

    const getEarliestDate = (dates: Array<Date>) => {
        //@ts-ignore
        return dates.sort(function (a, b) {
            //@ts-ignore
            return Date.parse(a) > Date.parse(b);
        })[0];
    }

    const getTop = (targetField: string) => {
        let targetArray: string[] = [];

        (data as unknown[]).map(e => {
            //@ts-ignore
            return targetArray.push(e[targetField])
        });
        return getMostFrequent(targetArray)
    }


    const getPercentage = (field: string, value: string) => {
        const filteredData = (data as unknown[]).filter((e) => {
            //@ts-ignore
            return e[field] === value
        })
        return filteredData.length / (data as unknown[]).length * 100
    }

    const extractNestedFieldArray = (field: string) => {
        const array: any[] = [];
        (data as unknown[]).map((el) => {
            //@ts-ignore
            el[field].forEach((subElement) => {
                return array.push((subElement.name))
            });

        })
        return array
    }

    const getNestedFieldWithMostByField = (mostField: string, byField: string, byValue: any) => {
        let resultArray: string[] = [];
        (data as unknown[]).filter((e) => {
            //@ts-ignore
            return e[byField] === byValue
        }).map((filteredEl) => {
            //@ts-ignore
            filteredEl[mostField].forEach((element) => {
                return resultArray.push((element.name))
            });

        })
        return getMostFrequent(resultArray)
    }

    const getFieldWithMostByTopField = (getField: string, byField: string) => {
        const topValue = getTop(byField)
        let resultArray: string[] = [];

        (data as unknown[]).filter((e) => {
            //@ts-ignore

            return e[byField] === topValue
        }).map(filteredEl => {
            //@ts-ignore

            return filteredEl[getField] && resultArray.push(filteredEl[getField])
        });
        return getMostFrequent(resultArray)
    }

    if (status === 'loading') return <h6>{'Loading stats...'}</h6>
    if (status === 'error') return <h6>{'Error loading stats'}</h6>
    return (
        <div className="d-flex justify-content-between p-5">
            <div className='bg-secondary rounded'>
                <h5>
                    {'Data insights:'}
                </h5>

                <ul className="list-group">
                    <li key={1} className="list-group-item">
                        <span>{'Data size: '} </span>
                        <strong>{isSuccess && (data as unknown[]).length} </strong>
                    </li>
                    <li key={2} className="list-group-item">
                        <span >{'Number of cities: '} </span>
                        <strong>{getSet('officeCity').length}</strong>
                    </li>
                    <li key={3} className="list-group-item">
                        <span>{'Unassigned jobs: '} </span>
                        <strong>{filterBoolean('isUnassigned', true).length}</strong>
                    </li>
                    <li key={4} className="list-group-item">
                        <span>{'Number of industries: '} </span>
                        <strong>{getSet('industry').length}</strong>
                    </li>
                </ul>
            </div>
            <div className='bg-warning rounded'>
                <h5>
                    {'Top Priority:'}
                </h5>

                <ul className="list-group">
                    <li key={1} className="list-group-item">
                        <span>{'Closest deadline: '} </span>
                        {/*@ts-ignore*/}
                        <strong>{getEarliestDate(getSet('startDate'))} </strong>
                    </li>
                    <li key={2} className="list-group-item">
                        <span >{'Most in-demand skills for senior managers: '} </span>
                        <strong>{getNestedFieldWithMostByField('requiredSkills', 'bookingGrade', 'Senior Manager')}</strong>
                    </li>
                    <li key={3} className="list-group-item">
                        <span>{'Office city with the most jobs from the top client: '} </span>
                        <strong>{getFieldWithMostByTopField('officeCity', 'clientId')}</strong>
                    </li>
                    <li key={4} className="list-group-item">
                        <span>{'Percentage of talent grades to be defined: '} </span>
                        <strong>{isSuccess && getPercentage("talentGrade", "") + '%'}</strong>
                    </li>
                </ul>
            </div>
            <div className='bg-secondary rounded'>
                <h5>
                    {'Did you know?'}
                </h5>

                <ul className="list-group">
                    <li key={1} className="list-group-item">
                        <span>{'Most required skill: '} </span>
                        <strong>{getMostFrequent(extractNestedFieldArray('requiredSkills'))} </strong>
                    </li>
                    <li key={2} className="list-group-item">
                        <span >{'Most frequent optional skill: '} </span>
                        <strong>{getMostFrequent(extractNestedFieldArray('optionalSkills'))}</strong>
                    </li>
                    <li key={3} className="list-group-item">
                        <span>{'Job Manager with the most positions: '} </span>
                        <strong>{getTop('jobManagerId')}</strong>
                    </li>
                    <li key={4} className="list-group-item">
                        <span>{'Percentage of jobs in Low Tech: '} </span>
                        <strong>{isSuccess && getPercentage("industry", "Low technology") + '%'}</strong>
                    </li>
                </ul>
            </div>
        </div>
    )
}
