import React, {
  useDeferredValue, useEffect, useMemo, useState,
} from 'react';
import { InformationCircleIcon as InfoIcon, LinkIcon } from '@heroicons/react/24/solid';
import {
  Button, Input, Modal,
  Toggle, Tooltip,
} from '@mbicycle/foundation-ui-kit';
import { Text } from 'fields/personal-information/file-upload/utils/types';
import { ShareButton, tooltipShareText } from 'fields/projects/components/utils/constants';
import sortBy from 'lodash.sortby';
import { getGuestToken } from 'shared/msalUtils/features/api';

import Search from 'containers/admin-table/components/Search';
import { AdminTable } from 'containers/admin-table/components/VirtualizedTable';
import { hooks } from 'containers/admin-table/lib';
import useTableDataContext from 'containers/admin-table/local-state/useTableDataContext';
import CircularSpinner from 'common/components/circular-spinner/circular-spinner';
import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';
import { useDeleteUserFromDb } from 'common/services/user-service/query-hooks';

import { useDbUsersList } from './lib/query-hooks';
import { MINIMUM_TABLE_HEIGHT } from './utils/constants';

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
        <div>
          <h2>
            {Text.Success}
          </h2>
          &nbsp;
          <p className="text-gray-500">
            {Text.GuestAccess}
          </p>
          <p className="text-gray-500">
            {Text.LinkValid}
          </p>
          <div>
            <Input
              id="outlined-required"
              defaultValue={isTokenLink}
            />
          </div>
          <Button
            onClick={closeHandle}
            className="mt-6"
          >
            {Text.Copy}
          </Button>
        </div>
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
      return <CircularSpinner size="large" />;
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
      <div className="flex flex-row justify-end py-8">
        <Toggle checked={checked} onChange={handleFilterChange} text="Hide without CV" />
      </div>
    );
  }

  function renderTable(): JSX.Element | null {
    if (!deferredUsersValue?.length) {
      return (
        <div className="flex justify-center items-center h-[60dvh]">
          <h2>{Text.NoResults}</h2>
        </div>
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
      <div className={`h-[${tableHeight}px] min-h-[${MINIMUM_TABLE_HEIGHT}px] overflow-auto`}>
        {isGraphUsersLoading || isDbUsersListLoading
          ? <CircularSpinner size="large" />
          : <AdminTable data={deferredSortedUsersValue} />}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto max-w-screen-xl h-max">
      <div className="inline-flex justify-between w-full pt-8 pb-6">
        <h1 className="ml-6 mt-4 mb-4 text-6xl">Sales panel</h1>
        <div className="flex items-center">
          <Button
            onClick={clickHandler}
            type="submit"
            disabled={isLoading}
            className="p-6"
          >
            <div className="flex items-center justify-between">
              <LinkIcon fontSize="large" />
              {ShareButton.Label}
            </div>
          </Button>
          <Tooltip content={tooltipShareText} classNameContent="w-[300px] left-[-150px] top-[20px]">
            <InfoIcon className="pt-1 text-lg" />
          </Tooltip>
        </div>
      </div>
      <Search onFilterDataChange={filterDataChangeHandler} filterData={filterData} />
      {renderHideNoCvPersonnelControl()}
      {renderIcons()}
      {renderTable()}
      {renderModal()}
    </div>
  );
}

export default AdminTableContainer;
