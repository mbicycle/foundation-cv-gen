import { useMemo } from 'react';
import {
  Document, Packer,
  Paragraph,
} from 'docx';
import { saveAs } from 'file-saver';

import { getFileName, refactorProjectSkills } from 'containers/application-bar/helper-functions';
import {
  addContactInformation,
  addLanguages,
  addRowWithHeading,
  addSkills,
  convertFromPathImage,
  createHeader,
  createNameAndTitle,
  createSectionTitle,
  createSemiTitle,
  createSummary,
} from 'containers/application-bar/word/helper-functions';
import useWordProjects from 'containers/application-bar/word/hooks/createWordProjects';
import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { useMsGraph } from 'containers/main-page/preview/lib/query-hooks';
import headerPic from 'common/assets/cv-gen-docx-header.png';
import { useToggleSensitiveData } from 'common/context';
import { useUserExperience } from 'common/utils/hooks/useUserExperience';

import useWordCertifications from './useWordCertifications';

export const useSaveWordFile = (): { handleSave: VoidFunction; } => {
  const { data: user } = useUserFromDb();
  const { data: msGraphData } = useMsGraph({ params: ['jobTitle', 'givenName', 'surname'] });
  const { givenName } = msGraphData ?? {};
  const { surname } = msGraphData ?? {};
  const name = givenName ? `${givenName} ${surname}` : `${user?.firstName} ${user?.lastName}`;

  const { state } = useToggleSensitiveData() ?? {};
  const yearsExperinence = useUserExperience();

  const { checked } = state;
  const { jobTitle } = msGraphData ?? {};
  const {
    title,
    summary,
    certificates,
    projects,
    email,
    skype,
    telegram,
    languages,
    skills,
  } = user ?? {};

  const { wordProjects } = useWordProjects({ projects: refactorProjectSkills(skills, projects) });
  const { certifications } = useWordCertifications({ certificates });

  const nameIfSenstiveDataHidden = useMemo(() => {
    const userName = {
      first: msGraphData?.givenName ? `${givenName}` : `${user?.firstName}`,
      last: msGraphData?.givenName ? `${surname}` : `${user?.lastName}`,
    };

    if (userName.first) {
      return checked ? `${userName.first} ${userName.last[0]}.` : `${userName.first} ${userName.last}`;
    }
    return '';
  }, [msGraphData?.givenName, givenName, user?.firstName, user?.lastName, surname, checked]);

  function embedNAmeAndSkype(): Paragraph[] {
    const result = [];
    if (!checked) {
      result.push(addContactInformation({ heading: '', text: '' }));
      result.push(addContactInformation({ heading: 'E-mail: ', text: email ?? '' }));
      if (skype) result.push(addContactInformation({ heading: 'Skype: ', text: skype ?? '' }));
      if (telegram) result.push(addContactInformation({ heading: 'Telegram: ', text: telegram ?? '' }));
    }
    return result;
  }

  const handleSave = async (): Promise<void> => {
    const image = await convertFromPathImage(headerPic);

    let doc: Document | null = new Document({
      description: new Date().toString(),
      sections: [
        {
          headers: {
            default: createHeader({ image }),
          },
          children: [
            ...createNameAndTitle({ fullName: nameIfSenstiveDataHidden, title: title || jobTitle }),
            addRowWithHeading({ heading: 'Work Experience: ', text: `${yearsExperinence} years` }),

            ...embedNAmeAndSkype(),

            createSemiTitle('SUMMARY OF QUALIFICATIONS'),
            createSummary(summary ?? ''),

            createSectionTitle('Languages'),
            new Paragraph({}),
            ...addLanguages(languages ?? []),

            createSectionTitle('Skills'),
            new Paragraph({}),
            addSkills(skills ?? []),
            createSectionTitle('Projects'),
            ...wordProjects,
            certifications?.length ? createSectionTitle('Certificates') : new Paragraph({}),
            ...certifications,
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, getFileName(name || `${user?.firstName} ${user?.lastName}`, checked));
      doc = null;
    });
  };

  return {
    handleSave,
  };
};
