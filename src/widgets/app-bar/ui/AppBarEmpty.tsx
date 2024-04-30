import { Link } from "react-router-dom"

import { ROUTE } from "app/routes/utils/constants"

import LogoIcon from "shared/ui/icons/LogoIcon"

export const ApplicationBarEmpty = function (): JSX.Element {
  return (
    <header className="w-full bg-blue-500 px-10 py-4 text-white">
      <div className="flex justify-between">
        <Link to={`dashboard/${ROUTE.DASHBOARD.PERSONAL_INFORMATION}`}>
          <LogoIcon className="h-full w-[150px]" />
        </Link>
        <div />
      </div>
    </header>
  )
}
