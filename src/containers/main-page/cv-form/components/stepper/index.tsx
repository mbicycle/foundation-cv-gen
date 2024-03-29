import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

import { useSetStep } from 'containers/main-page/cv-form/components/controls/hooks';
import { CV_FORM_STEPS } from 'containers/main-page/cv-form/utils/constants';
import useUnsaved from 'common/utils/hooks/useUnSaved';

import { StepConnectorStyled, StepStyled } from './styled';

const CVFormStepper = function (): JSX.Element {
  const { activeStep } = useSetStep();
  const navigate = useNavigate();
  const { openDialogHandler } = useUnsaved();

  const navigateStepHandle = (event: React.MouseEvent, step: string): void => {
    openDialogHandler({ handleLeave: () => navigate(step) });
    event.currentTarget.scrollIntoView({ block: 'center', inline: 'center' });
  };

  return (
    <Stepper
      activeStep={activeStep}
      connector={<StepConnectorStyled />}
      sx={{ overflow: 'auto', pb: 4 }}
      nonLinear
    >
      {CV_FORM_STEPS.map((label) => (
        <StepStyled key={label.text}>
          <StepLabel onClick={(event) => navigateStepHandle(event, label.route)}>
            <Typography variant="body2" noWrap>{label.text}</Typography>
          </StepLabel>
        </StepStyled>
      ))}
    </Stepper>
  );
};

export default memo(CVFormStepper);
