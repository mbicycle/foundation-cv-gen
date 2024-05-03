import { useEffect } from "react"
import { useIsFetching } from "react-query"

import { useUserFromDb } from "widgets/cv-form/api/query-hooks"

import { useToggleSensitiveData } from "shared/context/toggle-sensetive-data"
import EmailIcon from "shared/ui/icons/EmailIcon"
import LogoIcon from "shared/ui/icons/LogoIcon"
import SkypeIcon from "shared/ui/icons/SkypeIcon"
import TelegramIcon from "shared/ui/icons/TelegramIcon"

const TopBox = function (): JSX.Element | null {
  const { data, refetch } = useUserFromDb()
  const isFetching = useIsFetching("db-user")
  const { state } = useToggleSensitiveData()

  const { email, skype, telegram } = data ?? {}
  const { checked: hiddenSensetiveData } = state

  useEffect(() => {
    if (isFetching) refetch()
  }, [refetch, isFetching])

  function renderContact(type: "telegram" | "skype", contact?: string): JSX.Element | null {
    if (!contact) return null
    return (
      <div className="flex w-full items-center">
        <div className="flex bg-blue-500">
          {type === "telegram" ? <TelegramIcon className="size-4" /> : <SkypeIcon className="size-4" />}
        </div>
        <h5 className="ml-1.5 text-white">{contact}</h5>
      </div>
    )
  }

  function renderSensetiveData(): JSX.Element | null {
    if (hiddenSensetiveData) return null

    return (
      <div className="inline h-[90%] w-min">
        <div className="flex w-full items-center">
          <div className="flex bg-blue-500">
            <EmailIcon className="size-4" />
          </div>
          <h5 className="ml-1.5 pb-1.5 text-white">{email}</h5>
        </div>
        {renderContact("skype", skype)}
        {renderContact("telegram", telegram)}
      </div>
    )
  }

  return (
    <div className="grid h-[14rem] grid-cols-12 bg-blue-500">
      <div className="col-span-3 pl-8 pt-4">
        <LogoIcon className="h-[42px] w-[174px]" />
      </div>
      <div className="col-span-9 flex h-1/2 w-full flex-col items-end pl-20 pr-36 pt-4">{renderSensetiveData()}</div>
    </div>
  )
}

export default TopBox
