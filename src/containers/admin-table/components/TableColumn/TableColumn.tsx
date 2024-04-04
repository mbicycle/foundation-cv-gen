import {
  forwardRef,
  memo,
  useState,
} from 'react';
import orderBy from 'lodash.orderby';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import useTableDataContext from 'containers/admin-table/local-state/useTableDataContext';

import type { ObjectKeys } from './types';

 interface TableColumnsProps {
  columns: AdminTableType.Column[];
  colIndex: number;
  style?: React.CSSProperties;
 }

function TableColumns({
  columns,
  colIndex,
  style,
}: TableColumnsProps, ref: React.Ref<HTMLDivElement>): JSX.Element {
  const { state, dispatch } = useTableDataContext();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const item: ObjectKeys | AdminTableType.Column = columns[colIndex];

  const changeDirectionHandle = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { sortKey } = event.currentTarget.dataset ?? {};

    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));

    if (state) {
      const sorted = orderBy(
        state.data,
        (user: AdminTableType.User) => user[sortKey as keyof AdminTableType.User],
        sortDirection,
      );
      dispatch({ data: sorted });
    }
  };

  function renderSortingButtons(): JSX.Element | null {
    if (colIndex === columns.length - 1) return null;
    return (
      <button className="ml-2" type="button" onClick={changeDirectionHandle} data-sort-key={item.dataKey}>
        {sortDirection === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      </button>
    );
  }

  return (
    <div
      className="font-semibold border-b border-gray-300 text-left text-2xl p-8"
      ref={ref}
      style={style}
      key={colIndex}
    >
      <div className="flex items-center flex-nowrap">
        {item.label}
        {renderSortingButtons()}
      </div>
    </div>
  );
}

export default memo(forwardRef(TableColumns));
