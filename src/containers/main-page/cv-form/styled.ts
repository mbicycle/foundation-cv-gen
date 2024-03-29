import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CVFormWrapperStyled = styled(Box, {
  name: 'CVFormWrapperDtyled',
})({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  wordBreak: 'break-word',
});

export const CVFormContainerStyled = styled(Box, {
  name: 'CVFormContainerStyled',
})(({ theme }) => ({
  padding: theme.spacing(5, 10),
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  wordBreak: 'break-word',
}));
