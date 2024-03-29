import {
  memo, useEffect,
  useState,
} from 'react';
import type { Control, FieldArrayWithId } from 'react-hook-form';

import type { SelectChangeEvent } from '@mui/material';
import {
  Button, Dialog, DialogActions,
  DialogContent,
  DialogTitle, FormControl, Grid, InputLabel,
  MenuItem, OutlinedInput,
} from '@mui/material';

import { ButtonText } from 'common/components/add-pattern/constants';
import ReactHookFormSelect from 'common/components/react-hook-forms/ReactHookFormSelect';
import type {
  DbUser, Skill,
} from 'common/models/User';

import { ListItemTextStyled } from 'fields/projects/utils/styled';

import type { CategoryItemProps } from './category-selection/CategorySelection';
import { CategoryAddText } from './utils/constants';
import { getFilteredSkillGroups } from './utils/functions';

type DialogFormReturnType = {
  tools: string[];
  skill?: Skill;
};

interface SkillsToolsDialogProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<CategoryItemProps, any>;
  onClose: VoidFunction;
  onSubmit: (data: DialogFormReturnType) => void;
  onCancel: VoidFunction,
  user?: DbUser;
  defaultValues?: FieldArrayWithId<CategoryItemProps, 'categories', 'id'>;
  usedCategories: string[];
}

const getToolNames = (toolIds: string[], skill?: Skill): string[] => skill?.tools?.filter(
  (t) => toolIds.includes(t.id),
).map((element) => element.name) || [];

const SkillsToolsDialog = function (props: SkillsToolsDialogProps): JSX.Element {
  const {
    user, open, onClose, control, onSubmit, defaultValues, onCancel, usedCategories,
  } = props;
  const [skill, setSkill] = useState<Skill | undefined>();
  const [tools, setSelectedTools] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState([...usedCategories]);

  useEffect(() => {
    if (defaultValues) {
      const defaultSkill = user?.skills?.find((c) => c.id === defaultValues.skill);
      setSkill(defaultSkill);
      setSelectedTools(defaultValues.tools);
    }
    setSelectedCategories([...usedCategories]);
  }, [defaultValues, user?.skills, open, usedCategories]);

  const clearForm = (): void => {
    setSkill(undefined);
    setSelectedTools([]);
  };

  const doSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    const returnData = {
      skill,
      tools,
    };

    onSubmit(returnData);
    clearForm();
  };

  const handleSkillChange = (event: SelectChangeEvent<HTMLSelectElement | unknown>): void => {
    if (skill) {
      setSelectedCategories(
        (prev) => [...prev.filter((category) => category !== skill.id), `${event.target.value}`],
      );
    } else {
      setSelectedCategories(
        (prev) => [...prev, `${event.target.value}`],
      );
    }
    setSkill(user?.skills.find((c) => c.id === event.target.value));
    setSelectedTools([]);
  };

  const handleToolsChange = (event: SelectChangeEvent<HTMLSelectElement | unknown>): void => {
    const toolsToAdd = event.target.value as string[];
    setSelectedTools(toolsToAdd);
  };

  const cancelHandler = (): void => {
    onClose();
    clearForm();
    onCancel();
  };

  return (
    <Dialog
      disableEscapeKeyDown
      open={open}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '50rem',
          },
        },
      }}
    >
      <form onSubmit={doSubmit} id="skill-form">
        <DialogTitle>{CategoryAddText.DialogTitle}</DialogTitle>
        <DialogContent>
          <Grid container rowGap={4} sx={{ minWidth: 420, maxWidth: '50rem' }}>
            <FormControl fullWidth sx={{ mt: 4 }}>
              <InputLabel htmlFor="category-dialog">{CategoryAddText.Skill}</InputLabel>
              <ReactHookFormSelect
                id="category-dialog"
                value={skill?.id || ''}
                onChange={handleSkillChange}
                name="category"
                control={control}
                input={<OutlinedInput label={CategoryAddText.Skill} />}
                required
              >
                {getFilteredSkillGroups(user?.skills || [], selectedCategories, skill)
                  .map((skillGroup) => (
                    <MenuItem
                      key={skillGroup.id}
                      value={skillGroup.id}
                    >
                      <ListItemTextStyled
                        primary={skillGroup.name}
                      />
                    </MenuItem>
                  ))}
              </ReactHookFormSelect>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="tool-dialog">{CategoryAddText.Tool}</InputLabel>
              <ReactHookFormSelect
                id="tool-dialog"
                value={tools || ''}
                onChange={handleToolsChange}
                control={control}
                name="tools"
                disabled={!skill?.name}
                input={<OutlinedInput label={CategoryAddText.Tool} />}
                multiple
                required
                renderValue={(): string => (getToolNames(tools, skill).join(', '))}
              >
                {skill?.tools?.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    <ListItemTextStyled
                      primary={name}
                    />
                  </MenuItem>
                ))}
              </ReactHookFormSelect>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={cancelHandler}>{ButtonText.Cancel}</Button>
          <Button variant="contained" form="skill-form" type="submit">{ButtonText.Ok}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default memo(SkillsToolsDialog);
