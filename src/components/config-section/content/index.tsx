import { FC } from 'react';
import { Stack } from '@mui/material';
import CategoriesPage from '../../../pages/categorys';
import SectionTabs from '../tab';
import SectionWrapper from '../../sections/wrapper';
import { UnitsSection } from '../../unit';
import { getCurrentPage } from '../../../utils/page';

export const SettingsSections: FC = () => {
    getCurrentPage()
    return (
        <Stack>
            <SectionTabs />
            <SectionWrapper section="categories">
                <CategoriesPage />
            </SectionWrapper>
            <SectionWrapper section="units">
                <UnitsSection />
            </SectionWrapper>
        </Stack>
    )
}
