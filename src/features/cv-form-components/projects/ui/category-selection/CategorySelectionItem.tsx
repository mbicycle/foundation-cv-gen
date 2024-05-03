import { memo, useCallback } from "react"
import type { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form"

import CategoryItem from "features/cv-form-components/projects/ui/CategoryItem"

export type CategoryItemProps = {
  categories: {
    skill: string
    tools: string[]
  }[]
}

type CategorySelectionItemProps = {
  fieldIndex: number
  field: FieldArrayWithId<CategoryItemProps, "categories", "id">
  remove: UseFieldArrayRemove
  onSetSelected: VoidFunction
  onSetOpen: CallableFunction
}

const CategorySelectionItem: React.FC<CategorySelectionItemProps> = function (props): JSX.Element | null {
  const { fieldIndex, field, remove, onSetSelected, onSetOpen } = props

  const handleClickOpen = useCallback((): void => {
    onSetOpen(true)
    if (field) {
      onSetSelected()
    }
  }, [field, onSetOpen, onSetSelected])

  const deleteCategory = useCallback((): void => {
    remove(fieldIndex)
  }, [fieldIndex, remove])

  if (!field.skill) return null

  return (
    <CategoryItem
      key={field.id}
      skill={field.skill}
      tools={field.tools}
      onDelete={deleteCategory}
      onClick={handleClickOpen}
    />
  )
}

export default memo(CategorySelectionItem)
