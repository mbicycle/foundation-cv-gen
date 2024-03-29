import {
  memo, useEffect, useState,
} from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import memoizeOne from 'memoize-one';
import { v4 as uuidv4 } from 'uuid';

import {
  Grid,
} from '@mui/material';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { useSkillIdContext } from 'containers/main-page/cv-form/local-state/hooks';
import { ButtonStep } from 'containers/main-page/cv-form/utils/constants';
import { AddCircleIconStyled } from 'common/components/add-pattern/styled';
import
ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import { ROUTE } from 'common/components/routes/utils/constants';
import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';
import type {
  DbUser, Project, Skill as SkillType, Tool as ToolType,
} from 'common/models/User';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';
import useUnsaved from 'common/utils/hooks/useUnSaved';

import {
  HelperText,
  SKILL_ERROR_MESSAGE,
  SkillInputText, Text,
} from 'fields/skills/utils/constants';
import {
  AddToolButtonStyled,
  CancelButtonStyled,
  CategoryContainerStyled,
  SaveButtonStyled, SaveButtonWrapperStyled,
} from 'fields/skills/utils/styled';

import { getSkillGroupNames, getSkillSchema } from './helpers/constants';
import { useDeleteSkill, useSaveSkill } from './helpers/hooks';
import ToolList from './tool/ToolList';

const getUserSkill = (id: string, user: DbUser | undefined): SkillType => {
  const userSkill = user?.skills?.find((skill) => skill.id === id);

  if (userSkill) return ({ ...userSkill });

  return ({ id: uuidv4(), name: '', tools: [] });
};

const Skill = function (): JSX.Element {
  const navigate = useNavigate();
  const { state: { id } } = useSkillIdContext();
  const { data: user, refetch } = useUserFromDb();
  const { isLoading, onSaveSkillHandle } = useSaveSkill();
  const { isLastSkill, removeProjectSkillById } = useDeleteSkill();
  const [modifiedUserProjects, setModifiedUserProjects] = useState<Project[]>([]);
  const [newTool, setNewTool] = useState<ToolType | undefined>(undefined);

  if (user && !user?.skills) user.skills = [];

  const memoizeSkillGroupNames = memoizeOne(getSkillGroupNames);
  const memoizeSkillSchema = memoizeOne(getSkillSchema);
  const skillGroupNames = memoizeSkillGroupNames(user?.skills || [], id || '');
  const skillSchema = memoizeSkillSchema(skillGroupNames || []);

  const skill = getUserSkill(id || '', user);

  const {
    control, formState, getValues, handleSubmit, watch, reset,
  } = useForm<SkillType>(
    {
      mode: 'onChange',
      defaultValues: { id: uuidv4(), name: '', tools: [] },
      resolver: yupResolver(skillSchema),
    },
  );

  const { openDialogHandler } = useUnsaved(formState.isDirty);
  useBeforeUnload(formState.isDirty);

  const {
    remove, append, move,
  } = useFieldArray({
    control,
    name: 'tools',
    keyName: 'key',
  });

  const tools = watch(['tools'])[0];
  const skillName = watch(['name'])[0];

  useEffect(() => {
    reset({
      id: skill.id,
      name: skill.name,
      tools: skill.tools,
    }, {
      keepDirty: false,
    });
    if (user?.projects) setModifiedUserProjects([...user?.projects]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelHandle = (): void => {
    navigate(`/dashboard/${ROUTE.DASHBOARD.SKILLS}`);
    refetch();
  };

  const cancelClickHandle = (): void => {
    openDialogHandler({ handleLeave: cancelHandle });
  };

  const onAddToolHandle = (): void => {
    const addedTool: ToolType = {
      id: uuidv4(), name: '', level: '', experience: 0,
    };

    append(addedTool);
    setNewTool(addedTool);
  };

  const onDeleteToolHandle = (deleteSkillPosition: number, deleteSkillId: string): void => {
    if (!isLastSkill(deleteSkillId, [...modifiedUserProjects])) {
      const modifiedProjects = removeProjectSkillById(deleteSkillId, [...modifiedUserProjects]);

      setModifiedUserProjects([...modifiedProjects]);

      remove(deleteSkillPosition);
    } else {
      SnackBarUtils.error(SKILL_ERROR_MESSAGE);
    }
  };

  const onFormSubmitHandle = (): void => {
    const toolsValues = getValues().tools.map(
      (tool) => ({ ...tool, experience: Number(tool.experience) }),
    );
    if (user) {
      onSaveSkillHandle({ ...skill, ...getValues(), tools: toolsValues }, {
        ...user,
        projects: [...modifiedUserProjects],
      });
    }
  };

  const renderTools = (addedTool: ToolType | undefined): JSX.Element | null => {
    if (!tools.length) return null;

    return (
      <ToolList
        move={move}
        tools={tools}
        control={control}
        newTool={addedTool}
        formState={formState}
        onDeleteToolHandle={onDeleteToolHandle}
      />
    );
  };

  return (
    <CategoryContainerStyled component="form" onSubmit={handleSubmit(onFormSubmitHandle)}>
      <Grid>
        <Grid item container xs={12} wrap="nowrap" gap={4} sx={{ paddingTop: 3 }}>
          <ReactHookFormTextFieldOutlined
            control={control}
            label={SkillInputText.Label}
            name={SkillInputText.Name}
            type="text"
            variant="outlined"
            helperText={skillName.length
              ? formState.errors[SkillInputText.Name]?.message
              : HelperText.SkillGroup}
            autoFocus
          />
          <Grid
            item
            xs={4}
            marginBottom={3}
            display="inline-flex"
            justifyContent="flex-start"
          >
            <AddToolButtonStyled
              onClick={onAddToolHandle}
              variant="contained"
              disabled={!!formState.errors.name || !getValues().name.length}
            >
              <AddCircleIconStyled />
              {Text.AddTool}
            </AddToolButtonStyled>
          </Grid>
        </Grid>
        <Grid>
          { renderTools(newTool) }
        </Grid>
        <SaveButtonWrapperStyled item container xs={12} gap={2}>
          <CancelButtonStyled
            onClick={cancelClickHandle}
            variant="outlined"
          >
            {ButtonStep.Cancel}
          </CancelButtonStyled>
          <SaveButtonStyled
            disabled={!formState.isValid}
            variant="contained"
            type="submit"
            loading={isLoading}
          >
            {ButtonStep.Save}
          </SaveButtonStyled>
        </SaveButtonWrapperStyled>
      </Grid>
    </CategoryContainerStyled>
  );
};

export default memo(Skill);
