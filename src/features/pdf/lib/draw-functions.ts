import dayjs from "dayjs"
import type JsPDF from "jspdf"

import { refactorProjectSkills } from "widgets/app-bar/lib/helper-functions"
import { CV_FORM_STEPS } from "widgets/cv-form/model/constants"

import { Labels } from "features/cv-form-components/languages/ui/model/level.enum"
import { projectDatePresent } from "features/cv-form-components/projects/ui/model/constants"
import {
  INDENT_FROM_LEFT,
  LEFT_RIGHT_PADDING,
  PAGE_HEIGHT,
  PAGE_HEIGHT_FOR_BORDER,
  PAGE_WIDTH,
  PAPER_Y_INDENT,
  TOP_PADDING,
} from "features/pdf/model/const"

import type { Certificate, Project, Skill, UserLanguage } from "entities/user/model"

import Frame from "shared/assets/icons/avatar-frame.png"
import CertificationsIcon from "shared/assets/icons/certifications.png"
import LanguageIcon from "shared/assets/icons/language.png"
import LogoIcon from "shared/assets/icons/logo.png"
import MailIcon from "shared/assets/icons/mail.png"
import ProjectsIcon from "shared/assets/icons/projects.png"
import SkillsIcon from "shared/assets/icons/skills.png"
import SkypeIcon from "shared/assets/icons/skype.png"
import TelegramIcon from "shared/assets/icons/telegram.png"
import { projects as projectsTitle } from "shared/lib/constants"
import { getYearsExperience } from "shared/lib/hooks/useUserExperience"

import {
  addUbuntuFontBold,
  addUbuntuFontMedium,
  addUbuntuFontRegular,
  fromPxToMm,
  getCurrentPage,
  getRightTextX,
  setFillColorBlack,
  setFillColorBlue,
  setFillColorBlueGray,
  setFillColorGray,
  setTextColorBlack,
  setTextColorBlue,
  setTextColorGray,
} from "./helper-functions"

type Regions = { callback: () => void; h: number }[]

let y = 1

let infoY = 0
let infoStartPage = 0
let infoEndPage = 0

let languageY = 0
let languageStartPage = 0
let languageEndPage = 0

let skillsY = 0
let skillsStartPage = 0
let skillsEndPage = 0

let projectsY = 0
let projectsStartPage = 0
let projectsEndPage = 0

let certificationsY = 0
let certificationsStartPage = 0
let certificationsEndPage = 0

const iconCircleSize = fromPxToMm(30)
const iconSize = fromPxToMm(24)

const SKILL_TEXT_LENGTH = 170

function newPage(doc: JsPDF): void {
  doc.addPage()
  y = PAPER_Y_INDENT
}

function iterateRegions(regions: Regions, doc: JsPDF): void {
  regions.forEach((region) => {
    if (region.h + y > PAGE_HEIGHT - PAPER_Y_INDENT) newPage(doc)
    region.callback()
  })
}

function drawIcon(doc: JsPDF, icon: string, iy: number, ix: number): void {
  doc.setFillColor(246, 247, 249)
  doc.circle(ix * 2, iy, iconCircleSize / 2, "F")
  doc.addImage(icon, "png", ix * 2 - 3, iy - 3, iconSize, iconSize)
}

function drawBorder(
  doc: JsPDF,
  { borderY, startPage, endPage }: { borderY: number; startPage: number; endPage: number },
): void {
  doc.setPage(startPage)
  if (startPage === endPage) {
    doc.setDrawColor(221, 221, 221)
    doc.roundedRect(INDENT_FROM_LEFT, borderY, 191, y - borderY, 1, 1)
  } else {
    for (let i = startPage; i <= endPage; i += 1) {
      doc.setPage(i)
      doc.setDrawColor(221, 221, 221)
      if (i === startPage) {
        doc.roundedRect(INDENT_FROM_LEFT, borderY, 191, PAGE_HEIGHT_FOR_BORDER - borderY, 1, 1)
      } else if (i === endPage) doc.roundedRect(INDENT_FROM_LEFT, -2, 191, y + 4, 1, 1)
      else doc.roundedRect(INDENT_FROM_LEFT, -2, 191, PAGE_HEIGHT_FOR_BORDER + 10, 1, 1)
    }
  }

  doc.setPage(endPage)
  y += 6
}

function drawLanguageLevel(doc: JsPDF, ix: number, iy: number, i: number, level: keyof typeof Labels): void {
  if (i + 1 <= Labels[level]) {
    setFillColorBlue(doc)
  } else {
    setFillColorBlueGray(doc)
  }
  doc.roundedRect(ix + 2, iy - 2.5, 10, 4.5, 0.5, 0.5, "F")
}

export function drawTopBox(doc: JsPDF): void {
  doc.setDrawColor(0)
  setFillColorBlue(doc)
  doc.rect(1, y, 208, 44, "F") // filled red square with black borders
}

export async function drawLogo(doc: JsPDF): Promise<void> {
  y = TOP_PADDING + 2
  doc.addImage(LogoIcon, "PNG", LEFT_RIGHT_PADDING, y, fromPxToMm(193.2), fromPxToMm(44.8))
}

export async function drawUserMailAndSkype(props: {
  doc: JsPDF
  pageWidth: number
  isHidden: boolean
  email?: string
  skype?: string
  telegram?: string
}): Promise<void> {
  const { isHidden, doc, pageWidth, email, telegram, skype } = props
  if (isHidden) return
  const mailName = email || ""
  const skypeName = skype || ""
  const telegramName = telegram || ""

  const mailNameWidth = doc.getStringUnitWidth(mailName) * 4.5
  const telegramNameWidth = doc.getStringUnitWidth(telegramName) * 4.5
  const skypeNameWidth = doc.getStringUnitWidth(skypeName) * 4.5
  const mailNameHeight = 6
  const startX = pageWidth - LEFT_RIGHT_PADDING / 1.5 - Math.max(mailNameWidth, telegramNameWidth, skypeNameWidth)

  const imgSize = fromPxToMm(16)

  addUbuntuFontBold(doc)

  doc.setFontSize(11)
  doc.setTextColor(255)
  doc.text(mailName, startX, y)
  if (skypeName) {
    y += mailNameHeight
    doc.text(skypeName, startX, y)
  }
  if (telegramName) {
    y += mailNameHeight
    doc.text(telegramName, startX, y)
  }

  doc.addImage(MailIcon, startX - 6, TOP_PADDING - 1.5, imgSize, imgSize)
  let c = TOP_PADDING + imgSize + 0.5
  if (skypeName) {
    doc.addImage(SkypeIcon, startX - 6, c, imgSize, imgSize)
    c += imgSize + 2
  }
  if (telegramName) {
    doc.addImage(TelegramIcon, startX - 6, c, imgSize, imgSize)
  }
}

export async function drawPersonalInformation(props: {
  doc: JsPDF
  name: string
  isHidden: boolean
  photo?: string
  summary?: string
  title?: string
  projects?: Project[]
}): Promise<void> {
  const { doc, name, title, summary, projects, photo, isHidden } = props
  y = 26
  infoY = y
  infoStartPage = getCurrentPage(doc)

  const experience = getYearsExperience(projects)

  const imgSize = fromPxToMm(80)

  doc.setDrawColor(0)
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(LEFT_RIGHT_PADDING, y, PAGE_WIDTH - LEFT_RIGHT_PADDING * 2, 44, 1, 1, "F")

  let x = LEFT_RIGHT_PADDING + 7
  if (photo && !isHidden) {
    const img = new Image()
    img.src = photo

    doc.addImage(img, "png", x, y + 7, imgSize, imgSize)
    doc.addImage(Frame, "png", x, y + 7, imgSize, imgSize)
    x += imgSize + 8
  }

  addUbuntuFontRegular(doc)

  doc.setFontSize(18)
  addUbuntuFontBold(doc)

  y += 8
  setTextColorBlack(doc)

  doc.text(name, x, y + 4)

  if (experience) {
    setTextColorBlue(doc)
    doc.setFontSize(15)
    setTextColorBlue(doc)
    addUbuntuFontRegular(doc)
    doc.text(experience, getRightTextX(doc, experience) - 12, y + 3)
    setTextColorBlack(doc)
    addUbuntuFontRegular(doc)
    doc.setFontSize(12)
    setTextColorBlack(doc)
    doc.text("Work Experience", getRightTextX(doc, "Work Experience") - 5, y + 9)
  }

  y += 8

  doc.setFontSize(15)
  y += 6
  addUbuntuFontRegular(doc)
  setTextColorBlack(doc)
  const splitTitle: string[] = doc.splitTextToSize(title || "", 120)
  splitTitle.forEach((row) => {
    doc.text(row, x, y - 4)
    y += 6
  })

  doc.setFontSize(13)
  y += 6
  setTextColorBlack(doc)
  addUbuntuFontBold(doc)
  doc.text(CV_FORM_STEPS[0].columns[0], LEFT_RIGHT_PADDING + 6, y + 3)
  addUbuntuFontRegular(doc)
  y += 6

  if (summary) {
    const regions: { callback: () => void; h: number }[] = []
    const splitDescription: string[] = doc.splitTextToSize(summary, 180)
    splitDescription.forEach((row) => {
      regions.push({
        callback: (): void => {
          setTextColorBlack(doc)
          doc.text(row, INDENT_FROM_LEFT + 6, y + 3)
          y += 6
        },
        h: 6,
      })
    })

    iterateRegions(regions, doc)
  }

  infoEndPage = getCurrentPage(doc)
  y += 2

  drawBorder(doc, {
    borderY: infoY,
    endPage: infoEndPage,
    startPage: infoStartPage,
  })
}

export async function drawLanguages(doc: JsPDF, languages: UserLanguage[] = []): Promise<void> {
  languageY = y
  languageStartPage = getCurrentPage(doc)
  y += PAPER_Y_INDENT

  const regions: Regions = []
  const levelText = CV_FORM_STEPS[1].columns[0]

  drawIcon(doc, LanguageIcon, y + 3, INDENT_FROM_LEFT)
  y += 1
  setTextColorBlack(doc)

  addUbuntuFontBold(doc)
  doc.setFontSize(13)
  doc.text(CV_FORM_STEPS[1].text, INDENT_FROM_LEFT + iconCircleSize + 6, y + 4)
  y += iconCircleSize + 6
  if (languages.length) {
    setTextColorGray(doc)
    addUbuntuFontRegular(doc)
    doc.text(levelText, (PAGE_WIDTH / 3) * 2 + PAGE_WIDTH / 3 / 3, y - (iconCircleSize + 2))
    languages.forEach((item) => {
      regions.push({
        callback: (): void => {
          setFillColorBlue(doc)
          doc.circle(INDENT_FROM_LEFT + 8, y, 0.7, "F")
          setTextColorBlack(doc)
          doc.text(item.name, INDENT_FROM_LEFT + 11, y + 1.5)
          let x = INDENT_FROM_LEFT + 50
          for (let i = 0; i < 6; i += 1) {
            drawLanguageLevel(doc, x, y, i, item.level)
            x += 11
          }
          x += 4
          setTextColorBlack(doc)
          doc.text(item.level, x + 12, y + 1.3)
          y += 6
        },
        h: 6,
      })
    })
  }

  iterateRegions(regions, doc)
  languageEndPage = getCurrentPage(doc)
  y += 2

  drawBorder(doc, {
    borderY: languageY,
    endPage: languageEndPage,
    startPage: languageStartPage,
  })
}

export async function drawSkills(doc: JsPDF, skills: Skill[] = []): Promise<void> {
  const regions: Regions = []

  const experienceText = CV_FORM_STEPS[2].columns[1]
  const levelText = CV_FORM_STEPS[2].columns[2]

  regions.push({
    callback: (): void => {
      skillsY = y
      skillsStartPage = getCurrentPage(doc)
      y += PAPER_Y_INDENT
      drawIcon(doc, SkillsIcon, y + 3, INDENT_FROM_LEFT)
      y += 2
      setTextColorBlack(doc)
      addUbuntuFontBold(doc)
      doc.setFontSize(13)
      doc.text(CV_FORM_STEPS[2].text, INDENT_FROM_LEFT + iconCircleSize + 6, y + 3)
      setTextColorGray(doc)
      addUbuntuFontRegular(doc)
      doc.text(experienceText, PAGE_WIDTH / 3 + PAGE_WIDTH / 3 / 3 - 15, y + 2.5)
      doc.text(levelText, (PAGE_WIDTH / 3) * 2 + PAGE_WIDTH / 3 / 3, y + 2.5)
      y += iconCircleSize - 5
    },
    h: iconCircleSize + 2,
  })

  if (skills.length) {
    skills.forEach((skill) => {
      const splitSkillName = doc.splitTextToSize(skill.name.toUpperCase(), SKILL_TEXT_LENGTH)
      regions.push({
        callback: (): void => {
          y += 4
        },
        h: 4 + 6,
      })
      regions.push({
        callback: (): void => {
          setTextColorBlue(doc)
          splitSkillName.forEach((row: string) => {
            doc.text(row, INDENT_FROM_LEFT + 6, y + 8)
            y += 6
          })
          y += 4
          setFillColorGray(doc)
          doc.line(INDENT_FROM_LEFT + 5, y, PAGE_WIDTH - INDENT_FROM_LEFT - 5, y)
          y += 2
        },
        h: 6 + splitSkillName.length * 6,
      })

      if (skill?.tools?.length) {
        skill.tools.forEach((tool) => {
          if (!tool.name) return
          const splitToolName = doc.splitTextToSize(tool.name, (PAGE_WIDTH - 10) / 3)
          regions.push({
            callback: (): void => {
              setTextColorBlack(doc)
              setFillColorBlue(doc)
              doc.circle(INDENT_FROM_LEFT + 8, y + 4.5, 0.7, "F")
              const experience = tool.experience.toString()
              doc.text(experience, PAGE_WIDTH / 2 - 7 - experience.length, y + 6)
              doc.text(tool?.level || "", (PAGE_WIDTH / 3) * 2 + PAGE_WIDTH / 3 / 3 - 20, y + 6)
              splitToolName.forEach((row: string) => {
                doc.text(row, INDENT_FROM_LEFT + 11, y + 6)
                y += 6
              })
            },
            h: splitToolName.length * 6,
          })
        })
      }
    })
  }

  iterateRegions(regions, doc)
  skillsEndPage = getCurrentPage(doc)
  y += 6

  drawBorder(doc, {
    borderY: skillsY,
    endPage: skillsEndPage,
    startPage: skillsStartPage,
  })
}

/* eslint-disable no-loop-func */
export function drawProjects(props: { doc: JsPDF; isHidden: boolean; projects?: Project[]; skills?: Skill[] }): void {
  const { doc, isHidden, projects = [], skills = [] } = props
  const regions: Regions = []

  regions.push({
    callback: (): void => {
      addUbuntuFontRegular(doc)

      projectsY = y
      projectsStartPage = getCurrentPage(doc)
      y += PAPER_Y_INDENT

      drawIcon(doc, ProjectsIcon, y + 3, INDENT_FROM_LEFT)
      y += 2
      setTextColorBlack(doc)
      addUbuntuFontBold(doc)
      doc.setFontSize(13)
      doc.text(CV_FORM_STEPS[3].text, INDENT_FROM_LEFT + iconCircleSize + 6, y + 3)
      addUbuntuFontRegular(doc)
      y += iconCircleSize + 2
    },
    h: iconCircleSize + 4,
  })

  doc.setFontSize(15)

  if (projects.length) {
    refactorProjectSkills(skills, projects)?.forEach((project, projectIndex) => {
      const {
        title = "",
        description = "",
        from = "",
        to = "",
        teamSize = 0,
        responsibilities,
        role = "",
        link,
        categories,
      } = project

      // #region add blue dots & title name
      const splitTitle: string[] = doc.splitTextToSize(title, 170)
      regions.push({
        callback: (): void => {
          setFillColorBlue(doc)
          doc.circle(INDENT_FROM_LEFT + 7, y + 3.5, 1, "F")
          addUbuntuFontMedium(doc)
          setTextColorBlack(doc)
          doc.setFontSize(13)
          splitTitle.forEach((row) => {
            doc.text(row.toUpperCase(), INDENT_FROM_LEFT + 10, y + 5)
            y += 6
          })
          y += 5
        },
        h: 5 + splitTitle.length * 6,
      })
      // #endregion

      // #region add project link
      if (link && !isHidden) {
        splitTitle.forEach((row, index) => {
          const isLast = index + 1 === splitTitle.length
          const height = isLast ? 8 : 6
          regions.push({
            callback: (): void => {
              if (index === 0) {
                addUbuntuFontMedium(doc)
                setTextColorBlack(doc)
                doc.text(projectsTitle.productLink, INDENT_FROM_LEFT + 6, y + 6)
              }
              const linkX = (doc.getStringUnitWidth(projectsTitle.productLink) / 4) * 25.6
              setTextColorBlue(doc)
              addUbuntuFontRegular(doc)
              doc.textWithLink(isLast ? `${row} link` : row, linkX + 6, y + 6, { url: link })
              y += height
            },
            h: height,
          })
        })
      }
      // #endregion

      // #region add project description
      regions.push({
        callback: (): void => {
          addUbuntuFontMedium(doc)
          setTextColorBlack(doc)
          doc.setFontSize(12)
          doc.text(projectsTitle.descrTitle, INDENT_FROM_LEFT + 6, y + 6)
          y += 8
        },
        h: 8,
      })

      const splitDescription: string[] = doc.splitTextToSize(description, 220)

      splitDescription.forEach((row) => {
        regions.push({
          callback: (): void => {
            addUbuntuFontRegular(doc)
            setTextColorGray(doc)
            doc.text(row, INDENT_FROM_LEFT + 6, y + 6)
            y += 6
          },
          h: 6,
        })
      })
      // #endregion

      // #region add involvement duration
      regions.push({
        callback: (): void => {
          addUbuntuFontMedium(doc)
          setTextColorBlack(doc)
          doc.text(projectsTitle.duration, INDENT_FROM_LEFT + 6, y + 8)
          addUbuntuFontRegular(doc)
          setTextColorGray(doc)

          let fromTo = dayjs(from).format("MMMM YYYY")
          if (!dayjs(from).isSame(dayjs(to), "month")) {
            const toDays = to === projectDatePresent ? to : dayjs(to || new Date().toString()).format("MMMM YYYY")
            fromTo += ` - ${toDays}`
          }

          const fromToX = (doc.getStringUnitWidth(projectsTitle.duration) / 4.8) * 25.6
          doc.text(fromTo, fromToX + 6, y + 8)
          y += 10
        },
        h: 10,
      })
      // #endregion

      // #region add responsibilities
      regions.push({
        callback: (): void => {
          addUbuntuFontMedium(doc)
          setTextColorBlack(doc)
          doc.text(projectsTitle.respTitle, INDENT_FROM_LEFT + 6, y + 6)
          addUbuntuFontRegular(doc)
          y += 6
        },
        h: 6,
      })

      setTextColorGray(doc)
      responsibilities.forEach((responsibility, index) => {
        const splitResponsibility = doc.splitTextToSize(responsibility, 220)
        splitResponsibility.forEach((row: string, i: number) => {
          regions.push({
            callback: (): void => {
              setFillColorBlack(doc)
              if (i === 0) doc.circle(INDENT_FROM_LEFT + 8, y + 4.5, 0.7, "F")
              doc.text(row, INDENT_FROM_LEFT + 11, y + 6)
              y += 6
            },
            h: 6,
          })
        })
        if (index === responsibilities.length - 1) {
          regions.push({
            callback: (): void => {
              y += 4
            },
            h: 4,
          })
        }
      })
      // #endregion

      // #region add team size
      regions.push({
        callback: (): void => {
          addUbuntuFontMedium(doc)
          setTextColorBlack(doc)
          doc.text(projectsTitle.sizeTitle, INDENT_FROM_LEFT + 6, y + 6)
          const teamSizeX = (doc.getStringUnitWidth(projectsTitle.sizeTitle) / 4.6) * 25.6
          addUbuntuFontRegular(doc)
          setTextColorGray(doc)
          doc.text(`${teamSize}`, teamSizeX + 5, y + 6)
          y += 10
        },
        h: 10,
      })
      // #endregion

      // #region add project role
      regions.push({
        callback: (): void => {
          addUbuntuFontMedium(doc)
          setTextColorBlack(doc)
          doc.text(projectsTitle.projectRole, INDENT_FROM_LEFT + 6, y + 6)
          const roleX = (doc.getStringUnitWidth(projectsTitle.projectRole) / 4) * 25.6
          addUbuntuFontRegular(doc)
          setTextColorGray(doc)
          doc.text(role, roleX + 5, y + 6)
          y += 10
        },
        h: 10,
      })
      // #endregion

      // #region add Tools & Technologies
      regions.push({
        callback: (): void => {
          addUbuntuFontMedium(doc)
          setTextColorBlack(doc)
          doc.text(projectsTitle.toolsAndTechs, INDENT_FROM_LEFT + 6, y + 6)
          addUbuntuFontRegular(doc)
          y += 6
        },
        h: 6,
      })

      categories.forEach((category) => {
        const splitResult: string[] = doc.splitTextToSize(category, 180).filter((val: string) => val)

        splitResult.forEach((row) => {
          regions.push({
            callback: (): void => {
              setTextColorGray(doc)
              doc.text(row, INDENT_FROM_LEFT + 6, y + 6)
              y += 6
            },
            h: 6,
          })
        })
      })
      // #endregion

      // padding between projects
      regions.push({
        callback: (): void => {
          if (projectIndex + 1 !== projects.length) {
            doc.line(INDENT_FROM_LEFT + 5, y + 2, PAGE_WIDTH - INDENT_FROM_LEFT - 5, y + 2)
          }
          y += 6
        },
        h: 6,
      })
    })
  }

  iterateRegions(regions, doc)

  projectsEndPage = getCurrentPage(doc)

  drawBorder(doc, {
    borderY: projectsY,
    endPage: projectsEndPage,
    startPage: projectsStartPage,
  })
}

export function drawCertifications(doc: JsPDF, certificates: Certificate[] = []): void {
  const regions = []
  if (!certificates?.length) return

  regions.push({
    callback: (): void => {
      addUbuntuFontRegular(doc)

      certificationsY = y
      certificationsStartPage = getCurrentPage(doc)
      y += PAPER_Y_INDENT

      drawIcon(doc, CertificationsIcon, y + 3, INDENT_FROM_LEFT)
      y += 2
      setTextColorBlack(doc)
      addUbuntuFontBold(doc)
      doc.setFontSize(13)
      doc.text(CV_FORM_STEPS[4].text, INDENT_FROM_LEFT + iconCircleSize + 6, y + 3)
      addUbuntuFontRegular(doc)
      y += iconCircleSize + 2
    },
    h: iconCircleSize + 4,
  })

  regions.push({
    callback: (): void => {
      const dateText = CV_FORM_STEPS[4].columns[0]

      doc.setFontSize(13)
      setTextColorGray(doc)
      doc.text(dateText, (PAGE_WIDTH / 3) * 2 + PAGE_WIDTH / 3 / 3, y + 4)
      y += 6
    },
    h: 10,
  })

  // eslint-disable-next-line no-restricted-syntax
  for (const certificate of certificates) {
    const { link, name, date } = certificate

    const splitSertificate: string[] = doc.splitTextToSize(name, 100)

    splitSertificate.forEach((row, index) => {
      regions.push({
        callback: (): void => {
          if (index === 0) {
            const formattedDate = dayjs(date).format("MMMM YYYY")

            setFillColorBlue(doc)
            doc.circle(INDENT_FROM_LEFT + 10, y + 2.5, 1, "F")
            setTextColorBlack(doc)
            doc.text(formattedDate, 145, y + 4)
          }
          setTextColorBlue(doc)
          doc.textWithLink(row, INDENT_FROM_LEFT + 13, y + 4, { url: link })
          y += 6
        },
        h: 10,
      })
    })

    regions.push({
      callback: (): void => {
        y += 2
      },
      h: 2,
    })
  }

  iterateRegions(regions, doc)

  certificationsEndPage = getCurrentPage(doc)

  // padding for border
  y += 2

  drawBorder(doc, {
    borderY: certificationsY,
    endPage: certificationsEndPage,
    startPage: certificationsStartPage,
  })
}

export function resetVars(): void {
  y = 1

  infoY = 0
  infoStartPage = 0
  infoEndPage = 0

  languageY = 0
  languageStartPage = 0
  languageEndPage = 0

  skillsY = 0
  skillsStartPage = 0
  skillsEndPage = 0

  projectsY = 0
  projectsStartPage = 0
  projectsEndPage = 0

  certificationsY = 0
  certificationsStartPage = 0
  certificationsEndPage = 0
}
