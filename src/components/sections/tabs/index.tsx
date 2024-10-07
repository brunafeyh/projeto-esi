import { FC, SyntheticEvent } from 'react'
import { Tabs } from '../../../pages/home/styles'
import { Tab } from '@mui/material'
import { useSectionNavegation } from '../../../hooks/use-section'

const SectionTabs: FC = () => {
  const { updateSection, currentSection} = useSectionNavegation()

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    updateSection(newValue)
  }

  return (
    <Tabs value={currentSection} onChange={handleChange}>
      <Tab label="Recomendações da Casa" value="recommendations" />
      <Tab label="Mais Vendidos" value="more-selled" />
      <Tab label="Sobre Nós" value="about-us" />
    </Tabs>
  )
}

export default SectionTabs
