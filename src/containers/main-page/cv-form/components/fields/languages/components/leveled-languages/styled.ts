import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, styled } from '@mui/material';

export const LeveledLanguageItemStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.border}`,
  display: 'inline-flex',
  width: '100%',
  alignItems: 'center',
}));

export const LeftSideWrapperStyled = styled(Box)({
  width: '100%',
});

export const SelectedLanguagesListStyled = styled(Box, {
  name: 'SelectedLanguagesListStyled',
})({
  maxHeight: 'calc(100vh - 35rem)',
  minHeight: '80px',
  overflow: 'auto',
  width: '100%',
});

export const DragIndicatorIconStyled = styled(DragIndicatorIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const TextContainerStyled = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
}));
