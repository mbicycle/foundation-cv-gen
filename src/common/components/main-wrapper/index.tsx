type Props = {
  children: React.ReactNode;
};

function MainWrapper({ children }: Props): JSX.Element {
  return (
    <div className="flex flex-row grow bg-white h-dvh w-dvw text-base">
      {children}
    </div>
  );
}

export default MainWrapper;
