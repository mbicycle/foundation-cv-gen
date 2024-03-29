import * as React from 'react';
import type {
  AutoSizerProps, ColumnSizerProps, MultiGridProps,
} from 'react-virtualized';
import {
  AutoSizer as _AutoSizer,
  ColumnSizer as _ColumnSizer,
  MultiGrid as _MultiGrid,
} from 'react-virtualized';

import CellRenderer from 'containers/admin-table/components/CellRenderer';
import {
  ADMIN_TABLE_HEADER_HEIGHT,
  COLUMNS,
  MINIMUM_TABLE_HEIGHT,
  MINIMUM_TABLE_WINDOW_HEIGHT,
} from 'containers/admin-table/utils/constants';

import {
  COLUMN_MAX_WIDTH, COLUMN_MIN_WIDTH, ROW_HEIGHT,
} from './utils/constants';
import {
  AdminTableWrapperStyled, ColumnSizerWrapperStyled, MultiGridWrapperStyled,
} from './utils/styled';

import 'react-virtualized/styles.css';

const AutoSizer = _AutoSizer as unknown as React.FC<AutoSizerProps>;
const ColumnSizer = _ColumnSizer as unknown as React.FC<ColumnSizerProps>;
const MultiGrid = _MultiGrid as unknown as React.FC<MultiGridProps>;

interface AdminTableProps {
data: AdminTableType.User[]
}

function AdminTable(props:AdminTableProps): JSX.Element | null {
  const { data: users } = props;

  const getDynamicHeight = (): number => (
    window.innerHeight > MINIMUM_TABLE_WINDOW_HEIGHT
      ? window.innerHeight - MINIMUM_TABLE_HEIGHT
      : MINIMUM_TABLE_HEIGHT
  );

  return (
    <AdminTableWrapperStyled>
      <AutoSizer>
        {({ width }) => (
          <ColumnSizerWrapperStyled>
            <ColumnSizer
              columnMaxWidth={COLUMN_MAX_WIDTH}
              columnMinWidth={COLUMN_MIN_WIDTH}
              columnCount={COLUMNS.length}
              width={width}
              height={getDynamicHeight()}
            >
              {({ adjustedWidth, columnWidth, registerChild }) => (
                <MultiGridWrapperStyled sx={{ width: adjustedWidth }}>
                  <MultiGrid
                  // Note! Passing props needs for updating the table.
                    {...props}
                    ref={registerChild}
                    columnWidth={columnWidth}
                    columnCount={COLUMNS.length}
                    height={getDynamicHeight() - ADMIN_TABLE_HEADER_HEIGHT}
                    fixedRowCount={1}
                    cellRenderer={
                      ({ key: mainKey, ...rest }) => (
                        <CellRenderer
                          {...rest}
                          mainKey={mainKey}
                          key={mainKey}
                          data={users}
                        />
                      )
                    }
                    rowHeight={ROW_HEIGHT}
                    // eslint-disable-next-line max-len
                    // https://stackoverflow.com/questions/51936127/react-virtualized-multigrid-component-skips-first-row-in-data-set
                    rowCount={users.length + 1}
                    width={adjustedWidth + 8}
                  />
                </MultiGridWrapperStyled>
              )}
            </ColumnSizer>
          </ColumnSizerWrapperStyled>
        )}
      </AutoSizer>
    </AdminTableWrapperStyled>
  );
}

export default React.memo(AdminTable);
