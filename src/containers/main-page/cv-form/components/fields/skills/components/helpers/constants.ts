import type { Skill } from "entities/user/model"
import * as yup from "yup"

import { HelperText, SkillYearsRange } from "containers/main-page/cv-form/components/fields/skills/utils/constants"

export enum ErrorMessage {
  MinimumTwo = "Minimum 2 characters",
}

export const getSkillSchema = (skillGroupNames: string[]): yup.InferType<yup.AnySchema> =>
  yup
    .object({
      name: yup
        .string()
        .lowercase()
        .min(2, ErrorMessage.MinimumTwo)
        .trim()
        .required(HelperText.Skill)
        .notOneOf(skillGroupNames, HelperText.SkillGroupNameExists),
      tools: yup
        .array()
        .of(
          yup.object().shape({
            name: yup.string().min(2, ErrorMessage.MinimumTwo).trim().required("Name is required"),
            level: yup.string().trim().required("Level is required"),
            experience: yup
              .number()
              .moreThan(SkillYearsRange.Min)
              .lessThan(SkillYearsRange.Max)
              .required("Experience is required")
              .test("is-multiply", "Value is not a multiple of 0.5", (value) => (value ? value % 0.5 === 0 : true)),
          }),
        )
        .min(1),
    })
    .required()

export const getSkillGroupNames = (skillGroups: Skill[], id: string): string[] =>
  skillGroups.filter((skillGroup) => skillGroup.id !== id).map((userSkill) => userSkill.name.toLowerCase())
