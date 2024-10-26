import { FC, ReactNode } from 'react'
import { Box } from '@mui/material'
import { useSectionNavegation } from '../../../../hooks/use-section'

interface SectionWrapperProps {
    section: string
    children: ReactNode
}

const SectionWrapper: FC<SectionWrapperProps> = ({ section, children }) => {
    const { isSectionSelected } = useSectionNavegation()

    if (!isSectionSelected(section)) return null

    return <Box>{children}</Box>
}

export default SectionWrapper
