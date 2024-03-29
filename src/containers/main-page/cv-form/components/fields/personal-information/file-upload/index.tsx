import { memo, useState } from 'react';

import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { Grid, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';

import { useToggleSensitiveData } from 'common/context';
import { useGuestToken } from 'common/context/guest-token';
import { useUserPhoto } from 'common/services/user-service/hooks/useUserPhoto';

import { ImageStyled } from 'fields/personal-information/styled';

import { useFileUpload } from './utils/hooks';
import {
  ChangeCircleIconStyled,
  ChangeCircleIconWrapper,
  FileUploadStyled,
  PersonIconStyled,
  ThumbContainerStyled,
  UploadImageButtonStyled,
} from './utils/styled';
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
    if (!photo || hiddenSensitiveData) return <PersonIconStyled $width={60} />;

    return (
      <ImageStyled
        referrerPolicy="no-referrer"
        alt="user-image"
        src={photo}
        $width={60}
      />
    );
  }

  function renderChangeCircleIcon(): JSX.Element {
    if (!files[0]) {
      return (
        <UploadImageButtonStyled onClick={openHandle} size="small" disabled={isGuest}>
          <ChangeCircleOutlinedIcon color={isGuest ? 'disabled' : 'info'} fontSize="large" />
          &nbsp;
          <Typography color="info">{Text.Change}</Typography>
        </UploadImageButtonStyled>
      );
    }

    return (
      <ChangeCircleIconWrapper>
        <ChangeCircleIconStyled
          color="disabled"
          fontSize="large"
          $isUploading={isUploading}
        />
      </ChangeCircleIconWrapper>
    );
  }

  return (
    <Grid container direction="row" wrap="nowrap" columnSpacing={{ xxs: 0, lg: -4 }}>
      <Grid item container gap={4}>
        <FileUploadStyled
          item
          xxs={12}
          lg={6}
        >
          {renderUserImage()}
          {renderChangeCircleIcon()}
          <ThumbContainerStyled>
            <Thumbs
              files={files}
              onDropFiles={onResetFilesHandle}
              onUploadNewAvatar={onUploadNewAvatar}
              onOpenModal={openHandle}
            />
          </ThumbContainerStyled>
          {renderModal()}
        </FileUploadStyled>
      </Grid>
    </Grid>
  );
};

export default memo(FileUpload);
