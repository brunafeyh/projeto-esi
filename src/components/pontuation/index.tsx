import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import { Box, Tooltip } from '@mui/material'
import Score from '../score'
import { StarIconMui } from './styles'
import { Popover, usePopover } from '../popover'
import { openPopover } from '../../utils/popover'

const Pontuation: FC = () => {
    const popoverRef = usePopover()
    return (
        <Box>
            <Tooltip title="Pontuação">
                <IconButton onClick={openPopover(popoverRef)}>
                    <StarIconMui />
                </IconButton>
            </Tooltip>
            <Popover ref={popoverRef}>
                <Score />
            </Popover>
        </Box>
    );
};

export default Pontuation;
