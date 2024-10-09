import { Prato } from "../types/dishes"
import { DEFAULT_PRATO } from "./constants/values"

export const formatDateToDDMMYYYY = (dateString: string): string => {
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}

export const getString = (value?: string) => {
    if (value) return value
    return ''
}

export const getDishe = (value?: Prato) => {
    if (value) return value
    return DEFAULT_PRATO
}