import { useState, MouseEvent, FC } from 'react'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Score from '../score'
import { StarIconMui } from './styles'
import { Box, Tooltip } from '@mui/material'

const Pontuation: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box>
            <Tooltip title='Pontuação'>
                <IconButton onClick={handleClick}>
                    <StarIconMui />
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Score />
            </Popover>
        </Box>
    );
};

export default Pontuation;
