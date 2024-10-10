import { styled } from '@mui/material/styles';
import { Box as BoxMui } from '@mui/material';
import {Typography as TypographyMui } from '@mui/material';

export const FilterBox = styled(BoxMui)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    gap: theme.spacing(2)
}));

export const ModalText = styled(TypographyMui)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.unioeste.neutral.p90,
}))
