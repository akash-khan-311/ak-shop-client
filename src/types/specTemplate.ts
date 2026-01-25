export type TSpecFieldType = 'text' | 'number' | 'date' | 'combobox' | 'boolean' | 'multi-select'

export type TSpecField = {
  _id?: string
  label: string
  name: string
  type: TSpecFieldType
  options?: string[]
  optional?: boolean
  unit?: string
  order?: number
}

export type TTemplate = {
  categorySlug: string;
  subcategorySlug: string;
  isPublished: boolean;
  fields: TSpecField[];
};
