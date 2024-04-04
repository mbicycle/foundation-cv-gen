import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { AccordionSummaryProps } from '@mui/material';
import {
  Accordion,
  AccordionSummary,
  Divider,
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
