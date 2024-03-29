import { memo } from 'react';

import { ListWrapperStyled } from 'containers/main-page/cv-form/components/fields/styled';
import { useGuestToken } from 'common/context/guest-token';
import { useGuestUser } from 'common/context/guest-user';
import type { Certificate } from 'common/models/User';

import { useDeleteUserCertificate } from 'fields/certifications/lib/query-hooks';

import AddedCertificatesItem from './AddedCertificatesItem';

const AddedCertificatesList = function ({
  certificates,
}: { certificates: Certificate[]; }): JSX.Element | null {
  const { mutateAsync: deleteBy, isLoading } = useDeleteUserCertificate();
  const { state: tokenState } = useGuestToken();
  const { dispatch } = useGuestUser();

  const deleteHandle = async (id: string): Promise<void> => {
    if (tokenState.isGuest) {
      const filteredCertificates = (
        certificates?.filter((certificate: Certificate) => certificate.id !== id)
      );
      dispatch({ certificates: filteredCertificates });
    } else {
      await deleteBy(id);
    }
  };

  if (!certificates.length) return null;

  return (
    <ListWrapperStyled>
      {certificates.map(({
        name, id, link, date,
      }) => (
        <AddedCertificatesItem
          key={id}
          date={date}
          certificate={name}
          id={id}
          link={link}
          onDelete={deleteHandle}
          isDeleting={isLoading}
        />
      ))}
    </ListWrapperStyled>
  );
};

export default memo(AddedCertificatesList);
