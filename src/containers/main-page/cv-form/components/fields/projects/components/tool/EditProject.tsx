import {
  memo,
  useEffect,
  useMemo,
} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Divider,
  Grid,
} from '@mui/material';

import { ButtonStep } from 'containers/main-page/cv-form/utils/constants';
import ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import { useGuestToken } from 'common/context/guest-token';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';
import useUnsaved from 'common/utils/hooks/useUnSaved';

import { projectSchema, renderErrorMessage } from 'fields/projects/components';
import { CategorySelection } from 'fields/projects/components/category-selection';
import DatePickers from 'fields/projects/components/DatePickers';
import Responsibilities from 'fields/projects/components/Responsibilities';
import { ProjectInputsText } from 'fields/projects/components/utils/constants';
import type { ProjectFieldValues } from 'fields/projects/utils/types';
import {
  CancelButtonStyled,
  SaveButtonStyled,
  SaveButtonWrapperStyled,
} from 'fields/skills/utils/styled';

import { useEditProject } from './hooks';

const EditProject = function (): JSX.Element | null {
  const {
    project,
    isLoading,
    cancelHandle,
    onSaveProjectHandle,
  } = useEditProject();

  const formValues = useForm<ProjectFieldValues>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: yupResolver(projectSchema),
  });

  const { state: tokenState } = useGuestToken();
  const { openDialogHandler } = useUnsaved(formValues.formState.isDirty);

  const cancelClickHandle = (): void => {
    openDialogHandler({ handleLeave: cancelHandle });
  };

  const responsibilities = useMemo(
    () => project?.responsibilities.map((responsibility) => ({ responsibility })),
    [project?.responsibilities],
  );

  const categories = useMemo(() => project?.categories?.map((category) => {
    const values = category.split(',').map((value) => value.trim());

    return {
      skill: values[0],
      tools: values?.slice(1) || [],
    };
  }), [project?.categories]);

  useBeforeUnload(formValues.formState.isDirty);

  useEffect(() => {
    if (!project) return;

    Object.entries(project).forEach(([key, value]) => {
      if (key !== 'responsibilities' && key !== 'categories') {
        formValues.setValue(key as keyof ProjectFieldValues, value);
      }
    });
  }, [project, formValues]);

  const descriptionErrorMessage = formValues.formState.errors.description?.message;
  const titleErrorMessage = formValues.formState.errors.title?.message;
  const roleErrorMessage = formValues.formState.errors.role?.message;

  return (
    <Grid
      container
      sx={{ p: 4 }}
      gap={4}
      direction="column"
      component="form"
      onSubmit={formValues.handleSubmit(onSaveProjectHandle)}
    >
      <Grid
        item
        container
        direction="row"
        wrap="nowrap"
        xs={12}
        gap={4}
      >
        <Grid container gap={4}>
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              key={project?.title}
              control={formValues.control}
              label={ProjectInputsText.Title}
              name="title"
              type="text"
              variant="outlined"
              required
              helperText={titleErrorMessage}
            />
          </Grid>
          <DatePickers formValues={formValues} defaultValue={{ from: project?.from, to: project?.to }} />
        </Grid>
        <Grid item container gap={4} alignContent="flex-start">
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              key={project?.title}
              control={formValues.control}
              label={ProjectInputsText.Role}
              name="role"
              type="text"
              variant="outlined"
              required
              helperText={roleErrorMessage}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              key={project?.title}
              control={formValues.control}
              label={ProjectInputsText.Team}
              name="teamSize"
              type="number"
              inputProps={{ min: 0 }}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              key={project?.title}
              control={formValues.control}
              label={ProjectInputsText.Link}
              name="link"
              type="url"
              variant="outlined"
              disabled={tokenState.isGuest}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ReactHookFormTextFieldOutlined
          key={project?.title}
          control={formValues.control}
          label={ProjectInputsText.Description}
          name="description"
          type="text"
          multiline
          minRows={5}
          variant="outlined"
          required
          helperText={descriptionErrorMessage}
        />
      </Grid>
      <Grid item>
        <Responsibilities
          formValues={formValues}
          defaultValues={responsibilities}
        />
      </Grid>
      {renderErrorMessage(formValues.formState.errors.responsibilities)}
      <Divider />
      <Grid>
        <CategorySelection
          formValues={formValues}
          defaultValues={categories}
        />
      </Grid>
      {renderErrorMessage(formValues.formState.errors.categories)}
      <Divider />
      <SaveButtonWrapperStyled item gap={2}>
        <CancelButtonStyled
          onClick={cancelClickHandle}
          variant="outlined"
          disabled={isLoading}
        >
          {ButtonStep.Cancel}
        </CancelButtonStyled>
        <SaveButtonStyled
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          {ButtonStep.Save}
        </SaveButtonStyled>
      </SaveButtonWrapperStyled>
    </Grid>
  );
};

export default memo(EditProject);
