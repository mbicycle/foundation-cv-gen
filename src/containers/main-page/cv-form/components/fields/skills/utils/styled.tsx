import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
import type { AccordionSummaryProps } from '@mui/material';
import {
  Accordion,
  AccordionSummary,
  Box, Divider,
  styled,
} from '@mui/material';

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

export const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.border,
  margin: theme.spacing(3, 0, 6, 0),
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
