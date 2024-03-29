import React, { memo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';

import { ButtonStep } from 'containers/main-page/cv-form/utils/constants';
import ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import { useGuestToken } from 'common/context/guest-token';
import { useGuestUser } from 'common/context/guest-user';
import type { Certificate } from 'common/models/User';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';
import useUnsaved from 'common/utils/hooks/useUnSaved';

import { useAddUserCertificate } from 'fields/certifications/lib/query-hooks';
import { CERTIFICATE_LINK } from 'fields/certifications/utils/constants';

import {
  FormControlStyledP4, GridWrapperStyled, SaveButtonWrapperStyled,
} from './addedCertificates/styled';
import CertificateSelectionForm from './CertificateSelectionForm';

const schema = yup.object({
  name: yup.string().trim().required(),
  link: yup.string().trim().url().required(),
  date: yup.date().required(),
}).required();

const CertificateSelection = function (): JSX.Element {
  const { state: tokenState } = useGuestToken();
  const { state: user, dispatch } = useGuestUser();
  const {
    handleSubmit, control, formState: { isValid, isDirty },
  } = useForm<Certificate>({ mode: 'onChange', resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { mutateAsync: addMyCertificateAsync, isLoading } = useAddUserCertificate();

  const onSaveHandle: SubmitHandler<Certificate> = async (cert): Promise<void> => {
    if (tokenState.isGuest) {
      dispatch({ certificates: [...user.certificates, { ...cert, id: uuidv4() }] });
    } else {
      await addMyCertificateAsync({ ...cert, id: uuidv4() } as never);
    }
    navigate('/dashboard/certificates');
  };

  useBeforeUnload(isDirty);
  useUnsaved(isDirty);

  return (
    <form onSubmit={handleSubmit(onSaveHandle)}>
      <GridWrapperStyled container>
        <Grid
          container
          wrap="nowrap"
          gap={6}
          justifyContent="space-between"
        >
          <CertificateSelectionForm control={control} />
        </Grid>
        <FormControlStyledP4>
          <ReactHookFormTextFieldOutlined
            {...{
              name: 'link', control, label: CERTIFICATE_LINK, type: 'text', variant: 'outlined',
            }}
          />
        </FormControlStyledP4>
        <SaveButtonWrapperStyled item>
          <LoadingButton
            disabled={!isValid}
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            {ButtonStep.Save}
          </LoadingButton>
        </SaveButtonWrapperStyled>
      </GridWrapperStyled>
    </form>
  );
};

export default memo(CertificateSelection);
