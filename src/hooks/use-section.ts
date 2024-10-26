import { useCallback } from 'react'
import { useQueryParams } from './params/query-params'
import { SECTION_KEY } from '../utils/constants/values'
import { getInitialSection } from '../utils/initial-value'

export const useSectionNavegation = () => {
    const { getQueryParam, setQueryParam, removeParams } = useQueryParams()
    const currentSection = getQueryParam(SECTION_KEY, getInitialSection())

    const updateSection = useCallback((section: string) => {
        removeParams()
        setQueryParam(SECTION_KEY, section)
    }, [removeParams, setQueryParam])

    const isSectionSelected = (section: string) => {
        return currentSection === section
    }

    return {
        currentSection, 
        updateSection,
        isSectionSelected
    }
}
