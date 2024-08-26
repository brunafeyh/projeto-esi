import React, { useState, MouseEvent } from 'react';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Score from '../score';

const Pontuation: React.FC = () => {
    // State to manage the anchor element for the popover
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Function to handle click event to open popover
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle closing of the popover
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Boolean to determine if popover is open
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton onClick={handleClick}>
                <StarIcon />
            </IconButton>
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
                <Score/>
            </Popover>
        </div>
    );
};

export default Pontuation;
