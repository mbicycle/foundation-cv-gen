import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, ListItemText, styled } from '@mui/material';

export const AddResponsibilityButtonStyled = styled(Button)(({ theme }) => ({
  width: 220,
  height: 48,
  padding: theme.spacing(0, 4),
  backgroundColor: theme.palette.grey[300],
}));

export const AddCircleIconStyled = styled(AddCircleIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

export const ListItemTextStyled = styled(ListItemText)(() => ({
  maxWidth: '50rem',
  '& .MuiTypography-root': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
