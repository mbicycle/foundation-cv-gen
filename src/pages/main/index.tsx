import { memo } from "react"

import CVForm from "widgets/cv-form"
import CvFormProvider from "widgets/cv-form/local-state/CVFormProvider"
import Preview from "widgets/preview"

const MainPage = function (): JSX.Element {
  return (
    <div className="box-border flex h-full w-full flex-row overflow-x-auto bg-white">
      <CvFormProvider>
        <CVForm />
      </CvFormProvider>
      <div className="flex h-full w-full min-w-[213mm] flex-nowrap bg-gray-100 sm:overflow-auto">
        <Preview />
      </div>
    </div>
  )
}

export default memo(MainPage)
