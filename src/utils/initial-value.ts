import { INICIAL_SECTION, INICIAL_SECTION_SETTINGS } from "./constants/values"
import { getCurrentPage } from "./page"

export const getInitialSection = () => {
    const page = getCurrentPage()
    if (page === 'settings') return INICIAL_SECTION_SETTINGS
    return INICIAL_SECTION
}