export const formatDateToDDMMYYYY = (dateString: string): string => {
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}

export const getString = (value?: string) =>{
    if(value) return value
    return ''
}