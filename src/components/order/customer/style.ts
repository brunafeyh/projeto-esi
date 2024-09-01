import { styled } from '@mui/material/styles';
import { Box as BoxMui } from '@mui/material';
import {Typography as TypographyMui, Button as ButtonMui } from '@mui/material';

export const FilterBox = styled(BoxMui)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    gap: theme.spacing(2)
}));

export const ModalContainer = styled(BoxMui)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  maxWidth: '500px',
  margin: 'auto',
}));

export const ModalTitle = styled(TypographyMui)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
}));

export const ModalText = styled(TypographyMui)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const CloseButton = styled(ButtonMui)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1, 4),
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
