import {
  Box, Button, styled, Typography,
} from '@mui/material';

export const MessageContainerStyled = styled(Box)(({ theme }) => ({
  margin: 'auto',
  padding: `${theme.spacing(15)} ${theme.spacing(20)}`,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.border}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const MessageTitleStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  paddingBottom: theme.spacing(1),
}));

export const MessageTextStyled = styled(Typography)({
  fontWeight: 300,
});

export const MaintenanceContainerStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
});

export const ButtonStyled = styled(Button)(({ theme }) => ({
  fontSize: '2rem',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));
