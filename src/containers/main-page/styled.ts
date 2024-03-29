import CircleIcon from '@mui/icons-material/Circle';
import SchoolIcon from '@mui/icons-material/School';
import {
  Box, Grid, Paper, Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import EmailIcon from 'common/icons/EmailIcon';
import LogoIcon from 'common/icons/LogoIcon';
import RectangleBlueIcon from 'common/icons/RectangleBlueIcon';
import RectangleIcon from 'common/icons/RectangleIcon';
import SkypeIcon from 'common/icons/SkypeIcon';
import TelegramIcon from 'common/icons/TelegramIcon';

import { ImageStyled } from 'fields/personal-information/styled';

export const MainPageContainerStyled = styled(Grid)({
  overflowX: 'auto',
  display: 'grid',
  height: '100%',
  gridTemplateColumns: 'minmax(460px,1fr) 1fr',
});

export const PreviewWrapperStyled = styled('div', {
  name: 'PreviewWrapperStyled',
})(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  minWidth: '213mm',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.shape.borderRadius,

  [theme.breakpoints.up('sm')]: {
    overflow: 'auto',
  },
}));

export const WarningStyled = styled('div', {
  name: 'WarningStyled',
})(({ theme }) => ({
  backgroundColor: '#ffffff',
  width: '200mm',
  margin: 'auto',
  marginBottom: theme.spacing(5),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'left',
}));

export const PrewieWrapperStyled = styled('div', {
  name: 'PrewieWrapperStyled',
})(({ theme }) => ({
  width: '210mm',
  margin: 'auto',
  marginTop: theme.spacing(15),
}));

export const PaperWrapperStyled = styled(Paper, {
  name: 'PaperWrapperStyled',
})(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(4),
  margin: theme.spacing(4.5, 6, 0),
  borderRadius: theme.shape.borderRadius,
  border: '0.1px solid rgba(128, 128, 128, 0.24)',
  wordBreak: 'break-word',
}));

export const BoxWrapperStyled = styled(Grid, {
  name: 'BoxWrapperStyled',
})(({ theme }) => ({
  width: '30px',
  height: '30px',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CircleIconStyled = styled(CircleIcon, {
  name: 'CircleIconStyled',
})(({ theme }) => ({
  color: theme.palette.primary.main,
  width: '8px',
  height: '8px',
  marginRight: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
}));

export const BoxRatingStyled = styled(Box, {
  name: 'BoxRatingStyled',
})(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const LogoIconStyled = styled(LogoIcon, {
  name: 'LogoIconStyled',
})(() => ({
  width: '12rem',
  height: '2.8rem',
  fill: 'secondary',
}));

export const GridWrapper = styled(Grid, {
  name: 'GridWrapper',
})(({ theme }) => ({
  height: '16.8rem',
  backgroundColor: theme.palette.primary.main,
}));

export const SectionTitle = styled(Typography, {
  name: 'SectionTitle',
})(({ theme }) => ({
  margin: theme.spacing(1.5, 0, 0, 1.5),
  fontWeight: theme.typography.fontWeightBold,
}));

export const ColumnsHeaderStyled = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0.5, 0, 0, 0),
}));

export const PreviewTableHeaderStyled = styled(Grid)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: 'auto',
  marginBottom: '10px',
}));

export const PhotoStyled = styled(ImageStyled, {
  name: 'PhotoStyled',
})(() => ({
  width: '6.8rem',
  height: '7.2rem',
}));

export const SkillsGridStyled = styled(Grid, {
  name: 'SkillsGrid',
})(({ theme }) => ({
  padding: theme.spacing(0, 2),
  margin: theme.spacing(0, 0, 2, 0),
}));

export const RectangleBlueIconStyled = styled(RectangleBlueIcon, {
  name: 'RectangleBlueIconStyled',
})(({ theme }) => ({
  color: theme.palette.primary.main,
  paddingRight: theme.spacing(0.5),
  width: '3.6rem',
}));

export const RectangleIconStyled = styled(RectangleIcon, {
  name: 'RectangleIconStyled',
})(({ theme }) => ({
  paddingRight: theme.spacing(0.5),
  width: '3.6rem',
}));

export const LogoWrapperGrid = styled(Grid, {
  name: 'LogoWrapperGrid',
})(({ theme }) => ({
  paddingTop: theme.spacing(5.5),
  marginLeft: theme.spacing(9.7),
  backgroundColor: theme.palette.primary.main,
}));

export const EmailIconStyled = styled(EmailIcon, {
  name: 'EmailIconStyled',
})({
  width: '1.6rem',
  height: '1.6rem',
});

export const SkypeIconStyled = styled(SkypeIcon, {
  name: 'SkypeIconStyled',
})({
  width: '1.6rem',
  height: '1.6rem',
});

export const TelegramIconStyled = styled(TelegramIcon, {
  name: 'TelegramIconStyled',
})({
  width: '1.6rem',
  height: '1.6rem',
});

export const ContactWrapperGrid = styled(Grid, {
  name: 'ContactWrapperGrid',
})({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

export const TopBoxWrapper = styled(Grid, {
  name: 'ContactWrapperGrid',
})({
  display: 'inline',
  height: '90%',
  width: 'min-content',
});

export const LinkWrapperStyled = styled('div', {
  name: 'LinkWrapperStyled',
})(({ theme }) => ({
  height: '50%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  paddingTop: theme.spacing(2),
  paddingRight: theme.spacing(9.2),
  paddingLeft: theme.spacing(5),
}));

export const PersonalDetailsWrapperGrid = styled(Grid, {
  name: 'PersonalDetailsWrapperGrid',
})(({ theme }) => ({
  margin: 'auto',
  marginTop: theme.spacing(-25),
  maxWidth: '100%',
  zIndex: '20',
}));

export const PaperWrapper = styled(Paper, {
  name: 'PaperWrapper',
})(({ theme }) => ({
  maxWidth: '100%',
  paddingBottom: theme.spacing(12),
  borderRadius: theme.spacing(0.5),
  backgroundColor: '#ffffff',
}));

export const SchoolIconStyled = styled(SchoolIcon, {
  name: 'SchoolIconStyled',
})(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const ListItemContainerStyled = styled('div', {
  name: 'PreviewWrapperStyled',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  svg: {
    marginTop: theme.spacing(2),
  },
}));
