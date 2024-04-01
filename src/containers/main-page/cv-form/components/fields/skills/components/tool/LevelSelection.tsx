import { memo } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  FormControl, FormHelperText, InputLabel,
  MenuItem, Select,
} from '@mui/material';

import type { Skill } from 'common/models/User';

import { TOOL_LEVELS as levels } from 'fields/languages/components/utils/constants';
import { HelperText, LevelInputText, TOOLS_NAME } from 'fields/skills/utils/constants';
import { MenuItemText } from 'fields/skills/utils/styled';

interface LevelSelectionProps{
    control: Control<Skill>;
    index: number,
}

const LevelSelection = function (
  { control, index }: LevelSelectionProps,
):JSX.Element {
  return (
    <Controller<Skill>
      name={`${TOOLS_NAME}.${index}.${LevelInputText.Name}`}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel>{LevelInputText.Label}</InputLabel>
          <Select
            {...field}
            label="Level"
            fullWidth
            IconComponent={KeyboardArrowDownIcon}
          >
            {levels.map((item) => (
              <MenuItem
                key={item.name}
                value={item.name}
              >
                <MenuItemText color="text.secondary">
                  {item.name}
                </MenuItemText>
              </MenuItem>
            ))}
          </Select>
          {!field.value && <FormHelperText error={!!error}>{HelperText.SkillLevel}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default memo(LevelSelection);