import { INITIAL_SERTIFICATE } from 'containers/main-page/cv-form/utils/constants';

import type {
  CategoryNameActionCertificates,
  CategoryNameActionLanguage,
  CategoryNameStateCertificates,
  CategoryNameStateLanguage,
  SkillIdAction,
  SkillIdState,
} from './CategoryIdContext';

export function skillIdReducer(state: SkillIdState, action: SkillIdAction): SkillIdState {
  const copy = { ...state };

  if (action.type === 'set') {
    copy.id = action.id;
  } else {
    copy.id = null;
  }

  return copy;
}

export function languageReducer(
  state: CategoryNameStateLanguage,
  action: CategoryNameActionLanguage,
): CategoryNameStateLanguage {
  const copy = { ...state };

  if (action.type === 'set') {
    copy.language = action.language;
    copy.level = action.level;
  } else {
    copy.language = null;
    copy.level = null;
  }

  return copy;
}

export function certificatesReducer(
  state: CategoryNameStateCertificates,
  action: CategoryNameActionCertificates,
): CategoryNameStateCertificates {
  let copy: CategoryNameStateCertificates = { ...state };

  if (action.type === 'set') {
    copy = { ...action };
  } else {
    copy = { ...INITIAL_SERTIFICATE };
  }

  return copy;
}
