import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {
  Box, Button, Grid, IconButton, Paper,
  Typography,
} from '@mui/material';
import {
  css, keyframes, styled,
} from '@mui/material/styles';

import PersonIcon from 'common/icons/PersonIcon';

type UploadProcessType = {
  $isUploading?: boolean;
};

type ExtendedImgType = {
  $width?: number;
};

const rotating = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;
export const MyPhotoUploadStyled = styled(Grid)(({ theme }) => ({
  border: `2px dashed ${theme.palette.border}`,
  padding: theme.spacing(6.3),
  borderRadius: theme.shape.borderRadius,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const PersonIconStyled = styled(PersonIcon, {
  shouldForwardProp: (prop) => prop !== '$width',
})<ExtendedImgType>(({ theme, $width }) => ({
  color: theme.palette.text.disabled,
  width: $width || 'auto',
  height: $width || 'auto',
  borderRadius: '50%',
  aspectRatio: '1/1',
  objectFit: 'cover',
}));

export const ThumbContainerStyled = styled('aside')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

export const UploadImageButtonStyled = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.4, 0),
}));

export const ThumbStyled = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  borderRadius: '50%',
  border: `1px solid ${theme.palette.primary.main}`,
  marginRight: theme.spacing(3),
  marginLeft: theme.spacing(6),
  width: 60,
  height: 60,
  padding: theme.spacing(1),
  boxSizing: 'border-box',
}));

export const ImageStyled = styled('img')({
  display: 'block',
  width: '100%',
  borderRadius: '50%',
  objectFit: 'cover',
  aspectRatio: '1/1',
  cursor: 'pointer',
});

export const ShumbInnerStyled = styled('div')({
  position: 'relative',
  display: 'flex',
  textAlign: 'center',
  minWidth: 0,
});

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  marginTop: theme.spacing(-4),
  marginLeft: theme.spacing(9),
}));

export const CloudIconButtonStyled = styled(IconButtonStyled)(({ theme }) => ({
  marginTop: theme.spacing(9),
  marginLeft: theme.spacing(8),
}));

export const UploadOneStyled = styled(Typography)({
  cursor: 'pointer',

  '&:hover': {
    textDecoration: 'underline',
  },
});

export const ChangeCircleIconWrapper = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(6),
}));

export const CopyLinkWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(-2),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

export const ChangeCircleIconStyled = styled(ChangeCircleIcon, {
  shouldForwardProp: (prop) => prop !== '$isUploading',
})<UploadProcessType>(({
  $isUploading,
}) => ($isUploading ? css`
  animation: ${rotating} 2s infinite ease;
  color: rgba(0, 164, 0, 0.68);
` : css`
  animation: '';
`));

export const AvatarModalContentStyled = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  maxWidth: 1200,
  padding: theme.spacing(8),
}));

export const LinkModalContentStyled = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  maxWidth: 600,
  padding: theme.spacing(8),
}));

export const FileUploadStyled = styled(Grid)(({ theme }) => ({
  border: `1px solid ${theme.palette.border}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  alignItems: 'center',
  justifyContent: 'space-between',
  display: 'flex',
  overflowWrap: 'normal',
  wordBreak: 'break-word',
}));
