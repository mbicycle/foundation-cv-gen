import { memo } from 'react';
import { Button } from '@mbicycle/foundation-ui-kit';

import CircularSpinner from 'common/components/circular-spinner/circular-spinner';
import ReactHookFormTextFieldOutlined from
  'common/components/react-hook-forms/ReactHookFormTextFieldOutlined';
import { useGuestToken } from 'common/context/guest-token';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';

import { InputLabel, InputName } from './constants';
import { useUpdatePersonalData } from './hooks';

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
    return <CircularSpinner size="large" />;
  }

  // todo: btn
  return (
    <form className="my-6" onSubmit={submitHandle}>
      <div className="flex flex-row flex-nowrap space-x-4 w-full">
        <div className="flex flex-col gap-6 w-1/2">
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
          <ReactHookFormTextFieldOutlined
            label={InputLabel.LastName}
            name={InputName.LastName}
            control={control}
            disabled={!isGuest}
            type="text"
            variant="outlined"
            helperText={errors[InputName.LastName]?.message}
          />
          <ReactHookFormTextFieldOutlined
            label={InputLabel.Telegram}
            name={InputName.Telegram}
            control={control}
            type="text"
            variant="outlined"
            disabled={isGuest}
          />
        </div>
        <div className="flex flex-col gap-6 w-1/2">
          <ReactHookFormTextFieldOutlined
            label={InputLabel.Email}
            name={InputName.Email}
            control={control}
            type="text"
            variant="outlined"
            disabled
          />
          <ReactHookFormTextFieldOutlined
            inputMode="text"
            label={InputLabel.Skype}
            name={InputName.Skype}
            control={control}
            type="text"
            variant="outlined"
            disabled={isGuest}
          />
          <ReactHookFormTextFieldOutlined
            label={InputLabel.Title}
            name={InputName.Title}
            control={control}
            type="text"
            variant="outlined"
            helperText={errors[InputName.Title]?.message}
          />
        </div>
      </div>
      <div className="my-6">
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
      </div>
      <div className="flex justify-end">
        <Button
          disabled={!isValid || !isDirty}
          // loading={isLoading}
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default memo(PersonalDataForm);
