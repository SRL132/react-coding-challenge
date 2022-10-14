import { reactiveFetchJobs, fetchAllJobs } from "../../../api/jobs-api";
import { EntityConfig } from "../main/schema";

export interface job {
    id: number, //unique,
    originalId: string, //unique,
    talentId?: string,
    talentName?: string,
    talentGrade?: string,
    bookingGrade?: string,
    operatingUnit: string,
    officeCity?: string,
    officePostalCode: string,
    jobManagerName?: string,
    jobManagerId?: string,
    totalHours: number,
    startDate: Date,
    endDate: Date,
    clientName?: string,
    clientId: string,
    industry?: string,
    requiredSkills?: skill[]
    optionalSkills?: skill[]
    isUnassigned: boolean,
}

type skill = {
    name: string;
    category: string;
}

const jobConfig: EntityConfig = {
    fields:
    {
        id: {
            name: 'id',
            type: 'integer',
            label: 'ID',
            searcheable: true,
            unique: true
        },
        originalId: {
            name: 'originalId',
            type: 'text',
            label: 'Original ID',
            unique: true
        },
        talentId: {
            name: 'talentId',
            type: 'text',
            label: 'Talent ID'
        },
        talentName: {
            name: 'talentName',
            type: 'text',
            label: 'Talent name'
        },
        talentGrade: {
            name: 'talentGrade',
            type: 'text',
            label: 'Talent grade'
        },
        bookingGrade: {
            name: 'bookingGrade',
            type: 'text',
            label: 'Booking grade'
        },
        operatingUnit: {
            name: 'operatingUnit',
            type: 'text',
            label: 'Operating unit'
        },
        officeCity: {
            name: 'officeCity',
            type: 'text',
            label: 'Office city',
        },
        officePostalCode: {
            name: 'officePostalCode',
            type: 'text',
            label: 'Office Postal Code'
        },
        jobManagerName: {
            name: 'jobManagerName',
            type: 'text',
            label: ' Job Manager Name'
        },
        jobManagerId: {
            name: 'jobManageriD',
            type: 'text',
            label: 'Job Manager ID'
        },
        totalHours: {
            name: 'totalHours',
            type: 'float',
            label: 'Total Hours'
        },
        startDate: {
            name: 'startDate',
            type: 'datetime',
            label: 'Start Date'
        },
        endDate: {
            name: 'endDate',
            type: 'datetime',
            label: 'End Date'
        },
        clientName: {
            name: 'clientName',
            type: 'text',
            label: 'Client Name'
        },
        clientId: {
            name: 'clientId',
            type: 'text',
            label: 'Client ID'
        },
        industry: {
            name: 'industry',
            type: 'text',
            label: 'Industry'
        },
        requiredSkills: {
            name: 'requiredSkills',
            type: 'keyValueArray',
            label: 'Required Skills'
        },
        optionalSkills: {
            name: 'optionalSkills',
            type: 'keyValueArray',
            label: 'Optional Skills'
        },
        isUnassigned: {
            name: 'isUnassigned',
            type: 'boolean',
            label: 'Unassigned'
        },
    },
    stats: [
        {
            title: 'Data Insights',
            divClass: 'bg-secondary rounded',
            statsList: [
                {
                    comparisonArgs: [],
                    comparisonType: 'getDataSize',
                    description: 'Data size: '
                },
                {
                    comparisonArgs: ['officeCity'],
                    comparisonType: 'getAmount',
                    description: 'Number of cities:'
                },
                {
                    comparisonArgs: ['isUnassigned', true],
                    comparisonType: 'getFilterBooleanAmount',
                    description: 'Unassigned jobs:'
                },
                {
                    comparisonArgs: ['industry'],
                    comparisonType: 'getAmount',
                    description: 'Number of industries:'
                },
            ]
        },
        {
            title: 'Top Priority',
            divClass: 'bg-warning rounded',
            statsList: [
                {
                    comparisonArgs: ['startDate'],
                    comparisonType: 'getEarliestDeadline',
                    description: 'Closest deadline: '
                },
                {
                    comparisonArgs: ['requiredSkills', 'bookingGrade', 'Senior Manager'],
                    comparisonType: 'getNestedFieldWithMostByField',
                    description: 'Most in-demand skills for senior managers:'
                },
                {
                    comparisonArgs: ['officeCity', 'clientId'],
                    comparisonType: 'getFieldWithMostByTopField',
                    description: 'Office city with the most jobs from the top client:'
                },
                {
                    comparisonArgs: ["talentGrade", ""],
                    comparisonType: 'getPercentage',
                    description: 'Percentage of talent grades to be defined:'
                },
            ]
        },
        {
            title: 'Did you know?',
            divClass: 'bg-secondary rounded',
            statsList: [
                {
                    comparisonArgs: ['requiredSkills'],
                    comparisonType: 'getMostFrequentNestedArray',
                    description: 'Most required skill:'
                },
                {
                    comparisonArgs: ['optionalSkills'],
                    comparisonType: 'getMostFrequentNestedArray',
                    description: 'Most frequent optional skill:'
                },
                {
                    comparisonArgs: ['jobManagerId'],
                    comparisonType: 'getTop',
                    description: 'Job Manager with the most positions:'
                },
                {
                    comparisonArgs: ['industry', "Low technology"],
                    comparisonType: 'getPercentage',
                    description: 'Percentage of jobs in Low Tech:'
                }
            ]
        }
    ],
    fetch: reactiveFetchJobs,
    fetchAll: fetchAllJobs,
    infiniteQueryName: 'infiniteJobData',
    normalQueryName: 'allJobData'
}

export default jobConfig

