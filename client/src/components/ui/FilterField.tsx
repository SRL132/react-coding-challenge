import React from 'react'

export default function FilterField() {
    const handleCheckBoxChange = () => {

    }
    return (

        <div>
            <label htmlFor="isUnassigned">Unassigned</label>
            <input name="isUnassigned" onChange={handleCheckBoxChange} type="checkbox"></input>
        </div>
    )
}
