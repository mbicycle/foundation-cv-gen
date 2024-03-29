import { styled } from '@mui/material';

export const SelectSkillsContainerStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
}));

export const WarningContainerStyled = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
