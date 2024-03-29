import React from 'react';

export type SkillIdAction = { type: 'set' | 'reset', id: string | null; };
export type SkillIdState = { id: string | null; };
export type SkillIdDispatch = (action: SkillIdAction) => void;
export type SkillIdContextType = { state: SkillIdState; dispatch: SkillIdDispatch; };

export const SkillByIdContext = React.createContext<{
  state: SkillIdState,
  dispatch: SkillIdDispatch;
} | undefined>(undefined);

export type CategoryNameActionLanguage = {
  type: 'set' | 'reset',
  language: string | null;
  level: string | null;
};
export type CategoryNameStateLanguage = { language: string | null; level: string | null; };
export type CategoryNameDispatchLanguage = (action: CategoryNameActionLanguage) => void;
export type CategoryNameContextTypeLanguage = {
  state: CategoryNameStateLanguage;
  dispatch: CategoryNameDispatchLanguage;
};

export const CategoryByIdContextLanguage = React.createContext<{
  state: CategoryNameStateLanguage,
  dispatch: CategoryNameDispatchLanguage;
} | undefined>(undefined);

export type CategoryNameActionCertificates = {
  type: 'set' | 'reset',
  name: string;
  link: string | undefined;
  id: string;
  date: Date;
};
export type CategoryNameStateCertificates = {
  name: string;
  link: string | undefined;
  id: string;
  date: Date;
};

export type CategoryNameDispatchCertificates = (action: CategoryNameActionCertificates) => void;

export type CategoryNameContextTypeCertificates = {
  state: CategoryNameStateCertificates;
  dispatch: CategoryNameDispatchCertificates;
};

export const CategoryByIdContextCertificates = React.createContext<{
  state: CategoryNameStateCertificates,
  dispatch: CategoryNameDispatchCertificates;
} | undefined>(undefined);
