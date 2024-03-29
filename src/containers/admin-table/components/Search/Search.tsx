import { memo } from 'react';

import {
  Button, ButtonGroup,
  InputBase, Paper, Typography,
} from '@mui/material';

import { useWildcardContext } from 'containers/admin-table/local-state';

interface SearchProps {
  onFilterDataChange: (v: AdminTableType.FilterData)=> void,
  filterData: AdminTableType.FilterData,
}

function Search({ onFilterDataChange, filterData }: SearchProps): JSX.Element {
  const { dispatch } = useWildcardContext();

  const propChangeHandle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { value } = e.target as HTMLButtonElement;
    dispatch({ column: value });

    onFilterDataChange({
      ...filterData,
      prop: value as keyof AdminTableType.User,
    });
  };

  const inputChangeHandle = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
    dispatch({ wildcard: (e.target as HTMLInputElement).value });
    onFilterDataChange({
      ...filterData,
      searchValue: (e.target as HTMLInputElement).value,
    });
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: 720,
      }}
    >
      <InputBase
        sx={{ ml: 4, flex: 1 }}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        onInput={inputChangeHandle}
      />
      <Typography variant="body1">by:</Typography>
      <ButtonGroup
        variant="text"
        sx={{
          m: 1,
          '& > *': {
            m: 1,
            px: '4rem !important',
            py: '0.5rem !important',
            textTransform: 'uppercase',
          },
        }}
      >
        <Button
          variant={filterData.prop === 'displayName' ? 'contained' : 'text'}
          value="displayName"
          onClick={propChangeHandle}
        >
          name
        </Button>
        <Button
          variant={filterData.prop === 'mail' ? 'contained' : 'text'}
          value="mail"
          onClick={propChangeHandle}
        >
          e-mail
        </Button>
        <Button
          variant={filterData.prop === 'jobTitle' ? 'contained' : 'text'}
          value="jobTitle"
          onClick={propChangeHandle}
        >
          title
        </Button>
      </ButtonGroup>
    </Paper>
  );
}

export default memo(Search);
