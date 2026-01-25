export type TSpecFieldType = 'text' | 'number' | 'date' | 'combobox' | 'boolean' | 'multi-select'

export type TSpecField = {
  label: string
  name: string
  type: TSpecFieldType
  options?: string[]
  unit?: string
  order?: number
}

export type TEffectiveTemplateResponse = {
  subcategorySlug: string
  fields: TSpecField[]
}
