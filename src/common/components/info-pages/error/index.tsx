import { ApplicationBarEmpty } from 'containers/application-bar/AppBarEmpty';
import {
  MaintenanceContainerStyled,
  MessageContainerStyled,
  MessageTextStyled,
  MessageTitleStyled,
} from 'common/components/info-pages/styled';

function ErrorScreen({ title, message }: {title: string, message: string}): JSX.Element {
  return (
    <MaintenanceContainerStyled>
      <ApplicationBarEmpty />
      <MessageContainerStyled>
        <MessageTitleStyled variant="h2">{title}</MessageTitleStyled>
        <MessageTextStyled variant="h3">{message}</MessageTextStyled>
      </MessageContainerStyled>
    </MaintenanceContainerStyled>
  );
}

export default ErrorScreen;
