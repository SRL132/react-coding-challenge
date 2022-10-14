export interface EntityConfig {
    fields: Record<string, FieldConfig>;
    fetch: () => unknown;
    fetchAll: () => unknown;
    infiniteQueryName: string;
    normalQueryName: string;
}

export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    unique?: boolean;
    searcheable?: boolean;
    stats?: stats;
}

export type stats = {
    type: StatType;
    comparisonArgs: any[];
    comparisonType: FunctionType
}

type FieldType = 'text' | 'integer' | 'float' | 'datetime' | 'boolean' | 'keyValueArray'
type StatType = 'didYouKnow' | 'dataInsights' | 'topPriority'
type FunctionType = 'mostBy' | 'percentageBy' | 'getAmount'