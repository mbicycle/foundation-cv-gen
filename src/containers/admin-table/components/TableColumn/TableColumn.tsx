import {
  forwardRef,
  memo,
  useState,
} from 'react';
import orderBy from 'lodash.orderby';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TableCell from '@mui/material/TableCell';

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
      <IconButton size="medium" onClick={changeDirectionHandle} data-sort-key={item.dataKey}>
        {sortDirection === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      </IconButton>
    );
  }

  return (
    <Box>
      <TableCell
        ref={ref}
        style={style}
        key={colIndex}
        component="div"
        variant="head"
        scope="col"
        align="left"
      >
        <Grid
          item
          container
          alignItems="center"
          wrap="nowrap"
        >
          {item.label}
          {renderSortingButtons()}
        </Grid>
      </TableCell>
    </Box>
  );
}

export default memo(forwardRef(TableColumns));
