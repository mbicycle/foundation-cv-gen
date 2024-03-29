import {
  AppBarStyled,
  LogoIconStyled,
  ToolbarStyled,
} from './styled';

export const ApplicationBarEmpty = function (): JSX.Element {
  return (
    <AppBarStyled bgcolor="primary.main">
      <ToolbarStyled>
        <LogoIconStyled fontSize="large" />
      </ToolbarStyled>
    </AppBarStyled>
  );
};
