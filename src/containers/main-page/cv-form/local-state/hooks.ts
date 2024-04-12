import { useContext } from "react"

import type {
  CategoryNameContextTypeCertificates,
  CategoryNameContextTypeLanguage,
  SkillIdContextType,
} from "./CategoryIdContext"
import { CategoryByIdContextCertificates, CategoryByIdContextLanguage, SkillByIdContext } from "./CategoryIdContext"

export function useSkillIdContext(): SkillIdContextType {
  const context = useContext(SkillByIdContext)

  if (context === undefined) {
    throw new Error("CategoryNameContext must be used within a CvFormProvider")
  }

  return context
}

export function useCategoryLanguageContext(): CategoryNameContextTypeLanguage {
  const context = useContext(CategoryByIdContextLanguage)

  if (context === undefined) {
    throw new Error("CategoryNameContextLanguage must be used within a CvFormProvider")
  }

  return context
}

export function useCategoryCertificatesContext(): CategoryNameContextTypeCertificates {
  const context = useContext(CategoryByIdContextCertificates)

  if (context === undefined) {
    throw new Error("CategoryNameContextCertificates must be used within a CvFormProvider")
  }

  return context
}
