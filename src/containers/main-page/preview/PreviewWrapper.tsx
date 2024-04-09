import { PreviewWarningText } from "containers/main-page/preview/utils/constants"
import CircleIcon from "common/icons/CircleIcon"
import WarningIcon from "common/icons/Warning"
import { useValidateCV } from "common/utils/hooks/useValidateCV"

import PersonalDetails from "./PersonalDetails"
import TopBox from "./TopBox"

const PreviewWrapper = function (): JSX.Element {
  const { isValid, isFetching, invalidBlocks } = useValidateCV()
  return (
    <div className="m-auto mt-14 w-[210mm]">
      {!isFetching && !isValid && (
        <div className="m-auto mb-4 flex w-[200mm] flex-row items-center justify-start bg-white p-4">
          <WarningIcon className="size-6" />
          <div>
            <p>{PreviewWarningText.Title}</p>
            <p>{PreviewWarningText.Content}</p>
            {invalidBlocks.map((invalidBlock) => (
              <p key={invalidBlock} className="pl-1.5">
                <CircleIcon />
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
