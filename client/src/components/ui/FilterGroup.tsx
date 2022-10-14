import React, { ChangeEvent, Context, useContext, useState } from 'react'
import { JobContextType } from '../context/jobContext'
import { FieldConfig, filterOptions } from '../config/main/schema'

type FilterProps = {
    fields: Record<string, FieldConfig>
    context: Context<JobContextType>
    updateFilters: string
}

export default function FilterGroup({ fields, context, updateFilters }: FilterProps) {
    const [searchBy, setSearchBy] = useState('q')
    //@ts-ignore
    const [state, dispatch] = useContext(context)

    const getFilterOptions = (optionKey: string, optionValue: string) => {
        const index = state.filterOptions.findIndex((el: filterOptions) => el.filterBy === searchBy)
        let newFilterOptions = state.filterOptions
        newFilterOptions[index][optionKey] = optionValue
        return newFilterOptions
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked === true) {
            dispatch({ type: updateFilters, payload: [...state.filterOptions, { filterBy: event.target.name, filterParam: 'true' }] })
        } else {
            dispatch({ type: updateFilters, payload: state.filterOptions.filter((options: filterOptions) => options?.filterBy !== event.target.name) })
        }
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newFilterOptions = getFilterOptions('filterParam', event.target.value)
        dispatch({ type: updateFilters, payload: newFilterOptions })
    }

    const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newFilterOptions = getFilterOptions('filterBy', event.target.value)
        dispatch({ type: updateFilters, payload: newFilterOptions })
        setSearchBy(event.target.value)
    }

    return (
        <div>
            <h5>
                {'Filters'}
            </h5>

            <div className='d-flex justify-content-center'>
                {Object.keys(fields)
                    .map(fieldString => fields[fieldString].type === 'boolean' &&
                        <div className='d-flex align-items-center'>
                            <input className="form-check-input" name={fields[fieldString].name} onChange={handleCheckboxChange} type="checkbox" />
                            <label className="form-check-label" htmlFor={fields[fieldString].name}>{fields[fieldString].label}</label>
                        </div>
                    )}
                <div className='m-3'>
                    <input name='textSearch' className='form-control rounded' type="text" placeholder='Search' onChange={handleSearchChange} />
                </div>
                <div className="d-flex align-items-center">
                    <select defaultValue={"q"} onChange={onSelectChange} className="form-select" data-live-search={true}>
                        <option value="q" data-tokens="all" >{'All'}</option>
                        {Object.keys(fields)
                            .map(fieldString => fields[fieldString].type !== 'boolean' && fields[fieldString].type !== 'keyValueArray' &&
                                <option value={fields[fieldString].name} data-tokens={fields[fieldString].label}>
                                    {fields[fieldString].label}
                                </option>)
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}
