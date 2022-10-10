import React from 'react'
import { useQuery } from 'react-query'
import { job } from '../config/dashboards/jobConfig'
import jobConfig from '../config/dashboards/jobConfig'

//most repeated string in an array
export default function Stats() {
    const getMostFrequent = (arr: string[]) => {
        const filteredArray = arr.filter(e => e !== undefined)
        if (filteredArray?.length > 0) {
            const hashmap = filteredArray.reduce((acc, val) => {
                //@ts-ignore
                acc[val] = (acc[val] || 0) + 1
                return acc
            }, {})
            //@ts-ignore
            return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
        }
    }

    const getMostRequiredSkillsByRole = (role: string) => {
        let skillsArray: string[] = [];

        (data as job[]).filter((e) => {
            return e.bookingGrade === role
        }).map((job) => {
            job?.requiredSkills?.forEach((element) => {
                return skillsArray.push((element.name))
            });

        }

        )
        return getMostFrequent(skillsArray)
    }

    const getTopClient = () => {
        let clientArray: string[] = [];

        (data as job[]).map(job => {
            return clientArray.push(job.clientId)
        });
        return getMostFrequent(clientArray)
    }

    const getOfficeWithMostJobsByTopClient = () => {
        const client = getTopClient()
        let officeCityArray: string[] = [];

        (data as job[]).filter((e) => {
            return e.clientId === client
        }).map(job => {

            return job.officeCity && officeCityArray.push(job.officeCity)
        });
        return getMostFrequent(officeCityArray)
    }

    const getPercentageOfJobsByIndustry = (industry: string) => {
        const filteredData = (data as job[]).filter((e) => {
            return e.industry === industry
        })
        return filteredData.length / (data as job[]).length * 100
    }





    const { data, status, isSuccess } = useQuery("fetchAllData", jobConfig.fetchAll)
    if (status === 'loading') return <h1>Loading stats...</h1>
    if (status === 'error') return <h1>Error loading stats</h1>
    return (
        <div>
            <h5>Main insights:</h5>
            <ul className="list-group">
                <li className="list-group-item">
                    <span>{'Data size: ' + isSuccess && (data as job[]).length} </span>
                </li>
                <li className="list-group-item">
                    <span>{'Most in-demand skills for senior managers: ' + getMostRequiredSkillsByRole('Senior Manager')}</span>
                </li>
                <li className="list-group-item">
                    <span>{'Office city with the most jobs from the top client: ' + getOfficeWithMostJobsByTopClient()} </span>
                </li>
                <li className="list-group-item">
                    <span>Percentage of jobs in Low Tech: {isSuccess && getPercentageOfJobsByIndustry("Low technology") + '%'}</span>
                </li>
            </ul>
        </div>

    )
}
