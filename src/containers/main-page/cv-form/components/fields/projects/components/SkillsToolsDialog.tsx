import {
  Fragment,
  memo, useEffect, useMemo,
  useState,
} from 'react';
import type { Control, FieldArrayWithId } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@mbicycle/foundation-ui-kit';

import { ButtonText } from 'common/components/add-pattern/constants';
import ReactHookFormSelect from 'common/components/react-hook-forms/ReactHookFormSelect';
import type {
  DbUser, Skill,
} from 'common/models/User';

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

  const handleSkillChange = (value: string): void => {
    if (skill) {
      setSelectedCategories(
        (prev) => [...prev.filter((category) => category !== skill.id), `${value}`],
      );
    } else {
      setSelectedCategories(
        (prev) => [...prev, `${value}`],
      );
    }
    setSkill(user?.skills.find((c) => c.id === value));
    setSelectedTools([]);
  };

  const handleToolsChange = (values: string[]): void => {
    setSelectedTools(values);
  };

  const cancelHandler = (): void => {
    onClose();
    clearForm();
    onCancel();
  };

  const skillOptions = useMemo(
    () => getFilteredSkillGroups(user?.skills || [], selectedCategories, skill),
    [selectedCategories, skill, user?.skills],
  );
  const toolOptions = useMemo(
    () => skill?.tools || [],
    [skill?.tools],
  );

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-[420px] transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {CategoryAddText.DialogTitle}
                </Dialog.Title>
                <form onSubmit={doSubmit} id="skill-form">
                  <div>
                    <div className="flex my-6 gap-4 max-w-52 min-w-[400px]">
                      <div className="w-full">
                        <ReactHookFormSelect
                          id="category-dialog"
                          label={CategoryAddText.Skill}
                          value={skill || null}
                          options={skillOptions}
                          onChange={handleSkillChange}
                          name="category"
                          control={control}
                          required
                        />
                      </div>
                      <div className="w-full">
                        <ReactHookFormSelect
                          id="tool-dialog"
                          label={CategoryAddText.Tool}
                          value={tools}
                          options={toolOptions}
                          onChange={handleToolsChange}
                          control={control}
                          name="tools"
                          disabled={!skill?.name}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-4">
                    <Button variant="transparent" onClick={cancelHandler}>{ButtonText.Cancel}</Button>
                    <Button form="skill-form" type="submit">{ButtonText.Ok}</Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default memo(SkillsToolsDialog);
