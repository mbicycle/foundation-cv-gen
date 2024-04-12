import type { GridCellProps } from "react-virtualized"

import TableCell from "containers/admin-table/components/TableCell"
import TableColumn from "containers/admin-table/components/TableColumn"
import { COLUMNS } from "containers/admin-table/utils/constants"

type ExtendedGridCellProps = GridCellProps & {
  data: AdminTableType.User[]
  mainKey: string
}

const createItemData = (columns: typeof COLUMNS, data: AdminTableType.User[]): TableCell.Data => ({
  columns,
  items: data,
})

function CellRenderer({ rowIndex, columnIndex, style, mainKey, data }: ExtendedGridCellProps): JSX.Element {
  const itemData = createItemData(COLUMNS, data)

  if (rowIndex === 0) {
    return <TableColumn colIndex={columnIndex} style={style} columns={COLUMNS} key={mainKey} />
  }

  return <TableCell colIndex={columnIndex} style={style} data={itemData} key={mainKey + rowIndex} rowIndex={rowIndex} />
}

export default CellRenderer
