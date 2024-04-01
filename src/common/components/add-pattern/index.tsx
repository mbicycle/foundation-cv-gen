import {
  memo, useCallback, useEffect, useState,
} from 'react';
import {
  Outlet, useLocation, useNavigate,
} from 'react-router-dom';
import { Button } from '@mbicycle/foundation-ui-kit';

import { useSkillIdContext } from 'containers/main-page/cv-form/local-state/hooks';
import { ROUTE } from 'common/components/routes/utils/constants';
import type {
  Certificate, Project, Skill, UserLanguage,
} from 'common/models/User';

import type { Step } from './constants';
import { ButtonText, SkillsDoesntExist } from './constants';
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

  // TODO: btn

  return (
    <div className="flex w-full h-max-content items-start overflow-y-auto overflow-x-hidden">
      <div className="flex w-full justify-center flex-col items-center border rounded mb-2 mt-2">
        {pressedAdd && <Title name={title} onReturn={onReturnHandle} />}
        {!pressedAdd
        && (
          <>
            {isCollectionLength ? children : null}
            {!location.pathname.includes('edit') && (
              <div className="w-full flex flex-col justify-between mt-10">
                {
                  (location.pathname.includes(ROUTE.DASHBOARD.PROJECTS) && disable) ? (
                    <div className="text-center w-full mb-4 break-words">
                      <h3>
                        {SkillsDoesntExist.Paragraph}
                      </h3>
                      <Button onClick={redirectCallback}>
                        {SkillsDoesntExist.Link}
                      </Button>
                    </div>
                  ) : <div />
                }
                <Button
                  variant="primary"
                  onClick={handleAdd}
                  // $isProfiencySelected={isCollectionLength}
                  disabled={disable}
                  isAdd
                >
                  {renderButtonText()}
                </Button>
              </div>
            )}
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default memo(AddProfiency);
