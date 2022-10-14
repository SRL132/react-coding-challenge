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

type FieldType = 'text' | 'integer' | 'float' | 'datetime' | 'boolean' | 'keyValueArray'
export type FunctionType = 'getTop' | 'getPercentage' | 'percentageBy' | 'getAmount' | 'getFilterBooleanAmount' | 'getDataSize' | 'getEarliestDate' | 'getNestedFieldWithMostByField' | 'getFieldWithMostByTopField' | 'getMostFrequentNestedArray'