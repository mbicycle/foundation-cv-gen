import { memo, useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

import GarbageIcon from 'common/icons/GarbageIcon';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';
import useUnsaved from 'common/utils/hooks/useUnSaved';

import type { ProjectFieldValues } from 'fields/projects/utils/types';
import { AddToolContainerStyled, BoxButtonWrapper, DividerBottom } from 'fields/skills/utils/styled';

import { ButtonText, Text } from './utils/constants';

type AddResponsibilityProps = {
  responsibilities: {
    responsibility: string;
  }[];
};

type ResponsibilitiesProps = {
  formValues: UseFormReturn<ProjectFieldValues>;
  defaultValues?: {
    responsibility: string;
  }[];
};

const Responsibilities = function ({
  formValues, defaultValues = [{
    responsibility: '',
  }],
}: ResponsibilitiesProps): JSX.Element {
  const {
    register, control, watch, formState: { isDirty },
  } = useForm<AddResponsibilityProps>({
    defaultValues: {
      responsibilities: defaultValues,
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'responsibilities',
  });

  const onAddHandle = (): void => {
    append({ responsibility: '' });
  };

  const watchFieldArray = watch('responsibilities');
  const controlledFields = fields.map((field, index) => ({ ...field, ...watchFieldArray[index] }));

  useBeforeUnload(isDirty);
  useUnsaved(isDirty);

  useEffect(() => {
    formValues.setValue('responsibilities', [...controlledFields.map((field) => (field.responsibility))]);
    formValues.resetField('responsibilities', { keepError: false, keepDirty: false });
  }, [controlledFields, formValues]);

  return (
    <>
      <Typography>
        {Text.ResponsibilitiesTitle}
      </Typography>
      {controlledFields.map(
        (field, index) => (
          <AddToolContainerStyled>
            <Grid
              key={field.id}
              container
              marginTop={5}
              marginBottom={5}
            >
              <Grid item xs key={field.id}>
                <TextField
                  required
                  fullWidth
                  label={`Responsibility ${index + 1}`}
                  variant="outlined"
                  {...register(`responsibilities.${index}.responsibility` as const)}
                />
              </Grid>
            </Grid>
            <DividerBottom>
              <IconButton onClick={() => remove(index)}>
                <BoxButtonWrapper>
                  <GarbageIcon fontSize="medium" />
                </BoxButtonWrapper>
              </IconButton>
            </DividerBottom>
          </AddToolContainerStyled>
        ),
      )}
      <Button variant="outlined" onClick={onAddHandle}>
        <AddCircleOutlineIcon />
        &nbsp;
        {ButtonText.Add}
      </Button>
    </>
  );
};

export default memo(Responsibilities);
