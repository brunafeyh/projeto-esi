import { FC } from 'react';
import { Stack } from '@mui/material';
import SectionTabs from '../tab';
import { getCurrentPage } from '../../../../utils/page';
import SectionWrapper from '../../home/wrapper';
import CategoriesPage from '../../../settings/categorys';
import { UnitsSection } from '../../../settings/unit';

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
