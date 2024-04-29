import dayjs from "dayjs"
import type { ParagraphChild } from "docx"
import { Paragraph, TextRun } from "docx"
import type { Project } from "entities/user/model"
import { projectDatePresent } from "fields/projects/components/utils/constants"
import { Color } from "shared/config/theme"

import { createHeadingWithHyperlink, INDENT, TextStyle } from "containers/application-bar/word/helper-functions"
import { useToggleSensitiveData } from "common/context/toggle-sensetive-data"

const createProjectTitle = (text: string): Paragraph =>
  new Paragraph({
    indent: INDENT,
    children: [
      new TextRun({
        text: text.toUpperCase(),
        size: 32,
        color: Color.Black,
        font: TextStyle.Regular,
        bold: true,
        break: 1,
      }),
    ],
  })

const createDescription = (titleText: string, text: string): Paragraph => {
  const splitedText = text?.split("\n")
  return new Paragraph({
    indent: INDENT,
    children: [
      new TextRun({
        text: titleText,
        size: 26,
        color: Color.Black,
        font: TextStyle.Semi,
        break: 1,
      }),
      ...(splitedText?.map(
        (t) =>
          new TextRun({
            text: t,
            size: 26,
            color: Color.Black,
            font: TextStyle.Regular,
            break: 1,
          }),
      ) || []),
    ],
  })
}

const createInlineTextRun = (titleText: string, text: string): Paragraph =>
  new Paragraph({
    indent: INDENT,
    children: [
      new TextRun({
        text: titleText,
        size: 26,
        color: Color.Black,
        font: TextStyle.Semi,
        break: 1,
      }),
      new TextRun({
        text,
        size: 26,
        color: Color.Black,
        font: TextStyle.Regular,
      }),
    ],
  })

const createTechnologies = (titleText: string, technologies: string[]): Paragraph => {
  const textRunArray = [] as TextRun[]

  technologies?.forEach((category) => {
    textRunArray.push(
      new TextRun({
        text: category,
        size: 26,
        color: Color.Black,
        font: TextStyle.Regular,
        break: 1,
      }),
    )
  })

  return new Paragraph({
    indent: INDENT,
    children: [
      new TextRun({
        text: titleText,
        size: 26,
        color: Color.Black,
        font: TextStyle.Semi,
        break: 1,
      }),
      ...textRunArray,
    ],
  })
}

const createResponsibilities = (titleText: string, responsibilities: string[]): Paragraph =>
  new Paragraph({
    indent: INDENT,
    children: [
      new TextRun({
        text: titleText,
        size: 26,
        color: Color.Black,
        font: TextStyle.Semi,
        break: 1,
      }),
      ...(responsibilities
        .map((resp) => [
          new TextRun({
            text: " \u25CF ",
            size: 22,
            color: Color.Black,
            font: TextStyle.Regular,
            break: 1,
          }),
          new TextRun({
            text: resp,
            size: 26,
            color: Color.Black,
            font: TextStyle.Regular,
          }),
        ])
        .flat(Infinity) as ParagraphChild[]),
    ],
  })

export const createProjects = (projects: Project[] | undefined, isHidden: boolean): Paragraph[] => {
  const paragraphArr = [] as Paragraph[]
  if (projects?.length) {
    projects.forEach((project) => {
      const { title, description, from, to, role, categories, responsibilities, link, teamSize } = project

      paragraphArr.push(createProjectTitle(title))
      if (!isHidden && link) paragraphArr.push(createHeadingWithHyperlink("Project link: ", link))
      paragraphArr.push(createDescription("Project description ", description))
      paragraphArr.push(
        createInlineTextRun(
          "Involvement duration: ",
          `${dayjs(from).format("MMMM YYYY")}${
            dayjs(from).isSame(dayjs(to), "month")
              ? ""
              : ` - ${to === projectDatePresent ? projectDatePresent : dayjs(to).format("MMMM YYYY")}`
          }`,
        ),
      )
      paragraphArr.push(createResponsibilities("Responsibilities:", responsibilities))
      paragraphArr.push(createInlineTextRun("Project team size: ", `${teamSize}`))
      paragraphArr.push(createInlineTextRun("Project role: ", role))
      paragraphArr.push(createTechnologies("Tools & Technologies:", categories))
    })
  }

  return paragraphArr
}

export const createWordProjects = ({
  projects,
  isHidden,
}: {
  projects: Project[] | undefined
  isHidden: boolean
}): Paragraph[] => createProjects(projects, isHidden)

const useWordProjects = ({ projects }: { projects: Project[] | undefined }): { wordProjects: Paragraph[] } => {
  const { state } = useToggleSensitiveData()
  const { checked: isHidden } = state

  return {
    wordProjects: createProjects(projects, isHidden),
  }
}

export default useWordProjects
