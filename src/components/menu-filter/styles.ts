import { styled, TextField as MuiTextField, FormControl as FormControlMui, InputLabel as InputLabelMui, Select as SelectMui } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const IconSearch = styled(SearchIcon)(({ theme }) => ({
    height: theme.spacing(2),
    width: theme.spacing(2)
}))


export const TextField = styled(MuiTextField)(({ theme }) => ({
    backgroundColor: theme.palette.unioeste.neutral.p20,
    '& .MuiInputBase-root': {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
    },
    '& .MuiInputLabel-root': {
        color: '#9e9e9e',
        transform: 'translate(0, 6px) scale(1)',
    },
    '& .MuiInputLabel-shrink': {
        color: '#424242',
        transform: 'translate(4px, 3px) scale(0.75)',
    },
    '& .MuiInputBase-input': {
        paddingTop: theme.spacing(0.75),
        paddingBottom: theme.spacing(0.75),
        fontSize: theme.spacing(1.75),
    },
    width: '100%',
    maxWidth: theme.spacing(75),
}));

export const FormControl = styled(FormControlMui)(({ theme }) => ({
    minWidth: theme.spacing(25),
    backgroundColor: '#f5f5f5'
}));

export const InputLabel = styled(InputLabelMui)(() => ({
    fontSize: '0.875rem'
}));

export const Select = styled(SelectMui)(() => ({
    '& .MuiSelect-select': {
        backgroundColor: '#f9f9f9',
        fontSize: 12
    },
    '& .MuiInputBase-root': {
        paddingTop: '0px',
    },
}));