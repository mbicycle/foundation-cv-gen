type Props = {
  children: React.ReactNode
}

function MainWrapper({ children }: Props): JSX.Element {
  return <div className="flex h-dvh w-dvw grow flex-row bg-white text-base">{children}</div>
}

export default MainWrapper
