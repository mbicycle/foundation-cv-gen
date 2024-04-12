import { memo } from "react"

import { Input } from "@mbicycle/foundation-ui-kit"
import type { InputProps } from "@mbicycle/foundation-ui-kit/dist/components/Input"

const TextFieldOulined = function ({ label, name, onChange, multiline, ...rest }: InputProps): JSX.Element {
  return <Input {...rest} multiline={multiline} label={label} name={name} onChange={onChange} autoComplete="false" />
}
export default memo(TextFieldOulined)
