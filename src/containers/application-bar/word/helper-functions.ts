import {
  BorderStyle,
  ExternalHyperlink,
  Header,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  ImageRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TabStopPosition,
  TabStopType,
  TextRun,
  VerticalPositionAlign,
  VerticalPositionRelativeFrom,
  WidthType,
} from 'docx';

import type { Skill, UserLanguage } from 'common/models/User';
import { Color } from 'common/theme/maps/config';

export const INDENT = {
  start: '12mm',
} as const;

export const convertFromPathImage = async (imageUri: string): Promise<ArrayBuffer> => {
  const response = await fetch(imageUri);
  return (await response.blob()).arrayBuffer();
};

export enum TextStyle {
  Semi = 'Montserrat Semibold',
  Regular = 'Montserrat',
}

export const createText = (
  {
    text, font, breaking, size, bold,
  }: { text: string; font: `${TextStyle}`; breaking?: number; size?: number; bold?: boolean; },
): TextRun => new TextRun({
  size: size || 26,
  color: Color.Black,
  font,
  bold,
  text,
  break: breaking,
});

export const createRow = (
  {
    text, font, breaking, size, bold,
  }: { text: string, font: `${TextStyle}`, breaking?: number; size?: number; bold?: boolean; },
): Paragraph => new Paragraph({
  indent: INDENT,
  children: [createText({
    text, font, breaking, size, bold,
  })],
});

export const createSemiTitle = (text: string): Paragraph => new Paragraph({
  indent: INDENT,
  children: [
    new TextRun({
      text,
      size: 30,
      color: Color.Black,
      font: TextStyle.Semi,
      break: 1,
    }),
  ],
});

export const createSummary = (
  text: string,
): Paragraph => {
  const splitedText = text?.split('\n');
  return new Paragraph({
    indent: INDENT,
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX,
      },
    ],
    children: [
      ...splitedText.map((l) => new TextRun({
        text: l,
        size: 26,
        font: TextStyle.Regular,
        break: 1,
      })),
    ],
  });
};

export const createSectionTitle = (text: string): Paragraph => new Paragraph({
  indent: INDENT,
  tabStops: [
    {
      type: TabStopType.RIGHT,
      position: TabStopPosition.MAX,
    },
  ],
  children: [
    new TextRun({
      text,
      size: 48,
      color: Color.BlueLight,
      break: 1,
      bold: true,
      font: TextStyle.Semi,
    }),
  ],
});

export const createHeader = (
  { image }: { image: ArrayBuffer; },
): Header => new Header({
  children: [
    new Paragraph({
      children: [
        new ImageRun({
          data: image,
          transformation: {
            width: 800,
            height: 96,
          },
          floating: {
            margins: {
              top: 0,
            },
            horizontalPosition: {
              align: HorizontalPositionAlign.INSIDE,
              offset: 1,
              relative: HorizontalPositionRelativeFrom.INSIDE_MARGIN,
            },
            behindDocument: true,
            verticalPosition: {
              align: VerticalPositionAlign.INSIDE,
              offset: 1,
              relative: VerticalPositionRelativeFrom.TOP_MARGIN,
            },
          },
        }),
      ],
    }),

  ],
});

export const createNameAndTitle = (
  { title, fullName }: { title: string; fullName: string; },
): Paragraph[] => [new Paragraph({
  indent: INDENT,
  children: [
    new TextRun({
      text: title,
      size: 36,
      color: Color.Black,
      font: TextStyle.Regular,
      bold: true,
      break: 2,

    }),
  ],
}),
new Paragraph({
  indent: INDENT,
  children: [
    new TextRun({
      text: fullName,
      size: 32,
      color: Color.Black,
      font: TextStyle.Regular,
      bold: true,
    }),
  ],
})];

export const addRowWithHeading = (
  { heading, text }: { heading: string, text: string; },
): Paragraph => new Paragraph({
  indent: INDENT,
  children: [
    createText({
      text: heading, font: TextStyle.Regular, bold: true, breaking: 1,
    }),
    createText({
      text, font: TextStyle.Regular, bold: true, size: 30,
    }),
  ],
});

export const addRowWithHeadingWithRegularValue = (
  { heading, text }: { heading: string, text: string; },
): Paragraph => new Paragraph({
  indent: INDENT,
  children: [
    createText({
      text: heading, font: TextStyle.Regular, bold: true,
    }),
    createText({
      text, font: TextStyle.Regular,
    }),
  ],
});

export const addContactInformation = (
  { heading, text }: { heading: string, text: string; },
): Paragraph => new Paragraph({
  indent: INDENT,
  children: [
    createText({
      text: heading, font: TextStyle.Regular,
    }),
    createText({
      text, font: TextStyle.Regular,
    }),
  ],
});

export const addLanguages = (languages: UserLanguage[]): Paragraph[] => {
  const arr = [] as Paragraph[];
  if (languages) {
    languages.forEach(({ level, name }) => {
      arr.push(addRowWithHeadingWithRegularValue({
        heading: `Speaking ${name}: `,
        text: level,
      }));
    });
  }
  return arr;
};

export const addSkills = (skills: Skill[]): Table | Paragraph => {
  const tableRows = [] as TableRow[];
  if (!skills?.length) return new Paragraph('');

  const borderOptions = {
    top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  };

  const createCell = (text?: string, bold?: boolean): TableCell => new TableCell({
    borders: borderOptions,
    children: text ? [new Paragraph(
      {
        children: [
          createText({
            text,
            font: TextStyle.Regular,
            bold,
          }),
        ],
      },
    )] : [],
    margins: {
      left: 150,
      bottom: 100,
      marginUnitType: WidthType.DXA,
    },
  });

  skills.forEach((skill) => {
    tableRows.push(new TableRow({
      children: [
        createCell(`${skill.name}`, true),
        createCell(),
        createCell(),
      ],
    }));
    skill.tools.forEach((tool) => {
      tableRows.push(new TableRow({
        children: [
          createCell(`${tool.name}`),
          createCell(`${tool.experience}`),
          createCell(`${tool.level}`),
        ],
      }));
    });
  });

  return new Table({
    indent: {
      size: 600,
      type: WidthType.DXA,
    },
    width: {
      size: 100,
      type: WidthType.AUTO,
    },
    columnWidths: [3000, 3000, 3000],
    borders: borderOptions,
    rows: [
      new TableRow({
        children: [
          createCell('Skill', true),
          createCell('Experience (years)', true),
          createCell('Level', true),
        ],
      }),
      ...tableRows,
    ],
  });
};

export const createHeadingWithHyperlink = (
  name: string,
  link: string,
): Paragraph => new Paragraph({
  indent: { start: '12mm' },
  children: [
    new TextRun({
      text: name,
      size: 26,
      color: Color.Black,
      font: TextStyle.Semi,
      break: 1,
    }),
    new ExternalHyperlink({
      link: link ?? 'NDA',
      children: [
        new TextRun({
          text: link,
          style: link ? 'Hyperlink' : undefined,
          size: 26,
          font: TextStyle.Semi,
        }),
      ],
    }),
  ],
});
