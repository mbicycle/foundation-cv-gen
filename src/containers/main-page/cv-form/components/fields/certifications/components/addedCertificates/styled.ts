import {
  Box, FormControl, Grid, styled,
} from '@mui/material';

export const AddedCertificateItemStyled = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  flexDirection: 'column',
  maxHeight: 'calc(100vh - 35rem)',
  minHeight: '80px',
  overflow: 'auto',
}));

export const GridWrapperStyled = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const FormControlStyled = styled(FormControl)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  width: '100%',
}));

export const FormControlStyledP4 = styled(FormControl)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  width: '100%',
}));

export const SaveButtonWrapperStyled = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  width: '100%',
  display: 'inline-flex',
  justifyContent: 'flex-end',
}));
