import { memo, useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';

import { TableCell as MUITableCell, Typography } from '@mui/material';

import ActionsSet from 'containers/admin-table/components/ActionsSet';
import { useWildcardContext } from 'containers/admin-table/local-state';
import theme from 'common/theme';

interface TableRowProps {
 rowIndex: number
 colIndex: number
 style: React.CSSProperties | undefined
 data: TableCell.Data
 }

function TableCell(props: TableRowProps): JSX.Element {
  const {
    rowIndex, colIndex, style, data,
  } = props;
  const { state } = useWildcardContext();

  const { items, columns } = data;
  const { wildcard, column } = state;

  // eslint-disable-next-line max-len
  // https://stackoverflow.com/questions/51936127/react-virtualized-multigrid-component-skips-first-row-in-data-set
  const item = items[rowIndex - 1];
  const { dataKey } = columns[colIndex];

  const Component = columns[colIndex]?.Component;

  const dataItem = useMemo(
    () => {
      if (item) {
        return item[dataKey as keyof typeof item];
      }
      return '';
    },
    [dataKey, item],
  );

  function renderContent(): JSX.Element | string | null {
    if (dataKey === 'lastModified') {
      return dataItem ? (
        <Typography>
          { dayjs(dataItem).format('DD MMM YYYY')}
        </Typography>
      ) : null;
    }
    if (!Component) {
      return (
        <Highlighter
          highlightStyle={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary.light,
          }}
          searchWords={column === dataKey ? wildcard : []}
          autoEscape
          textToHighlight={dataItem && typeof dataItem !== 'boolean' ? dataItem : ''}
        />
      );
    }

    return (
      <Component>
        <ActionsSet
          id={item.id}
          mail={item.mail}
          disabledIcons={!(item as AdminTableType.UserMapped).hasCv}
        />
      </Component>
    );
  }

  return (
    <MUITableCell
      key={item.id as string}
      component="div"
      variant="body"
      align="left"
      style={style}
      sx={{
        display: 'inline-flex',
        borderBottom: (defaultTheme) => `1px solid ${defaultTheme.palette.border}`,
        paddingTop: 2,
        paddingBottom: 2,
        alignItems: 'center',
      }}
    >
      {renderContent()}
    </MUITableCell>
  );
}

export default memo(TableCell);
