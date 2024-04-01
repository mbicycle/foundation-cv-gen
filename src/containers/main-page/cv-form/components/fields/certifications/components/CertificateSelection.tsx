import { memo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mbicycle/foundation-ui-kit';
import { useAddUserCertificate } from 'fields/certifications/lib/query-hooks';
import { CERTIFICATE_LINK } from 'fields/certifications/utils/constants';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { ButtonStep } from 'containers/main-page/cv-form/utils/constants';
import ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import { useGuestToken } from 'common/context/guest-token';
import { useGuestUser } from 'common/context/guest-user';
import type { Certificate } from 'common/models/User';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';
import useUnsaved from 'common/utils/hooks/useUnSaved';

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

  // TODO: loading btn
  return (
    <form onSubmit={handleSubmit(onSaveHandle)}>
      <div className="p-3">
        <div className="flex flex-nowrap gap-6 justify-between">
          <CertificateSelectionForm control={control} />
        </div>
        <div className="pt-4">
          <ReactHookFormTextFieldOutlined
            {...{
              name: 'link', control, label: CERTIFICATE_LINK, type: 'text', variant: 'outlined',
            }}
          />
        </div>
        <div className="saveBtnWrapper">
          <Button
            disabled={!isValid}
            type="submit"
            variant="transparent"
            // loading={isLoading}
          >
            {ButtonStep.Save}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default memo(CertificateSelection);
