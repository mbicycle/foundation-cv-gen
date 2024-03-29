import React, {
  useDeferredValue, useEffect, useMemo, useState,
} from 'react';
import sortBy from 'lodash.sortby';
import { getGuestToken } from 'shared/msalUtils/features/api';

import LinkIcon from '@mui/icons-material/Link';
import {
  Box, Button, Container, FormControlLabel,
  FormGroup, Grid, Switch, TextField, Tooltip,
  Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';

import Search from 'containers/admin-table/components/Search';
import { AdminTable } from 'containers/admin-table/components/VirtualizedTable';
import { hooks } from 'containers/admin-table/lib';
import useTableDataContext from 'containers/admin-table/local-state/useTableDataContext';
import CircularSpinner from 'common/components/circular-spinner/circular-spinner';
import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';
import { useDeleteUserFromDb } from 'common/services/user-service/query-hooks';

import {
  CopyLinkWrapper,
  LinkModalContentStyled,
} from 'fields/personal-information/file-upload/utils/styled';
import { Text } from 'fields/personal-information/file-upload/utils/types';
import { ShareButton, tooltipShareText } from 'fields/projects/components/utils/constants';
import { ShareButtonContent, ShareButtonStyled, ShareButtonWrapper } from 'fields/skills/utils/styled';
import { InfoIconStyled } from 'fields/styled';

import { useDbUsersList } from './lib/query-hooks';
import { MINIMUM_TABLE_HEIGHT } from './utils/constants';
import { NoResultsBoxStyled } from './utils/styled';

const { useGraphUsers } = hooks;

function AdminTableContainer(): JSX.Element | null {
  const { state, dispatch } = useTableDataContext();
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isTokenLink, setTokenLink] = useState('');
  const [tableHeight, setTableHeight] = useState(
    () => window.innerHeight - MINIMUM_TABLE_HEIGHT,
  );

  const closeHandle = (): void => {
    navigator.clipboard.writeText(isTokenLink)
      .then(() => setOpen(false));
  };
  const openHandle = (): void => { setOpen(true); };

  function renderModal(): JSX.Element {
    return (
      <Modal
        open={isOpen}
        onClose={closeHandle}
      >
        <LinkModalContentStyled>
          <Typography variant="h2">
            {Text.Success}
          </Typography>
          &nbsp;
          <Typography color="gray">
            {Text.GuestAccess}
          </Typography>
          <Typography color="gray">
            {Text.LinkValid}
          </Typography>
          <CopyLinkWrapper>
            <TextField
              id="outlined-required"
              defaultValue={isTokenLink}
            />
          </CopyLinkWrapper>
          <Button
            variant="outlined"
            onClick={closeHandle}
            sx={{ mt: 6 }}
          >
            {Text.Copy}
          </Button>
        </LinkModalContentStyled>
      </Modal>
    );
  }

  const clickHandler = ():void => {
    setLoading(true);
    getGuestToken().then((token) => {
      setTokenLink(`${import.meta.env.VITE_REDIRECT_URL}?token=${token}`);
      openHandle();
      setLoading(false);
    }).catch(() => SnackBarUtils.error('Not success'));
  };

  function renderIcons(): JSX.Element | null {
    if (isLoading) {
      return <CircularSpinner size="large" color="primary" />;
    }
    return null;
  }

  const { data, isLoading: isGraphUsersLoading } = useGraphUsers();
  const { data: dbUsersList, isLoading: isDbUsersListLoading } = useDbUsersList();
  const { mutateAsync } = useDeleteUserFromDb();

  const [checked, setChecked] = useState(false);
  const [filterData, setFilter] = useState<AdminTableType.FilterData>({
    prop: 'displayName',
    searchValue: '',
  });

  const { value: users } = data ?? {};

  const handleResize = (): void => {
    setTableHeight(window.innerHeight - MINIMUM_TABLE_HEIGHT);
  };

  const dataMapped = useMemo(() => users?.map((user) => {
    const userFromDb = dbUsersList?.find((item) => item.email === user.mail);
    return {
      ...user,
      hasCv: !!userFromDb,
      lastModified: userFromDb ? (userFromDb.lastModified || '') : '',
    };
  }), [dbUsersList, users]);

  useEffect(() => {
    if (dataMapped) dispatch({ data: dataMapped });
  }, [dataMapped, dispatch]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
  // Removes users those are in DB but not in Azure AD list.
  // https://github.com/mbicycle/cv-gen-react/issues/298
    const difference = dbUsersList
      ?.map((item) => (item.email))
      ?.filter((dbEmail) => users && !users.map((user) => user.mail)
        .includes(dbEmail));

    if (difference && difference?.length > 0) {
      mutateAsync(difference);
    }
  }, [dbUsersList, mutateAsync, users]);

  const filteredUsers = useMemo(() => state.data?.filter(
    (item) => item[filterData.prop]
      ?.toLowerCase()
      .split(' ')
      .filter((i) => i)
      .join(' ')
      .includes(filterData.searchValue
        .toLowerCase()
        .split(' ')
        .filter((i) => i)
        .join(' ')),
  ), [state.data, filterData.prop, filterData.searchValue]);

  let deferredUsersValue = useDeferredValue(filteredUsers);

  const filterDataChangeHandler = (newFilterData: AdminTableType.FilterData): void => {
    setFilter(newFilterData);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };

  function renderHideNoCvPersonnelControl(): JSX.Element {
    return (
      <FormGroup sx={{ alignItems: 'flex-end', pt: 2, pb: 2 }}>
        <FormControlLabel
          control={(
            <Switch
              checked={checked}
              onChange={handleFilterChange}
              color="primary"
            />
          )}
          label={<Typography>Hide without CV</Typography>}
        />
      </FormGroup>
    );
  }

  function renderTable(): JSX.Element | null{
    if (!deferredUsersValue?.length) {
      return (
        <NoResultsBoxStyled>
          <Typography variant="h2">{Text.NoResults}</Typography>
        </NoResultsBoxStyled>
      );
    }

    if (checked) {
      deferredUsersValue = deferredUsersValue?.filter((value) => value.hasCv);
    }

    const deferredSortedUsersValue = sortBy(
      deferredUsersValue,
      (o: AdminTableType.UserMapped) => !o.hasCv,
    ) as AdminTableType.User[];

    return (
      <Box
        height={tableHeight}
        minHeight={MINIMUM_TABLE_HEIGHT}
        overflow="auto"
      >
        {isGraphUsersLoading || isDbUsersListLoading
          ? <CircularSpinner size="large" color="primary" />
          : <AdminTable data={deferredSortedUsersValue} />}
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ height: 'max-content' }}>
      <Grid sx={{
        display: 'inline-flex', justifyContent: 'space-between', width: '100%', pt: 6, pb: 2,
      }}
      >
        <Typography variant="h1" sx={{ ml: 6, mt: 2, mb: 2 }}>Sales panel</Typography>
        <ShareButtonWrapper>
          <ShareButtonStyled
            onClick={clickHandler}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            <ShareButtonContent>
              <LinkIcon fontSize="large" />
              {ShareButton.Label}
            </ShareButtonContent>
          </ShareButtonStyled>
          <Tooltip title={<Typography>{tooltipShareText}</Typography>}>
            <InfoIconStyled fontSize="large" />
          </Tooltip>
        </ShareButtonWrapper>
      </Grid>
      <Search onFilterDataChange={filterDataChangeHandler} filterData={filterData} />
      {renderHideNoCvPersonnelControl()}
      {renderIcons()}
      {renderTable()}
      {renderModal()}
    </Container>
  );
}

export default AdminTableContainer;
