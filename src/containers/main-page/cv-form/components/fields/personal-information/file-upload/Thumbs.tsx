import { memo } from 'react';
import { Button } from '@mbicycle/foundation-ui-kit';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
        <div className="inline-flex rounded-full border mr-3 ml-6 size-[60px] p-1 box-border" key={file.name}>
          <div className="flex relative text-center min-w-0">
            <Button className="absolute mt-[-4] ml-9" size="small" onClick={onDeleteImageHandle}>
              <CancelRoundedIcon fontSize="small" color="error" />
            </Button>
            <Button className="mt-9 ml-8" size="small" onClick={onUploadNewAvatarHandle}>
              <CloudUploadIcon color="primary" />
            </Button>
            <img
              className="avatarImage cursor-pointer w-full"
              alt={file.name}
              src={file.preview}
              referrerPolicy="no-referrer"
              onClick={onOpenModal}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default memo(Thumbs);
