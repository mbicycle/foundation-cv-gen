import {
  memo,
  useEffect,
  useState,
} from 'react';
import type {
  FieldArrayWithId,
  UseFormReturn,
} from 'react-hook-form';
import {
  useFieldArray,
  useForm,
} from 'react-hook-form';

import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import CircularSpinner from 'common/components/circular-spinner/circular-spinner';
import WarningIcon from 'common/icons/Warning';
import type { Skill } from 'common/models/User';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';
import useUnsaved from 'common/utils/hooks/useUnSaved';

import {
  SelectSkillsContainerStyled,
  WarningContainerStyled,
} from 'fields/projects/components/category-selection/styled';
import SkillsToolsDialog from 'fields/projects/components/SkillsToolsDialog';
import {
  ButtonText, CategoryAddText, tooltipText,
} from 'fields/projects/components/utils/constants';
import { ProjectTitleStyled } from 'fields/projects/components/utils/styledEdit';
import type { ProjectFieldValues } from 'fields/projects/utils/types';
import { InfoIconStyled } from 'fields/styled';

import CategorySelectionItem from './CategorySelectionItem';

export type CategoryItemProps = {
  categories: {
    skill: string;
    tools: string[];
  }[];
};
type OnSubmitType = {
  tools: string[];
  skill?: Skill;
};

type CategorySelectionProps = {
  formValues: UseFormReturn<ProjectFieldValues>;
  defaultValues?: {
    skill: string;
    tools: string[];
  }[];
};

type FieldType = {
  field: FieldArrayWithId<CategoryItemProps, 'categories', 'id'>,
}

const SkillSelection = function (
  {
    formValues, defaultValues,
  }: CategorySelectionProps,
): JSX.Element {
  const { data, isLoading } = useUserFromDb();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState<FieldArrayWithId<CategoryItemProps, 'categories', 'id'>>();

  const usedCategories = formValues.getValues().categories?.map((element) => element.split(', ')[0]) || [];

  const { control, formState: { isDirty }, watch } = useForm<CategoryItemProps>(
    {
      mode: 'onChange',
      defaultValues: {
        categories: defaultValues,
      },
    },
  );
  const {
    fields, append, remove, update,
  } = useFieldArray({
    control,
    name: 'categories',
  });

  const onAddModalOpenHandle = (): void => {
    setOpen(true);
  };

  const onSubmitHandle = ({ skill, tools }: OnSubmitType): void => {
    if (selected) {
      const index = fields.findIndex((item) => item.id === selected.id);
      update(index, {
        skill: skill?.id || '',
        tools: tools.flat(Infinity),
      });
      setSelected(undefined);
    } else {
      append({
        skill: skill?.id ?? '',
        tools: tools.flat(Infinity),
      });
    }

    setOpen(false);
  };

  const onCancelHandle = (): void => {
    setSelected(undefined);
  };

  const getCategoriesCapture = (props: FieldType): FieldType => {
    const { field } = props;
    const skill = data?.skills?.find((element) => element.id === field.skill);
    const tools = skill?.tools.filter((tool) => field.tools.includes(tool.id)).map((tool) => tool.name) || [];

    return ({
      field: {
        ...field,
        skill: skill?.name || '',
        tools,
      },
    });
  };

  const onClose = (): void => setOpen(false);

  useBeforeUnload(isDirty);
  useUnsaved(isDirty);

  const skills = watch('categories');

  useEffect(() => {
    formValues.setValue(
      'categories',
      fields.map(({ skill, tools }) => (`${skill}, ${tools}`)),
    );
    formValues.reset({}, {
      keepValues: true,
      keepErrors: false,
      keepDirty: false,
    });

    setDisabled(skills?.length === data?.skills.length);
  }, [data?.skills.length, fields, formValues, skills]);

  if (isLoading) {
    return <CircularSpinner size="medium" color="primary" />;
  }

  return (
    <Grid item xs={12}>
      <Box display="inline-flex">
        <ProjectTitleStyled variant="h5">{CategoryAddText.Title}</ProjectTitleStyled>
        <Tooltip title={<Typography>{tooltipText}</Typography>}>
          <InfoIconStyled fontSize="medium" />
        </Tooltip>
      </Box>
      <Grid container>
        <Grid item container xs={12}>
          {fields.map((field, index) => (
            <CategorySelectionItem
              key={field.id}
              field={getCategoriesCapture({ field }).field}
              fieldIndex={index}
              remove={remove}
              onSetSelected={() => setSelected(field)}
              onSetOpen={setOpen}
            />
          ))}
        </Grid>
        <SelectSkillsContainerStyled>
          <Button
            color="primary"
            variant="outlined"
            onClick={onAddModalOpenHandle}
            disabled={disabled}
          >
            {ButtonText.Select}
          </Button>
          {disabled && (
            <WarningContainerStyled>
              <WarningIcon sx={{ mr: 2 }} />
              <Typography>You have selected all existing skill groups!</Typography>
            </WarningContainerStyled>
          )}
        </SelectSkillsContainerStyled>

        <SkillsToolsDialog
          user={data}
          open={open}
          onClose={onClose}
          control={control}
          onSubmit={onSubmitHandle}
          onCancel={onCancelHandle}
          defaultValues={selected}
          usedCategories={usedCategories}
        />
      </Grid>
    </Grid>
  );
};

export default memo(SkillSelection);
