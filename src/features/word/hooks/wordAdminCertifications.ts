import dayjs from "dayjs"
import { ExternalHyperlink, Paragraph, TextRun } from "docx"
import type { Certificate } from "entities/user/model"
import { INDENT, TextStyle } from "features/word/helper-functions"
import { Color } from "shared/config/theme"

const wordAdminCertifications = ({
  certificates,
}: {
  certificates: Certificate[] | undefined
}): {
  certifications: Paragraph[]
} => {
  const createProjects = (): Paragraph[] => {
    const paragraphArr = [] as Paragraph[]
    if (certificates?.length) {
      certificates.forEach((certificate) => {
        const { link, name, date } = certificate

        paragraphArr.push(
          new Paragraph({
            indent: INDENT,
            children: [
              new TextRun({
                text: `${name} (passed at ${dayjs(date).format("MMMM YYYY")}): `,
                size: 26,
                color: Color.Black,
                font: TextStyle.Semi,
                break: 1,
              }),
              new ExternalHyperlink({
                link,
                children: [
                  new TextRun({
                    text: "See certificate",
                    style: "Hyperlink",
                    size: 26,
                    font: TextStyle.Semi,
                  }),
                ],
              }),
            ],
          }),
        )
      })
    }

    return paragraphArr
  }

  return {
    certifications: createProjects(),
  }
}

export default wordAdminCertifications
