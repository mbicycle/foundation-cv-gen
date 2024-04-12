import { useAccount, useMsal } from "@azure/msal-react"

export const useMsalAccountInfo = () => {
  const { accounts } = useMsal()

  return useAccount({ username: accounts[0]?.username })
}
