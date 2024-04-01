import type { SyntheticEvent } from 'react';
import { memo, useEffect, useState } from 'react';
import { LANGUAGE, LanguageInputName, LEVEL } from 'fields/languages/utils/constants';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { SelectChangeEvent } from '@mui/material';
import {
  Autocomplete, createFilterOptions,
  MenuItem, Select, TextField,
} from '@mui/material';

import {
  LANGUAGES as languages,
} from 'containers/main-page/cv-form/components/fields/languages/lib/constants';
import type { CategoryNameStateLanguage } from 'containers/main-page/cv-form/local-state/CategoryIdContext';
import type { UserLanguage } from 'common/models/User';

import { LEVELS as levels } from './utils/constants';
import type { Labels } from './utils/level.enum';

interface LanguageSelectionFormProps {
  isLoading: boolean;
  onGetSelectedLanguage: (language: UserLanguage) => void;
  defaultValue?: CategoryNameStateLanguage;
  setDirtyFlag: (language: string, level: string) => void;
}

type Levels = keyof typeof Labels

const LanguageSelectionForm = function (props: LanguageSelectionFormProps): JSX.Element {
  const {
    onGetSelectedLanguage,
    isLoading,
    defaultValue,
    setDirtyFlag,
  } = props;
  const [language, setLanguage] = useState(defaultValue?.language || '');
  const [level, setLevel] = useState<Levels | ''>(defaultValue?.level as Levels || '');

  useEffect(
    () => {
      if (level) {
        onGetSelectedLanguage({
          name: language,
          level,
        });
      }
      setDirtyFlag(language, level);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language, level],
  );

  const filterOptions = createFilterOptions<string>({
    matchFrom: 'start',
    trim: true,
    stringify: (option) => option,
  });

  const handelLevelChange = (event: SelectChangeEvent<Levels>): void => {
    setLevel(event.target?.value as Levels || '');
  };

  const handelLanguageChange = (event: SyntheticEvent<Element, Event>, newValue: string | null): void => {
    setLanguage(newValue || '');
  };

  return (
    <div className="flex flex-row items-center justify-between w-full gap-6">
      <div className="w-1/2">
        <div className="w-full pt-1">
          <Autocomplete
            options={languages}
            fullWidth
            value={language}
            onChange={handelLanguageChange}
            renderInput={(params) => (
              <TextField {...params} name={LanguageInputName.Language} label={LANGUAGE} />
            )}
            disabled={isLoading || language === 'English'}
            multiple={false}
            filterOptions={filterOptions}
            blurOnSelect
            sx={{
              '& .MuiAutocomplete-inputRoot': {
                padding: 0,
              },
            }}
          />
        </div>
      </div>
      <div className="w-1/2">
        <div className="w-full pt-1">
          <Select
            value={level}
            label={LEVEL}
            name={LanguageInputName.Level}
            onChange={handelLevelChange}
            fullWidth
            IconComponent={KeyboardArrowDownIcon}
            disabled={isLoading}
            sx={{ pt: 0 }}
          >
            {levels.map((item) => (
              <MenuItem
                key={item.name}
                value={item.name}
              >
                <p className="ml-2 text-gray-500">
                  {item.name}
                </p>
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
export default memo(LanguageSelectionForm);
