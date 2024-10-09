import { styled } from '@mui/material/styles';
import { Box as BoxMui } from '@mui/material';

export const Box = styled(BoxMui)(({ theme }) => ({
    height: theme.spacing(90),
    width: theme.spacing(80)
}));