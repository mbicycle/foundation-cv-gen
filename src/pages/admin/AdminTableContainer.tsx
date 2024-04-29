import React, { useDeferredValue, useEffect, useMemo, useState } from "react"
import { InformationCircleIcon as InfoIcon, LinkIcon } from "@heroicons/react/24/solid"
import { Text } from "fields/personal-information/file-upload/utils/types"
import { ShareButton, tooltipShareText } from "fields/projects/components/utils/constants"
import sortBy from "lodash.sortby"
import { useDeleteUserFromDb } from "shared/api/user-service/query-hooks"
import { CONFIG } from "shared/config/envConfig"
import { getGuestToken } from "shared/lib/msal/features/api"
import CircularSpinner from "shared/ui/circular-spinner/circular-spinner"
import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"

import { Button, Input, Modal, Toggle, Tooltip } from "@mbicycle/foundation-ui-kit"

import { useDbUsersList } from "./api/query-hooks"
import useTableDataContext from "./local-state/useTableDataContext"
import Search from "./ui/Search"
import { AdminTable } from "./ui/VirtualizedTable"
import { MINIMUM_TABLE_HEIGHT } from "./utils/constants"
import { hooks } from "./api"

const { useGraphUsers } = hooks

function AdminTableContainer(): JSX.Element | null {
  const { state, dispatch } = useTableDataContext()
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isTokenLink, setTokenLink] = useState("")
  const [tableHeight, setTableHeight] = useState(() => window.innerHeight - MINIMUM_TABLE_HEIGHT)

  const closeHandle = (): void => {
    navigator.clipboard.writeText(isTokenLink).then(() => setOpen(false))
  }
  const openHandle = (): void => {
    setOpen(true)
  }

  function renderModal(): JSX.Element {
    return (
      <Modal open={isOpen} onClose={closeHandle}>
        <div>
          <h2>{Text.Success}</h2>
          &nbsp;
          <p className="text-gray-500">{Text.GuestAccess}</p>
          <p className="text-gray-500">{Text.LinkValid}</p>
          <div>
            <Input id="outlined-required" defaultValue={isTokenLink} />
          </div>
          <Button onClick={closeHandle} className="mt-6">
            {Text.Copy}
          </Button>
        </div>
      </Modal>
    )
  }

  const clickHandler = (): void => {
    setLoading(true)
    getGuestToken()
      .then((token) => {
        setTokenLink(`${CONFIG.redirectUri}?token=${token}`)
        openHandle()
        setLoading(false)
      })
      .catch(() => SnackBarUtils.error("Not success"))
  }

  function renderIcons(): JSX.Element | null {
    if (isLoading) {
      return <CircularSpinner size="large" />
    }
    return null
  }

  const { data, isLoading: isGraphUsersLoading } = useGraphUsers()
  const { data: dbUsersList, isLoading: isDbUsersListLoading } = useDbUsersList()
  const { mutateAsync } = useDeleteUserFromDb()

  const [checked, setChecked] = useState(false)
  const [filterData, setFilter] = useState<AdminTableType.FilterData>({
    prop: "displayName",
    searchValue: "",
  })

  const { value: users } = data ?? {}

  const handleResize = (): void => {
    setTableHeight(window.innerHeight - MINIMUM_TABLE_HEIGHT)
  }

  const dataMapped = useMemo(
    () =>
      users?.map((user) => {
        const userFromDb = dbUsersList?.find((item) => item.email === user.mail)
        return {
          ...user,
          hasCv: !!userFromDb,
          lastModified: userFromDb ? userFromDb.lastModified || "" : "",
        }
      }),
    [dbUsersList, users],
  )

  useEffect(() => {
    if (dataMapped) dispatch({ data: dataMapped })
  }, [dataMapped, dispatch])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Removes users those are in DB but not in Azure AD list.
    // https://github.com/mbicycle/cv-gen-react/issues/298
    const difference = dbUsersList
      ?.map((item) => item.email)
      ?.filter((dbEmail) => users && !users.map((user) => user.mail).includes(dbEmail))

    if (difference && difference?.length > 0) {
      mutateAsync(difference)
    }
  }, [dbUsersList, mutateAsync, users])

  const filteredUsers = useMemo(
    () =>
      state.data?.filter((item) =>
        item[filterData.prop]
          ?.toLowerCase()
          .split(" ")
          .filter((i) => i)
          .join(" ")
          .includes(
            filterData.searchValue
              .toLowerCase()
              .split(" ")
              .filter((i) => i)
              .join(" "),
          ),
      ),
    [state.data, filterData.prop, filterData.searchValue],
  )

  let deferredUsersValue = useDeferredValue(filteredUsers)

  const filterDataChangeHandler = (newFilterData: AdminTableType.FilterData): void => {
    setFilter(newFilterData)
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked)
  }

  function renderHideNoCvPersonnelControl(): JSX.Element {
    return (
      <div className="flex flex-row justify-end py-8">
        <Toggle checked={checked} onChange={handleFilterChange} label="Hide without CV" />
      </div>
    )
  }

  function renderTable(): JSX.Element | null {
    if (!deferredUsersValue?.length) {
      return (
        <div className="flex h-[60dvh] items-center justify-center">
          <h2>{Text.NoResults}</h2>
        </div>
      )
    }

    if (checked) {
      deferredUsersValue = deferredUsersValue?.filter((value) => value.hasCv)
    }

    const deferredSortedUsersValue = sortBy(
      deferredUsersValue,
      (o: AdminTableType.UserMapped) => !o.hasCv,
    ) as AdminTableType.User[]

    return (
      <div className={`h-[${tableHeight}px] min-h-[${MINIMUM_TABLE_HEIGHT}px] overflow-auto`}>
        {isGraphUsersLoading || isDbUsersListLoading ? (
          <CircularSpinner size="large" />
        ) : (
          <AdminTable data={deferredSortedUsersValue} />
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto h-max w-full max-w-screen-xl">
      <div className="inline-flex w-full justify-between pb-6 pt-8">
        <h1 className="mb-4 ml-6 mt-4 text-5xl">Sales panel</h1>
        <div className="flex items-center">
          <Button onClick={clickHandler} type="submit" disabled={isLoading} className="p-6" icon={LinkIcon}>
            {ShareButton.Label}
          </Button>
          <Tooltip content={tooltipShareText} classNameContent="left-[-150px] top-[20px] w-[300px]">
            <InfoIcon className="ml-1 size-6 text-lg text-gray-700" />
          </Tooltip>
        </div>
      </div>
      <Search onFilterDataChange={filterDataChangeHandler} filterData={filterData} />
      {renderHideNoCvPersonnelControl()}
      {renderIcons()}
      {renderTable()}
      {renderModal()}
    </div>
  )
}

export default AdminTableContainer
