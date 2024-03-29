import { memo } from 'react';

import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';

import CircularSpinner from 'common/components/circular-spinner/circular-spinner';
import ReactHookFormTextFieldOutlined from
  'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import { useGuestToken } from 'common/context/guest-token';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';

import { InputLabel, InputName } from './constants';
import { useUpdatePersonalData } from './hooks';
import { ContainerStyled, FormControlStyled } from './styled';

const PersonalDataForm = function (): JSX.Element {
  const {
    dbUser,
    isLoading,
    isDirty,
    isValid,
    control,
    errors,
    submitHandle,
  } = useUpdatePersonalData();

  useBeforeUnload(isDirty);
  const { state } = useGuestToken();
  const { isGuest } = state;

  if (!dbUser) {
    return <CircularSpinner size="large" color="primary" />;
  }

  return (
    <FormControlStyled onSubmit={submitHandle}>
      <Grid container direction="row" wrap="nowrap" spacing={4}>
        <Grid item container gap={4}>
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              label={InputLabel.FirstName}
              name={InputName.FirstName}
              control={control}
              disabled={!isGuest}
              type="text"
              variant="outlined"
              fullWidth
              helperText={errors[InputName.FirstName]?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              label={InputLabel.LastName}
              name={InputName.LastName}
              control={control}
              disabled={!isGuest}
              type="text"
              variant="outlined"
              helperText={errors[InputName.LastName]?.message}
            />
          </Grid>
        </Grid>
        <Grid item container gap={4}>
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              label={InputLabel.Email}
              name={InputName.Email}
              control={control}
              type="text"
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <ReactHookFormTextFieldOutlined
              inputMode="text"
              label={InputLabel.Skype}
              name={InputName.Skype}
              control={control}
              type="text"
              variant="outlined"
              disabled={isGuest}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" wrap="nowrap" spacing={4} marginTop={1} height={70}>
        <Grid item xs={12}>
          <ReactHookFormTextFieldOutlined
            label={InputLabel.Telegram}
            name={InputName.Telegram}
            control={control}
            type="text"
            variant="outlined"
            disabled={isGuest}
          />
        </Grid>
        <Grid item xs={12} marginBottom={0}>
          <ReactHookFormTextFieldOutlined
            label={InputLabel.Title}
            name={InputName.Title}
            control={control}
            type="text"
            variant="outlined"
            helperText={errors[InputName.Title]?.message}
          />
        </Grid>
      </Grid>
      <ContainerStyled>
        <ReactHookFormTextFieldOutlined
          control={control}
          label={InputLabel.Summary}
          name={InputName.Summary}
          fullWidth
          multiline
          rows={6}
          type="text"
          variant="outlined"
          required
          helperText={errors[InputName.Summary]?.message}
        />
      </ContainerStyled>
      <Grid container justifyContent="end">
        <LoadingButton
          variant="contained"
          disabled={!isValid || !isDirty}
          loading={isLoading}
          type="submit"
        >
          Save
        </LoadingButton>
      </Grid>
    </FormControlStyled>
  );
};

export default memo(PersonalDataForm);
