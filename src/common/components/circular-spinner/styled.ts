import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

export const CircularProgressWrapperStyled = styled('div')({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  height: '100%',
});

export const CircularProgressStyled = styled(CircularProgress)(({
  margin: 'auto',
}));
