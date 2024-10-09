import { styled } from '@mui/material/styles';
import { Box as BoxMui } from '@mui/material';
import {Typography as TypographyMui } from '@mui/material';
import { FONT_WEIGHTS } from '../../../themes/fonts';

export const FilterBox = styled(BoxMui)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    gap: theme.spacing(2)
}));

export const ModalContainer = styled(BoxMui)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.unioeste.neutral.p10,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  maxWidth: theme.spacing(62.5),
  margin: 'auto',
}));

export const ModalTitle = styled(TypographyMui)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: FONT_WEIGHTS.bold,
  color: theme.palette.unioeste.neutral.p100,
  fontSize: theme.spacing(2)
}));

export const ModalText = styled(TypographyMui)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.unioeste.neutral.p90,
}))
