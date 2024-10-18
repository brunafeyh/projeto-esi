import { FC, SyntheticEvent } from 'react'
import { useSectionNavegation } from '../../../hooks/use-section'
import { Tabs } from '../../../pages/home/styles'
import { Tab } from '@mui/material'

const SectionTabs: FC = () => {
  const { updateSection, currentSection } = useSectionNavegation()

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    updateSection(newValue)
  }

  return (
    <Tabs value={currentSection} onChange={handleChange}>
      <Tab label="Categorias" value="categories" />
      <Tab label="Unidades de Medida" value="units" />
    </Tabs>
  )
}

export default SectionTabs
