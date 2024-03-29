import React, {
  memo, useCallback, useEffect,
} from 'react';
import type { PercentCrop, PixelCrop } from 'react-image-crop';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';

import {
  Box,
  Button, Typography,
} from '@mui/material';

import { useUserPhoto } from 'common/services/user-service/hooks/useUserPhoto';
import { debounce } from 'common/utils/helpers';

import {
  blobToCanvas, compressImageToLimit, toBlob,
} from './utils/helpers';
import { useFileUpload } from './utils/hooks';
import {
  AvatarModalContentStyled, MyPhotoUploadStyled, UploadOneStyled,
} from './utils/styled';
import { Text } from './utils/types';

import 'react-image-crop/dist/ReactCrop.css';

interface AvatarModalContentProps {
  setFiles: CallableFunction;
  setFileToUpload: CallableFunction;
  onToggleModal: CallableFunction;
}

const AvatarModalContent: React.FC<AvatarModalContentProps> = function (props) {
  const { photo } = useUserPhoto();
  const {
    previewCropCanvasRef,
    imgCropRef,
    getRootProps,
    getInputProps,
    completedCrop,
    crop,
    onSetCompletedCrop,
    onSetCrop,
    imgSrc,
    onSelectFile,
  } = useFileUpload();

  const { setFiles, setFileToUpload, onToggleModal } = props;

  // This is to demonstate how to make and center a % aspect crop
  // which is a bit trickier so we use some helper functions.
  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ): PercentCrop {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    );
  }

  const toggleModalHandle = useCallback(() => {
    onToggleModal((val: boolean) => !val);
  }, [onToggleModal]);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>): void {
    const { width, height } = e.currentTarget;
    onSetCrop(centerAspectCrop(width, height, 16 / 16));
  }

  const setCompletedCropHandle = (pixelCrop: PixelCrop): void => {
    onSetCompletedCrop(pixelCrop);
  };

  const onPreparePhotoToChange = useCallback(async () => {
    if (previewCropCanvasRef.current) {
      const blob = await toBlob(previewCropCanvasRef.current);
      const fileFromBlob = new File([blob ?? {} as Blob], new Date().toISOString(), {
        type: blob?.type,
      });

      setFiles([Object.assign(fileFromBlob, {
        preview: URL.createObjectURL(fileFromBlob),
      })]);
      setFileToUpload(fileFromBlob);
    }
    toggleModalHandle();
  }, [previewCropCanvasRef, setFileToUpload, setFiles, toggleModalHandle]);

  const changeQualityHandle = debounce(async (): Promise<void> => {
    if (previewCropCanvasRef?.current) {
      const blob = await toBlob(previewCropCanvasRef.current);
      const fileFromBlob = new File([blob ?? {} as Blob], new Date().toISOString(), {
        type: blob?.type,
      });

      compressImageToLimit(fileFromBlob, (compressed) => {
        blobToCanvas(previewCropCanvasRef.current, compressed);
      });
    }
  }, 250);

  useEffect(() => () => changeQualityHandle.cancel(), [changeQualityHandle]);

  function renderReactCrop(): JSX.Element | null {
    if (!imgSrc) return null;

    return (
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => onSetCrop(percentCrop)}
        onComplete={setCompletedCropHandle}
        aspect={16 / 16}
      >
        <img
          ref={imgCropRef}
          alt="Crop me"
          src={imgSrc}
          onLoad={onImageLoad}
          style={{
            maxHeight: 260,
          }}
        />
      </ReactCrop>
    );
  }

  function renderPreviewCrop(): JSX.Element | null {
    if (!completedCrop) return null;

    return (
      <Box
        ml={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="canvas"
          onChange={changeQualityHandle.handleChange}
          ref={previewCropCanvasRef}
          sx={{
            objectFit: 'contain',
            borderRadius: '50%',
            border: (theme) => `1 px solid ${theme.palette.border}`,
            width: 240,
            height: 240,
          }}
        />
      </Box>
    );
  }

  return (
    <AvatarModalContentStyled>
      <Box {...getRootProps({ className: 'dropzone' })} sx={{ mb: 4 }}>
        <MyPhotoUploadStyled container>
          <Typography color="text.disabled" variant="h5">
            {photo ? Text.UpdatePhoto : Text.FileUpload}
          </Typography>
          &nbsp;
          <UploadOneStyled color="primary" variant="h5">
            {Text.UploadOne}
          </UploadOneStyled>
        </MyPhotoUploadStyled>
      </Box>
      <div className="App">

        <div className="Crop-Controls">
          <input {...getInputProps()} onChange={onSelectFile} />
        </div>
        <Box display="flex" alignItems="center">
          {renderReactCrop()}
          {renderPreviewCrop()}
        </Box>
        <Button
          variant="outlined"
          onClick={onPreparePhotoToChange}
          sx={{ mt: 6 }}
        >
          {Text.AddPhoto}
        </Button>
      </div>
    </AvatarModalContentStyled>
  );
};

export default memo(AvatarModalContent);
