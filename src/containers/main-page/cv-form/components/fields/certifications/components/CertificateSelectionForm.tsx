import type { Control } from 'react-hook-form';
import { CERTIFICATE_DATE, CERTIFICATE_TITLE } from 'fields/certifications/utils/constants';

import type {
  CategoryNameStateCertificates,
} from 'containers/main-page/cv-form/local-state/CategoryIdContext';
import ReactHookFormDatePicker
  from 'common/components/react-hook-forms/ReactHookFormDatePicker';
import ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import type { Certificate } from 'common/models/User';

const CertificateSelectionForm = function ({ control, defaultValue }:
  { control: Control<Certificate>, defaultValue?: CategoryNameStateCertificates }): JSX.Element {
  return (
    <>
      <div className="col-span-8">
        <div className="pt-1 w-full">
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
        </div>
      </div>
      <div className="col-span-8">
        <div className="pt-1 w-full">
          <ReactHookFormDatePicker
            control={control}
            name="date"
            defaultValue={defaultValue?.date}
            maxDate={new Date()}
            minDate={new Date(1991, 4, 17)}
            label={CERTIFICATE_DATE}
          />
        </div>
      </div>
    </>
  );
};

export default CertificateSelectionForm;
