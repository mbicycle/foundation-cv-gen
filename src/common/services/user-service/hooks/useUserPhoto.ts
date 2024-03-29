import { useGetUserPhoto, useGetUserPhotoById } from 'common/services/user-service/query-hooks';

export const useUserPhoto = (): { photo: string; } => {
  const { data } = useGetUserPhoto();

  const binaryData: Blob[] = [];
  if (data) {
    binaryData.push(data);
  }

  const photo = data ? URL.createObjectURL(new Blob(binaryData)) : '';

  return {
    photo,
  };
};

type GetPhoto = (id: string) => Promise<string | undefined>

export const useUserPhotoById = (): {getPhoto: GetPhoto} => {
  const { mutateAsync } = useGetUserPhotoById();

  const getPhoto: GetPhoto = async (id: string) => {
    try {
      const data = await mutateAsync(id);
      const binaryData: Blob[] = [];
      if (data) {
        binaryData.push(data);
      }
      return data && URL.createObjectURL(new Blob(binaryData));
    } catch {
      return undefined;
    }
  };

  return {
    getPhoto,
  };
};
