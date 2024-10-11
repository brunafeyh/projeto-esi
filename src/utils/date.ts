import { Dishe } from "../types/dishes"
import { DEFAULT_DISHE } from "./constants/values"

export const formatDateToDDMMYYYY = (dateString?: string): string => {
    if (!dateString) return 'Data Inválida'
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}

export const getString = (value?: string) => {
    if (value) return value
    return ''
}

export const getDishe = (value?: Dishe) => {
    if (value) return value
    return DEFAULT_DISHE
}