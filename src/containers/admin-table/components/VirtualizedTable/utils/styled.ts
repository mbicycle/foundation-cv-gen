import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';

import { COLUMNS } from 'containers/admin-table/utils/constants';

import { COLUMN_MAX_WIDTH } from './constants';

export const MultiGridWrapperStyled = styled('div')(({ theme }) => ({
  margin: 'auto',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

export const ColumnSizerWrapperStyled = styled('div')(({ theme }) => ({
  width: 'calc(100% + 24px)',
  margin: 'auto',
  marginTop: theme.spacing(4),
  maxWidth: COLUMN_MAX_WIDTH * COLUMNS.length + 24,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

export const AdminTableWrapperStyled = styled(Paper)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  padding: theme.spacing(10),
  paddingTop: 0,
  paddingBottom: 0,

  '&>div': {
    // 🤬
    width: '100% !important',
    height: '100% !important',
  },
}));
