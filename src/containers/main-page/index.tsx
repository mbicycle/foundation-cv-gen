import { memo } from "react"

import CvFormProvider from "./cv-form/local-state/CVFormProvider"
import CVForm from "./cv-form"
import Preview from "./preview"

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
