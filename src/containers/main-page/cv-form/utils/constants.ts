import type {
  CategoryNameStateCertificates,
} from 'containers/main-page/cv-form/local-state/CategoryIdContext';
import { ROUTE } from 'common/components/routes/utils/constants';

export const enum Step {
  PersonalInformation,
  Languages,
  Skills,
  Projects,
  Certifications
}

export interface CvFormStep {
  readonly text: string;
  readonly route: string;
  readonly columns: string[];
}

export const CV_FORM_STEPS: CvFormStep[] = [
  {
    text: 'PERSONAL INFORMATION',
    route: ROUTE.DASHBOARD.PERSONAL_INFORMATION,
    columns: [
      'SUMMARY OF QUALIFICATIONS',
    ],
  },
  {
    text: 'LANGUAGES',
    route: ROUTE.DASHBOARD.LANGUAGES.MAIN,
    columns: [
      'Level',
    ],
  },
  {
    text: 'SKILLS',
    route: ROUTE.DASHBOARD.SKILLS,
    columns: [
      'Tool',
      'Experience (years)',
      'Level',
    ],
  },
  {
    text: 'PROJECTS',
    route: ROUTE.DASHBOARD.PROJECTS,
    columns: [],
  },
  {
    text: 'CERTIFICATIONS',
    route: ROUTE.DASHBOARD.CERTIFICATES,
    columns: [
      'Date',
    ],
  }];

export enum ButtonStep {
  Back = 'Back',
  Next = 'Next',
  Finish = 'Finish',
  Save = 'Save',
  Cancel = 'Cancel'
}

export const CV_SKILL_EXISTS = 'The entered Group of Skills Name already exists';

interface CVTitlesInterface {
  [key: number]: { title: string; };
}

export const CVTitles: CVTitlesInterface = {
  0: {
    title: 'Personal information',
  },
  1: {
    title: 'Add a language',
  },
  2: {
    title: 'Add your professional skills',
  },
  3: {
    title: 'Add a project',
  },
  4: {
    title: 'Add a certificate',
  },
} as const;

export const TITLE_REQUIRED = 'Job Title required';
export enum QueryKey {
  DbUser = 'db-user',
}

export const INITIAL_SERTIFICATE: CategoryNameStateCertificates = {
  name: '',
  link: '',
  id: '',
  date: new Date(),
};
