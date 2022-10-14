import { Dispatch, SetStateAction } from "react";

export interface EntityConfig {
    fields: Record<string, FieldConfig>;
    fetch: () => unknown;
    fetchAll: () => unknown;
    infiniteQueryName: string;
    normalQueryName: string;
    stats?: StatConfig[];
}

export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    unique?: boolean;
    searcheable?: boolean;
}

export interface StatConfig {
    title: string;
    statsList: stats[];
    divClass: string;
}

export type stats = {
    comparisonArgs: any[];
    comparisonType: FunctionType
    description: string
}

export type filterOptions = {
    filterBy: string,
    filterParam: string
}

export interface FetchOptions {
    itemsPerPage: number;
    sortOptions?: SortOptions;
    filterOptions?: FilterOptions[];
}

export interface ContextType {
    state: FetchOptions
    dispatch: Dispatch<SetStateAction<FetchOptions>>
}

export type SortOptions = {
    sortBy: string;
    sortOrder: string
}

export type FilterOptions = {
    filterBy: string,
    filterParam: string
}


type FieldType = 'text' | 'integer' | 'float' | 'datetime' | 'boolean' | 'keyValueArray'
export type FunctionType = 'getTop' | 'getPercentage' | 'getAmount' | 'getFilterBooleanAmount' | 'getDataSize' | 'getEarliestDeadline' | 'getNestedFieldWithMostByField' | 'getFieldWithMostByTopField' | 'getMostFrequentNestedArray'