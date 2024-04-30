import { Fragment, memo } from "react"
import { Link } from "react-router-dom"
import { Menu, Transition } from "@headlessui/react"

import { Button, Divider } from "@mbicycle/foundation-ui-kit"
import { logoutFn } from "@mbicycle/msal-bundle"

import { ROUTE } from "app/routes/utils/constants"

import { useUserPhoto } from "shared/api/user-service/hooks/useUserPhoto"
import { CONFIG } from "shared/config/envConfig"
import { useGuestToken } from "shared/context/guest-token"
import msalUtils from "shared/lib/msal"
import msGraphInstance from "shared/lib/msal/instance"
import LogoIcon from "shared/ui/icons/LogoIcon"
import PersonIcon from "shared/ui/icons/PersonIcon"

import PdfButtonSet from "./ui/ButtonSet"

const ApplicationBar = function (): JSX.Element {
  const { user } = msalUtils.useAuth()
  const { photo } = useUserPhoto()
  const { state: tokenState } = useGuestToken()

  const logoutHandle = () => {
    logoutFn(msGraphInstance.msalInstance, `${CONFIG.redirectUri}?logout=true`)
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
              className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white py-1 shadow-lg
              ring-1 ring-black ring-opacity-5
              focus:outline-none"
            >
              <Menu.Item>
                <Button onClick={logoutHandle} size="medium" variant="empty" className="mx-1">
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
