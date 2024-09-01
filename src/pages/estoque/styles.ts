import { Box as BoxMui, styled} from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';

export const EditIcon = styled(Edit)(({ theme }) => ({
    height: theme.spacing(2),
    width: theme.spacing(2),
}));

export const DeleteIcon = styled(Delete)(({ theme }) => ({
    height: theme.spacing(2),
    width: theme.spacing(2),
}));

export const ActionBox = styled(BoxMui)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(1.5)
}));

export const Box = styled(BoxMui)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: theme.spacing(1.5),
    alignItems: 'center',
    marginBottom: theme.spacing(2)
}));