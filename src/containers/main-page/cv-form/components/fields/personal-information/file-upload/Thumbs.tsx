import { memo } from 'react';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {
  CloudIconButtonStyled,
  IconButtonStyled, ImageStyled,
  ShumbInnerStyled, ThumbStyled,
} from './utils/styled';
import type { ExtendedFileType } from './utils/types';

interface ThumbsProps {
  files: ExtendedFileType[],
  onDropFiles: VoidFunction,
  onUploadNewAvatar: VoidFunction;
  onOpenModal: VoidFunction;
}

const Thumbs: React.FC<ThumbsProps> = function (props): JSX.Element {
  const {
    files, onDropFiles, onOpenModal, onUploadNewAvatar,
  } = props;

  const onDeleteImageHandle = (event: React.MouseEvent): void => {
    event.stopPropagation();
    onDropFiles();
  };

  const onUploadNewAvatarHandle = (event: React.MouseEvent): void => {
    event.stopPropagation();
    onUploadNewAvatar();
  };

  return (
    <>
      {files.map((file) => (
        <ThumbStyled key={file.name}>
          <ShumbInnerStyled>
            <IconButtonStyled size="small" onClick={onDeleteImageHandle}>
              <CancelRoundedIcon fontSize="small" color="error" />
            </IconButtonStyled>
            <CloudIconButtonStyled size="small" onClick={onUploadNewAvatarHandle}>
              <CloudUploadIcon color="primary" />
            </CloudIconButtonStyled>
            <ImageStyled
              alt={file.name}
              src={file.preview}
              referrerPolicy="no-referrer"
              onClick={onOpenModal}
            />
          </ShumbInnerStyled>
        </ThumbStyled>
      ))}
    </>
  );
};

export default memo(Thumbs);
