import { memo, useState } from 'react';
import { Button } from '@mbicycle/foundation-ui-kit';

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import Modal from '@mui/material/Modal';

import { useToggleSensitiveData } from 'common/context';
import { useGuestToken } from 'common/context/guest-token';
import PersonIcon from 'common/icons/PersonIcon';
import { useUserPhoto } from 'common/services/user-service/hooks/useUserPhoto';

import { useFileUpload } from './utils/hooks';
import { Text } from './utils/types';
import AvatarModalContent from './AvatarModalContent';
import Thumbs from './Thumbs';

import 'react-image-crop/dist/ReactCrop.css';

const FileUpload = function (): JSX.Element {
  const { state: { checked: hiddenSensitiveData } } = useToggleSensitiveData();
  const { state: { isGuest } } = useGuestToken();
  const { photo } = useUserPhoto();
  const {
    isUploading,
    onUploadNewAvatar,
    onSetFileToUpload,
    files,
    onResetFilesHandle,
    onSetFiles: setFiles,
  } = useFileUpload();

  const [isOpen, setOpen] = useState(false);

  const closeHandle = (): void => { setOpen(false); };
  const openHandle = (): void => { setOpen(true); };

  function renderModal(): JSX.Element {
    return (
      <Modal
        open={isOpen}
        onClose={closeHandle}
      >
        <AvatarModalContent
          setFileToUpload={onSetFileToUpload}
          setFiles={setFiles}
          onToggleModal={closeHandle}
        />
      </Modal>
    );
  }

  function renderUserImage(): JSX.Element {
    if (!photo || hiddenSensitiveData) return <PersonIcon className="avatarImage size-[60px]" />;

    return (
      <img
        className="avatarImage size-[60px]"
        referrerPolicy="no-referrer"
        alt="user-avatar"
        src={photo}
      />
    );
  }

  function renderChangeCircleIcon(): JSX.Element {
    if (!files[0]) {
      return (
        <Button onClick={openHandle} size="small" variant="outline" disabled={isGuest}>
          <ChangeCircleOutlinedIcon className={isGuest ? 'text-gray-500' : 'text-blue-500'} fontSize="large" />
          &nbsp;
          <p className="text-blue-500">{Text.Change}</p>
        </Button>
      );
    }

    return (
      <div className="ml-6">
        <ChangeCircleIcon
          className={`text-gray-500 ${isUploading && 'animate-spin'}`}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-nowrap gap-0 lg:gap-[-4px]">
      <div className="flex flex-row gap-4 w-full">
        <div className="flex justify-between items-center break-words w-full lg:w-1/2 border rounded-lg p-2">
          {renderUserImage()}
          {renderChangeCircleIcon()}
          <aside className="flex flex-row flex-wrap">
            <Thumbs
              files={files}
              onDropFiles={onResetFilesHandle}
              onUploadNewAvatar={onUploadNewAvatar}
              onOpenModal={openHandle}
            />
          </aside>
          {renderModal()}
        </div>
      </div>
    </div>
  );
};

export default memo(FileUpload);
