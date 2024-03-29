import type { Control } from 'react-hook-form';

import { Grid } from '@mui/material';

import type {
  CategoryNameStateCertificates,
} from 'containers/main-page/cv-form/local-state/CategoryIdContext';
import ReactHookFormDatePicker
  from 'common/components/react-hook-forms/ReactHookFormDatePicker';
import ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import type { Certificate } from 'common/models/User';

import { CERTIFICATE_DATE, CERTIFICATE_TITLE } from 'fields/certifications/utils/constants';

import { FormControlStyled } from './addedCertificates/styled';

const CertificateSelectionForm = function ({ control, defaultValue }:
  { control: Control<Certificate>, defaultValue?: CategoryNameStateCertificates }): JSX.Element {
  return (
    <>
      <Grid item xs={8}>
        <FormControlStyled>
          <ReactHookFormTextFieldOutlined
            {...{
              name: 'name',
              control,
              state: defaultValue,
              label: CERTIFICATE_TITLE,
              type: 'text',
              variant: 'outlined',
            }}
          />
        </FormControlStyled>
      </Grid>
      <Grid item xs={8}>
        <FormControlStyled>
          <ReactHookFormDatePicker
            control={control}
            name="date"
            defaultValue={defaultValue?.date}
            maxDate={new Date()}
            minDate={new Date(1991, 4, 17)}
            label={CERTIFICATE_DATE}
          />
        </FormControlStyled>
      </Grid>
    </>
  );
};

export default CertificateSelectionForm;
