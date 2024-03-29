import {
  memo, useCallback, useEffect, useState,
} from 'react';
import {
  Outlet, useLocation, useNavigate,
} from 'react-router-dom';

import { Button, Typography } from '@mui/material';

import { useSkillIdContext } from 'containers/main-page/cv-form/local-state/hooks';
import { ROUTE } from 'common/components/routes/utils/constants';
import type {
  Certificate, Project, Skill, UserLanguage,
} from 'common/models/User';

import type { Step } from './constants';
import { ButtonText, SkillsDoesntExist } from './constants';
import {
  AddButtonStyled, AddCircleIconStyled,
  AddProfiencyStyled, ContainerStyled, ParagraphContainerStyled,
  ParagraphStyled,
} from './styled';
import Title from './Title';

interface AddProfiencyProps{
  title: `${Step}`;
  children: React.ReactNode;
  collection?:
    ArrayLike<UserLanguage> | ArrayLike<Skill> | ArrayLike<Project> | ArrayLike<Certificate>;
  ButtonString?: string;
  disable?: boolean;
  targetPath?: string,
}

const AddProfiency = function (props: AddProfiencyProps): JSX.Element {
  const {
    title,
    children,
    collection,
    ButtonString,
    disable,
    targetPath,
  } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const { dispatch: dispatchSkillId } = useSkillIdContext();

  const [pressedAdd, setPressedAdd] = useState(true);

  const handleAdd = (): void => {
    setPressedAdd(true);
    navigate(targetPath ?? 'add');
    dispatchSkillId({ type: 'set', id: '' });
  };

  const onReturnHandle = useCallback(() => {
    setPressedAdd(false);
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (!location.pathname.includes('add')) {
      setPressedAdd(false);
    }
  }, [location.pathname]);

  const redirectCallback = (): void => {
    navigate(`/dashboard/${ROUTE.DASHBOARD.SKILLS}`);
  };

  const renderButtonText = (): string => (ButtonString || ButtonText.Add);

  const isCollectionLength = location.pathname.includes(ROUTE.DASHBOARD.LANGUAGES.MAIN)
    ? true
    : !!collection?.length;

  return (
    <AddProfiencyStyled>
      <ContainerStyled>
        {pressedAdd && <Title name={title} onReturn={onReturnHandle} />}
        {!pressedAdd
        && (
          <>
            {isCollectionLength ? children : null}
            {!location.pathname.includes('edit') && (
              <ParagraphContainerStyled>
                {
                  (location.pathname.includes(ROUTE.DASHBOARD.PROJECTS) && disable) ? (
                    <ParagraphStyled>
                      <Typography variant="h3">
                        {SkillsDoesntExist.Paragraph}
                      </Typography>
                      <Button onClick={redirectCallback}>
                        {SkillsDoesntExist.Link}
                      </Button>
                    </ParagraphStyled>
                  ) : <div />
                }
                <AddButtonStyled
                  variant="contained"
                  onClick={handleAdd}
                  $isProfiencySelected={isCollectionLength}
                  disabled={disable}
                >
                  <AddCircleIconStyled />
                  {renderButtonText()}
                </AddButtonStyled>
              </ParagraphContainerStyled>
            )}
          </>
        )}
        <Outlet />
      </ContainerStyled>
    </AddProfiencyStyled>
  );
};

export default memo(AddProfiency);
