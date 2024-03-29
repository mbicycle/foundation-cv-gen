import {
  Step, StepConnector, stepConnectorClasses,
  styled,
} from '@mui/material';

export const StepStyled = styled(Step)({
  padding: 0,

  '&:hover': {
    cursor: 'pointer',
  },
  '.Mui-disabled:hover': {
    cursor: 'pointer',
  },
});

export const StepConnectorStyled = styled(StepConnector, {
  name: 'StepConnectorStyled',
})(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.light,
    },
  },
}));
