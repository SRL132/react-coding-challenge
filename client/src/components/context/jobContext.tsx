import React, { useReducer, createContext, FC, SetStateAction, Dispatch } from "react"
import { FetchOptions } from "../../api/jobs-api"
import { reducer, initialState } from "../reducers/job/jobReducer"


export interface JobContextType {
    state: FetchOptions
    dispatch: Dispatch<SetStateAction<FetchOptions>>
}

interface Props {
    children: React.ReactNode;
}

export const JobContext = createContext<JobContextType>({
    state: initialState,
    dispatch: () => null
})

export const JobProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        //@ts-ignore
        <JobContext.Provider value={[state, dispatch]}>
            {children}
        </JobContext.Provider>
    )
}