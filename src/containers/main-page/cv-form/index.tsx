import { memo, Suspense } from "react"
import { Outlet } from "react-router-dom"

import CVFormStepper from "./components/stepper"
import CVFormTitle from "./components/title"

const CVForm = function (): JSX.Element {
  return (
    <Suspense>
      <div className="flex h-full w-full grow flex-col break-words px-10 py-5">
        <CVFormStepper />
        <CVFormTitle />
        <Outlet />
      </div>
    </Suspense>
  )
}

export default memo(CVForm)
