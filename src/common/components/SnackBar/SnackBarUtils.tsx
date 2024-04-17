import type { ProviderContext, VariantType } from "notistack"
import { useSnackbar } from "notistack"

interface IProps {
  setUseSnackbarRef: (showSnackbar: ProviderContext) => void
}

const InnerSnackbarUtilsConfigurator: React.FC<IProps> = function ({ setUseSnackbarRef }: IProps) {
  setUseSnackbarRef(useSnackbar())
  return null
}

let useSnackbarRef: ProviderContext
const setUseSnackbarRef = (useSnackbarRefProp: ProviderContext): void => {
  useSnackbarRef = useSnackbarRefProp
}

export const SnackbarUtilsConfigurator = function (): JSX.Element {
  return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
}

export default {
  success(msg: string): void {
    this.toast(msg, "success")
  },
  warning(msg: string): void {
    this.toast(msg, "warning")
  },
  info(msg: string): void {
    this.toast(msg, "info")
  },
  error(msg: string): void {
    this.toast(msg, "error")
  },
  toast(msg: string, variant: VariantType = "default"): void {
    useSnackbarRef.enqueueSnackbar(msg, { variant })
  },
}
