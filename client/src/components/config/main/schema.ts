export interface EntityConfig {
    fields: Record<string, FieldConfig>
    fetch: () => unknown
    fetchAll: () => unknown
}

export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    unique?: boolean
}

type FieldType = 'text' | 'integer' | 'float' | 'datetime' | 'boolean' | 'keyValueArray'
