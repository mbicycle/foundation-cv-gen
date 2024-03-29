import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
import type { AccordionSummaryProps } from '@mui/material';
import {
  Accordion,
  AccordionSummary,
  Box, Button, Divider,
  Grid, styled, Typography,
} from '@mui/material';

export const CategoryContainerStyled = styled(Box)(({ theme }) => ({
  height: 'max-content',
  flexGrow: 1,
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  wordBreak: 'break-all',
}));

export const AccordionStyled = styled(Accordion)(({ theme }) => ({
  background: 'none',
  border: `1px solid ${theme.palette.border}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0, 0),
}));

export const AccordionSummaryStyled = styled((props: AccordionSummaryProps) => (
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiAccordionSummary-content.Mui-expanded': {
    margin: theme.spacing(0),
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(0),
  },
}));

export const ToolsContainerStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  rowGap: '1rem',
  flexDirection: 'column',
  minHeight: '8rem',
  width: '100%',
  maxHeight: 'calc(100vh - 40rem)',
  overflowY: 'auto',
  border: `1px solid ${theme.palette.border}`,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

export const InputContainerStyled = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  paddingTop: theme.spacing(4, 4, 0, 4),
}));

export const AddToolButtonStyled = styled(Button)(({ theme }) => ({
  width: 220,
  height: 48,
  marginTop: -2,
  padding: theme.spacing(0, 4),
}));

export const AddCircleIconStyled = styled(AddCircleIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

export const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.border,
  margin: theme.spacing(3, 0, 6, 0),
}));

export const ToolContainerStyled = styled(Grid)(() => ({
  overflowY: 'scroll',
}));

export const AddToolContainerStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
});

export const DividerTool = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(2),
}));

export const DragTool = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  paddingRight: theme.spacing(2),
}));

export const DividerBottom = styled('div')({
  display: 'flex',
  width: '40%',
  height: '3.3rem',
});

export const MenuItemText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

export const BoxButtonWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
}));

export const SaveButtonStyled = styled(LoadingButton)(() => ({
  height: 48,
}));

export const ShareButtonStyled = styled(LoadingButton)(({ theme }) => ({
  height: 48,
  marginRight: theme.spacing(2),
}));

export const ShareButtonWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const ShareButtonContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '25.7rem',
  justifyContent: 'space-between',
});

export const CancelButtonStyled = styled(SaveButtonStyled)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const SaveButtonWrapperStyled = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  marginTop: theme.spacing(5),
  display: 'inline-flex',
  justifyContent: 'flex-end',
}));
