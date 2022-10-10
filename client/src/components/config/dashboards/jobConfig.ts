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
            label: 'Office city'
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
    fetch: reactiveFetchJobs,
    fetchAll: fetchAllJobs
}

export default jobConfig

