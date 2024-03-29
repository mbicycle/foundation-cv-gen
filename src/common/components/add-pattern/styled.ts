import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box, Button, styled,
} from '@mui/material';

type IsProfiencySelectedPropType = {
  $isProfiencySelected?: boolean;
};

export const AddProfiencyStyled = styled(Box, {
  name: 'AddProfiencyStyled',
})({
  display: 'flex',
  width: '100%',
  height: 'max-content',
  alignItems: 'flex-start',
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const ParagraphContainerStyled = styled('div', {
  name: 'ParagraphContainerStyled',
})<IsProfiencySelectedPropType>(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '10px',
}));

export const ParagraphStyled = styled('div', {
  name: 'ParagraphStyled',
})<IsProfiencySelectedPropType>(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  marginBottom: theme.spacing(4),
  wordBreak: 'break-word',
}));

export const ContainerStyled = styled(Box, {
  name: 'ContainerStyled',
})<IsProfiencySelectedPropType>(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  width: '100%',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  alignItems: 'center',
  flexDirection: 'column',
}));

export const AddButtonStyled = styled(Button, {
  name: 'AddButtonStyled',
  shouldForwardProp: (prop: string | number | symbol) => prop !== '$isProfiencySelected',
})<IsProfiencySelectedPropType>(({ theme, $isProfiencySelected }) => ({
  padding: theme.spacing(3, 7),
  alignSelf: $isProfiencySelected ? 'flex-end' : 'center',
  wordBreak: 'initial',
}));

export const AddCircleIconStyled = styled(AddCircleIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

export const TitleWrapperStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  justifyContent: 'left',
  alignItems: 'center',
  display: 'inline-flex',
  padding: theme.spacing(2.2, 3),
}));
