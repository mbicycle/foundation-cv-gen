import { forwardRef, memo, useState } from "react"
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid"
import orderBy from "lodash.orderby"

import useTableDataContext from "pages/admin/local-state/useTableDataContext"

import type { ObjectKeys } from "./types"
import UserMapped = AdminTableType.UserMapped

interface TableColumnsProps {
  columns: AdminTableType.Column[]
  colIndex: number
  style?: React.CSSProperties
}

function TableColumns({ columns, colIndex, style }: TableColumnsProps, ref: React.Ref<HTMLDivElement>): JSX.Element {
  const { state, dispatch } = useTableDataContext()
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const item: ObjectKeys | AdminTableType.Column = columns[colIndex]

  const changeDirectionHandle = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { sortKey } = event.currentTarget.dataset ?? {}

    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))

    if (state) {
      const sorted = orderBy(
        state.data,
        (user: AdminTableType.User) => user[sortKey as keyof AdminTableType.User],
        sortDirection,
      )
      dispatch({ data: sorted as UserMapped[] })
    }
  }

  function renderSortingButtons(): JSX.Element | null {
    if (colIndex === columns.length - 1) return null
    return (
      <button className="ml-2" type="button" onClick={changeDirectionHandle} data-sort-key={item.dataKey}>
        {sortDirection === "asc" ? <ArrowDownIcon className="size-5" /> : <ArrowUpIcon className="size-5" />}
      </button>
    )
  }

  return (
    <div className="border-b border-gray-300 p-8 text-left font-semibold" ref={ref} style={style} key={colIndex}>
      <div className="flex flex-nowrap items-center">
        {item.label}
        {renderSortingButtons()}
      </div>
    </div>
  )
}

export default memo(forwardRef(TableColumns))
