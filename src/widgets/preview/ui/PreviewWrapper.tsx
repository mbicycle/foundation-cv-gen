import { PreviewWarningText } from "widgets/preview/model/constants"

import { useValidateCV } from "shared/lib/hooks/useValidateCV"
import CircleIcon from "shared/ui/icons/CircleIcon"
import WarningIcon from "shared/ui/icons/Warning"

import PersonalDetails from "./PersonalDetails"
import TopBox from "./TopBox"

const PreviewWrapper = function (): JSX.Element {
  const { isValid, isFetching, invalidBlocks } = useValidateCV()
  return (
    <div className="m-auto mt-14 w-[210mm]">
      {!isFetching && !isValid && (
        <div className="m-auto mb-4 flex w-[200mm] flex-row items-center justify-start bg-white p-4">
          <WarningIcon className="mr-4 size-6" />
          <div>
            <p>{PreviewWarningText.Title}</p>
            <p>{PreviewWarningText.Content}</p>
            {invalidBlocks.map((invalidBlock) => (
              <p key={invalidBlock} className="pl-1.5">
                <CircleIcon className="mr-2 inline size-2 text-blue-500" />
                {invalidBlock}
              </p>
            ))}
          </div>
        </div>
      )}
      <div className="max-w-full bg-white p-3 pb-16">
        <div className="flex flex-col">
          <div className="w-full">
            <TopBox />
          </div>
          <div className="z-20 m-auto mt-[-8rem] max-w-full">
            <PersonalDetails />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewWrapper
