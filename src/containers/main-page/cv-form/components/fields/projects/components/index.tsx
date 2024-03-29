import type { FieldError, Merge } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuid } from 'uuid';
import type { AnySchema, InferType } from 'yup';
import * as yup from 'yup';

import {
  Divider,
  Grid,
  Typography,
} from '@mui/material';

import { ButtonStep } from 'containers/main-page/cv-form/utils/constants';
import
ReactHookFormTextFieldOutlined
  from 'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import { useGuestToken } from 'common/context/guest-token';
import { useGuestUser } from 'common/context/guest-user';
import { getKeyOf } from 'common/utils/helpers';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';
import useUnsaved from 'common/utils/hooks/useUnSaved';

import { validationTest } from 'fields/personal-information/form/hooks';
import { useUpdateProjects } from 'fields/projects/lib/query-hooks';
import type { ProjectFieldValues } from 'fields/projects/utils/types';
import {
  CancelButtonStyled, SaveButtonStyled, SaveButtonWrapperStyled,
} from 'fields/skills/utils/styled';

import { ErrorMessage, projectDatePresent, ProjectInputsText } from './utils/constants';
import { CategorySelection } from './category-selection';
import DatePickers from './DatePickers';
import Responsibilities from './Responsibilities';

function validateFrom(value: string | Date, schema: InferType<AnySchema>): InferType<AnySchema> {
  const isValidDate = new Date(value).toString().toLowerCase() !== 'invalid date';
  if (value && isValidDate) {
    return schema.max(value, 'Start date must be less than end date.') as InferType<AnySchema>;
  }
  return schema;
}

function validateTo(value2: string | Date, schema: InferType<AnySchema>): InferType<AnySchema> {
  const isValidDate = new Date(value2).toString().toLowerCase() !== 'invalid date';
  if (value2 && isValidDate) {
    return schema.min(value2, 'End date must be more than start date.') as InferType<AnySchema>;
  }
  return schema;
}

export const projectSchema: InferType<AnySchema> = yup.object({
  title: yup.string().min(2, ErrorMessage.MinimumTwo).trim().required(),
  role: yup.string().min(2, ErrorMessage.MinimumTwo).trim().required(),
  from: yup.date()
    .typeError('Invalid date format')
    .required()
    .when(
      'to',
      validateFrom,
    ),
  to: yup.lazy((value) => {
    if (value === projectDatePresent) return yup.string().required();
    return yup.date().typeError('Invalid date format').when(
      'from',
      validateTo,
    ).required();
  }),
  link: yup.string(),
  description: yup.string().min(2, ErrorMessage.MinimumTwo)
    .test('description', ErrorMessage.MinimumTwo, validationTest)
    .required(),
  teamSize: yup.number().min(1),
  responsibilities: yup.array()
    .compact((value: string) => !value.trim())
    .min(1, 'Please add at least one responsibility.')
    .required(),
  categories: yup.array().min(1, 'Please select at least one skill/tool.').required(),
}).required();

type FormError = Merge<FieldError, (FieldError | undefined)[]>

export const renderErrorMessage = (error: FormError | string | undefined): JSX.Element | null => {
  if (!error) return null;
  const message = typeof error === 'string' ? error : error.message;
  return (
    <Grid item xs>
      <Typography color="error">{message}</Typography>
    </Grid>
  );
};

const Project = function (): JSX.Element {
  const { state: tokenState } = useGuestToken();
  const { state, dispatch } = useGuestUser();
  const navigate = useNavigate();
  const { mutateAsync: updateProjectsAsync, isLoading } = useUpdateProjects();
  const formValues = useForm<ProjectFieldValues>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: yupResolver(projectSchema),
  });
  const { openDialogHandler } = useUnsaved(formValues.formState.isDirty);

  const navigateBack = (): void => {
    navigate('/dashboard/projects');
  };

  const cancelHandle = (): void => {
    openDialogHandler({ handleLeave: navigateBack });
  };

  const handleSaveProject = async ({ responsibilities, ...values }: ProjectFieldValues): Promise<void> => {
    if (tokenState.isGuest) {
      dispatch({
        projects: [...state.projects, {
          ...values,
          id: uuid(),
          teamSize: Number(values.teamSize),
          responsibilities,
        }],
      });
    } else {
      await updateProjectsAsync({
        ...values,
        id: uuid(),
        teamSize: Number(values.teamSize),
        responsibilities,
      });
    }

    navigateBack();
  };

  useBeforeUnload(formValues.formState.isDirty);

  const descriptionErrorMessage = formValues.formState.errors[
    getKeyOf<ProjectFieldValues>('description')
  ]?.message;

  const titleErrorMessage = formValues.formState.errors.title?.message;
  const roleErrorMessage = formValues.formState.errors.role?.message;

  return (
    <Grid
      container
      sx={{ p: 4 }}
      gap={4}
      direction="column"
      component="form"
      onSubmit={formValues.handleSubmit(handleSaveProject)}
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
              control={formValues.control}
              label={ProjectInputsText.Title}
              name={getKeyOf<ProjectFieldValues>('title')}
              type="text"
              variant="outlined"
              required
              sx={{ gridArea: 'title' }}
              helperText={titleErrorMessage}
            />
          </Grid>
          <DatePickers
            formValues={formValues}
            defaultValue={{
              from: formValues.getValues()?.from,
              to: formValues.getValues()?.to,
            }}
          />
        </Grid>
        <Grid item container gap={4} alignContent="flex-start">
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              control={formValues.control}
              label={ProjectInputsText.Role}
              name={getKeyOf<ProjectFieldValues>('role')}
              type="text"
              variant="outlined"
              required
              sx={{ gridArea: 'role' }}
              helperText={roleErrorMessage}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              control={formValues.control}
              label={ProjectInputsText.Team}
              name={getKeyOf<ProjectFieldValues>('teamSize')}
              type="number"
              variant="outlined"
              inputProps={{ min: 0 }}
              required
              sx={{ gridArea: 'size' }}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              control={formValues.control}
              label={ProjectInputsText.Link}
              name={getKeyOf<ProjectFieldValues>('link')}
              type="url"
              variant="outlined"
              sx={{ gridArea: 'link' }}
              disabled={tokenState.isGuest}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ReactHookFormTextFieldOutlined
          control={formValues.control}
          label={ProjectInputsText.Description}
          name={getKeyOf<ProjectFieldValues>('description')}
          type="text"
          multiline
          minRows={5}
          variant="outlined"
          required
          helperText={descriptionErrorMessage}
        />
      </Grid>
      <Grid item>
        <Responsibilities formValues={formValues} />
      </Grid>
      {renderErrorMessage(formValues.formState.errors.responsibilities)}
      <Divider />
      <Grid>
        <CategorySelection formValues={formValues} />
      </Grid>
      {renderErrorMessage(formValues.formState.errors.categories)}
      <Divider />
      <SaveButtonWrapperStyled item gap={2}>
        <CancelButtonStyled
          onClick={cancelHandle}
          variant="outlined"
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

export default Project;
