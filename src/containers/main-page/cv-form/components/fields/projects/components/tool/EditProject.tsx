import {
  memo,
  useEffect,
  useMemo,
} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mbicycle/foundation-ui-kit';
import { projectSchema, renderErrorMessage } from 'fields/projects/components';
import { CategorySelection } from 'fields/projects/components/category-selection';
import DatePickers from 'fields/projects/components/DatePickers';
import Responsibilities from 'fields/projects/components/Responsibilities';
import { ProjectInputsText } from 'fields/projects/components/utils/constants';
import type { ProjectFieldValues } from 'fields/projects/utils/types';

import {
  Divider,
} from '@mui/material';

import { ButtonStep } from 'containers/main-page/cv-form/utils/constants';
import ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import { useGuestToken } from 'common/context/guest-token';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';
import useUnsaved from 'common/utils/hooks/useUnSaved';

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
    <form className="p-4 gap-8 flex flex-col w-full" onSubmit={formValues.handleSubmit(onSaveProjectHandle)}>
      <div className="flex flex-row w-full gap-8">
        <div className="flex flex-col flex-nowrap gap-8 w-1/2">
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
          <DatePickers formValues={formValues} defaultValue={{ from: project?.from, to: project?.to }} />
        </div>
        <div className="flex flex-col flex-nowrap gap-8 w-1/2">
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
          <ReactHookFormTextFieldOutlined
            key={project?.title}
            control={formValues.control}
            label={ProjectInputsText.Link}
            name="link"
            type="url"
            variant="outlined"
            disabled={tokenState.isGuest}
          />
        </div>
      </div>
      <div className="w-full">
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
      </div>
      <Responsibilities
        formValues={formValues}
        defaultValues={responsibilities}
      />
      {renderErrorMessage(formValues.formState.errors.responsibilities)}
      <Divider />
      <CategorySelection
        formValues={formValues}
        defaultValues={categories}
      />
      {renderErrorMessage(formValues.formState.errors.categories)}
      <Divider />
      <div className="saveBtnWrapper gap-2">
        <Button
          onClick={cancelClickHandle}
          variant="transparent"
          disabled={isLoading}
        >
          {ButtonStep.Cancel}
        </Button>
        <Button
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          {ButtonStep.Save}
        </Button>
      </div>
    </form>
  );
};

export default memo(EditProject);
