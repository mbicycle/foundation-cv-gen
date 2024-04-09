import {
  Divider,
  styled,
} from '@mui/material';

export const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.border,
  margin: theme.spacing(3, 0, 6, 0),
}));
