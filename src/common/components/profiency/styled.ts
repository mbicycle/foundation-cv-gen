import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, styled } from '@mui/material';

export const LeveledLanguageItemStyled = styled(Box)<{ $disabled?: 'true'; }>(({ theme, $disabled }) => ({
  padding: theme.spacing(2, 2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.border}`,
  display: 'inline-flex',
  width: '100%',
  alignItems: 'center',
  filter: $disabled ? 'opacity(0.5)' : 'opacity(1)',
  pointerEvents: $disabled ? 'none' : 'initial',
}));

export const EnglishLanguageItemStyled = styled(LeveledLanguageItemStyled)(() => ({
  justifyContent: 'space-between',
}));

export const LeftSideWrapperStyled = styled(Box)({
  width: '100%',
  cursor: 'pointer',
});

export const DragIndicatorIconStyled = styled(DragIndicatorIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const TextContainerStyled = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
}));
type DragItemProps = {
  $isDropping: boolean
}

export const DragItemTool = styled(
  'li',
  { shouldForwardProp: (prop) => prop !== '$isDropping' },
)<DragItemProps>(({ $isDropping, theme }) => ({
  opacity: $isDropping ? '0.2' : '1',
  transform: $isDropping ? 'translateY(0)' : '',
  paddingBottom: theme.spacing(2.5),
}));

export const DragItemCategory = styled(
  'li',
  { shouldForwardProp: (prop) => prop !== '$isDropping' },
)<DragItemProps>(({ $isDropping }) => ({
  opacity: $isDropping ? '0.2' : '1',
  transform: $isDropping ? 'translateY(0)' : '',
}));

export const DragList = styled('ul')({
  listStyle: 'none',
  width: '100%',
});
