import type { Control } from "react-hook-form"
import type { Certificate } from "entities/user/model"
import { CERTIFICATE_DATE, CERTIFICATE_TITLE } from "fields/certifications/utils/constants"
import ReactHookFormDatePicker from "shared/ui/react-hook-forms/ReactHookFormDatePicker"
import ReactHookFormTextFieldOutlined from "shared/ui/react-hook-forms/ReactHookFormTextFieldOutlined"

import type { CategoryNameStateCertificates } from "containers/main-page/cv-form/local-state/CategoryIdContext"

const CertificateSelectionForm = function ({
  control,
  defaultValue,
}: {
  control: Control<Certificate>
  defaultValue?: CategoryNameStateCertificates
}): JSX.Element {
  return (
    <>
      <div className="col-span-8 w-full">
        <div className="w-full pt-1">
          <ReactHookFormTextFieldOutlined
            {...{
              name: "name",
              control,
              state: defaultValue,
              label: CERTIFICATE_TITLE,
              type: "text",
            }}
          />
        </div>
      </div>
      <div className="col-span-8">
        <div className="w-full pt-1">
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
  )
}

export default CertificateSelectionForm
