type Props = {
  children: React.ReactNode;
};

function MainWrapper({ children }: Props): JSX.Element {
  return (
    <div className="flex flex-row grow bg-white">
      {children}
    </div>
  );
}

export default MainWrapper;
