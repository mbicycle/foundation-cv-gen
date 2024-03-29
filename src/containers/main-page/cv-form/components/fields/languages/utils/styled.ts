import {
  FormControl, Grid, styled, Typography,
} from '@mui/material';

export const GridWrapperStyled = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const FormControlStyled = styled(FormControl)(({ theme }) => ({
  paddingTop: theme.spacing(0.7),
  width: '100%',
}));

export const MenuItemText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

export const SaveButtonWrapperStyled = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  width: '100%',
  display: 'inline-flex',
  justifyContent: 'flex-end',
}));
