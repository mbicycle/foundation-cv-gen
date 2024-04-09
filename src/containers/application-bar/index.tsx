import { Fragment, memo } from "react"
import { Link } from "react-router-dom"
import { Menu, Transition } from "@headlessui/react"
import msalUtils from "shared/msalUtils"
import { msalConfig } from "shared/utils/authConfig"
import { msalInstance } from "shared/utils/interceptors"

import { Button, Divider } from "@mbicycle/foundation-ui-kit"

import { ROUTE } from "common/components/routes/utils/constants"
import { useGuestToken } from "common/context/guest-token"
import LogoIcon from "common/icons/LogoIcon"
import PersonIcon from "common/icons/PersonIcon"
import { useUserPhoto } from "common/services/user-service/hooks/useUserPhoto"

import PdfButtonSet from "./ButtonSet"

const ApplicationBar = function (): JSX.Element {
  const { user } = msalUtils.useAuth()
  const { photo } = useUserPhoto()
  const { state: tokenState } = useGuestToken()

  const logoutHandle = async (): Promise<void> => {
    const msalAccount = msalInstance.getAllAccounts()[0]
    const logoutRequest = {
      account: msalAccount,
      postLogoutRedirectUri: msalConfig.auth.redirectUri,
      mainWindowRedirectUri: msalConfig.auth.redirectUri,
    }

    await msalInstance.logoutPopup(logoutRequest)
  }

  const renderUserMenu = (): JSX.Element | null => {
    if (tokenState.isGuest) return null
    return (
      <>
        <Divider orientation="vertical" className="bg-gradient-to-b via-white" />
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button
              className="relative flex rounded-full bg-gray-800 text-sm
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              {photo ? (
                <img className="size-10 rounded-full" src={photo} alt={user?.mail || "Avatar"} />
              ) : (
                <PersonIcon className="size-10" />
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg
              ring-1 ring-black ring-opacity-5
              focus:outline-none"
            >
              <Menu.Item>
                <Button onClick={logoutHandle} size="medium" variant="transparent">
                  Logout
                </Button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </>
    )
  }

  return (
    <header className="w-full bg-blue-500 px-10 py-4 text-white">
      <div className="flex justify-between">
        <Link to={`dashboard/${ROUTE.DASHBOARD.PERSONAL_INFORMATION}`}>
          <LogoIcon className="h-full w-[150px]" />
        </Link>
        {user && (
          <div className="flex w-auto items-center">
            <PdfButtonSet />
            {renderUserMenu()}
          </div>
        )}
      </div>
    </header>
  )
}

export default memo(ApplicationBar)
