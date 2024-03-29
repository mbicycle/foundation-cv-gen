import React, { memo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Grid } from '@mui/material';

import { useCategoryCertificatesContext } from 'containers/main-page/cv-form/local-state/hooks';
import { ButtonStep } from 'containers/main-page/cv-form/utils/constants';
import ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import { useGuestToken } from 'common/context/guest-token';
import { useGuestUser } from 'common/context/guest-user';
import type { Certificate } from 'common/models/User';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';
import useUnsaved from 'common/utils/hooks/useUnSaved';

import { useUpdateUserCertificate } from 'fields/certifications/lib/query-hooks';
import { CERTIFICATE_LINK } from 'fields/certifications/utils/constants';

import {
  FormControlStyledP4, SaveButtonWrapperStyled,
} from './addedCertificates/styled';
import CertificateSelectionForm from './CertificateSelectionForm';

const schema = yup.object({
  name: yup.string().trim().required(),
  link: yup.string().trim().url().required(),
  date: yup.date().required(),
}).required();

const CertificateEditTool = function (): JSX.Element {
  const { state: tokenState } = useGuestToken();
  const { state: user, dispatch } = useGuestUser();
  const { state } = useCategoryCertificatesContext();
  const {
    handleSubmit, control, formState: { isDirty },
  } = useForm<Certificate>({
    mode: 'onChange',
    defaultValues: { ...state },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { mutateAsync: updateMyCertificateAsync } = useUpdateUserCertificate();

  const defaultName = state.name;

  const onSaveHandle: SubmitHandler<Certificate> = (cert): void => {
    if (tokenState.isGuest) {
      const certificates = user.certificates || [];
      const certificateindex = certificates
        .findIndex((certificateItem) => certificateItem.id === cert.id);
      if (certificateindex >= 0) certificates[certificateindex] = { ...cert };
      dispatch({ certificates });
    } else {
      updateMyCertificateAsync({ ...cert, defaultName } as never);
    }
    navigate('/dashboard/certificates');
  };

  useBeforeUnload(isDirty);
  useUnsaved(isDirty);

  return (
    <form onSubmit={handleSubmit(onSaveHandle)}>
      <Grid container>
        <Grid
          container
          wrap="nowrap"
          gap={6}
          justifyContent="space-between"
        >
          <CertificateSelectionForm control={control} defaultValue={state} />
        </Grid>
        <FormControlStyledP4>
          <ReactHookFormTextFieldOutlined
            {...{
              name: 'link', control, label: CERTIFICATE_LINK, type: 'text', variant: 'outlined', state,
            }}
          />
        </FormControlStyledP4>
        <SaveButtonWrapperStyled item>
          <Button
            disabled={false}
            type="submit"
            variant="contained"
          >
            {ButtonStep.Save}
          </Button>
        </SaveButtonWrapperStyled>
      </Grid>
    </form>
  );
};

export default memo(CertificateEditTool);
