import { memo } from "react"

import { Input } from "@mbicycle/foundation-ui-kit"

import { useWildcardContext } from "pages/admin/local-state"

interface SearchProps {
  onFilterDataChange: (v: AdminTableType.FilterData) => void
  filterData: AdminTableType.FilterData
}

function Search({ onFilterDataChange, filterData }: SearchProps): JSX.Element {
  const { dispatch } = useWildcardContext()

  const propChangeHandle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { value } = e.target as HTMLButtonElement
    dispatch({ column: value })

    onFilterDataChange({
      ...filterData,
      prop: value as keyof AdminTableType.User,
    })
  }

  const inputChangeHandle = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
    dispatch({ wildcard: (e.target as HTMLInputElement).value })
    onFilterDataChange({
      ...filterData,
      searchValue: (e.target as HTMLInputElement).value,
    })
  }

  const commonBtnClass =
    "px-4 py-2 text-md font-medium border-blue-500 " +
    "hover:bg-blue-600 hover:text-white focus:z-10 " +
    "focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white"
  const activeBtnClass = "text-white bg-blue-500"
  const inactiveBtnClass = "text-blue-500 bg-transparent"

  return (
    <form className="flex w-full min-w-[720px] items-center justify-between gap-4 px-2 py-1">
      <Input wrapperClasses="ml-8 w-3/4" placeholder="Search..." aria-label="search" onInput={inputChangeHandle} />
      <div className="flex w-1/4 items-center justify-end gap-4">
        <p>by:</p>
        <div className="inline-flex uppercase">
          <button
            type="button"
            value="displayName"
            onClick={propChangeHandle}
            className={`rounded-s-lg border 
            ${commonBtnClass} 
            ${filterData.prop === "displayName" ? activeBtnClass : inactiveBtnClass}
            `}
          >
            name
          </button>
          <button
            type="button"
            value="mail"
            onClick={propChangeHandle}
            className={`border-b border-t
                  ${commonBtnClass} 
                   ${filterData.prop === "mail" ? activeBtnClass : inactiveBtnClass}
                   `}
          >
            e-mail
          </button>
          <button
            type="button"
            value="jobTitle"
            onClick={propChangeHandle}
            className={`rounded-e-lg border
                      ${commonBtnClass} 
                      ${filterData.prop === "jobTitle" ? activeBtnClass : inactiveBtnClass}
                      `}
          >
            title
          </button>
        </div>
      </div>
    </form>
  )
}

export default memo(Search)
