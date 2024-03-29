import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';

export const InfoIconStyled = styled(InfoIcon)(({ theme }) => ({
  cursor: 'default',
  paddingTop: theme.spacing(1),
}));

export const ListWrapperStyled = styled('div')(({ theme }) => ({
  maxHeight: 'calc(100vh - 35rem)',
  minHeight: '8rem',
  overflow: 'auto',
  width: '100%',
  border: `1px solid ${theme.palette.border}`,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));
