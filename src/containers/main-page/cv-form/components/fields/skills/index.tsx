import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import AddProficiency from 'common/components/add-pattern';
import { ButtonText } from 'common/components/add-pattern/constants';
import CircularSpinner from 'common/components/circular-spinner/circular-spinner';
import { ROUTE } from 'common/components/routes/utils/constants';

import SkillList from './components/skills/CategoryList';

const Categories = function (): JSX.Element {
  const location = useLocation();
  const { data } = useUserFromDb();

  if (!data) {
    return <CircularSpinner size="large" color="primary" />;
  }

  return (
    <AddProficiency
      collection={data.skills || []}
      title="Skill Group"
      ButtonString={ButtonText.AddSkills}
      targetPath="edit"
    >
      {!location.pathname.includes(ROUTE.EDIT) && <SkillList skills={data.skills || []} user={data} />}
    </AddProficiency>
  );
};

export default memo(Categories);
