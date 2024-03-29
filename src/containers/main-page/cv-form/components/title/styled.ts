import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FieldTitleStyled = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  padding: theme.spacing(2, 0, 6, 0),
}));

export const FieldFormTitleWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));
