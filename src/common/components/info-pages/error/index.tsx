import { ApplicationBarEmpty } from 'containers/application-bar/AppBarEmpty';

function ErrorScreen({ title, message }: {title: string, message: string}): JSX.Element {
  return (
    <div className="flex flex-col h-dvh w-full">
      <ApplicationBarEmpty />
      <div className="m-auto p-20 rounded-lg border flex flex-col items-center justify-center">
        <h2 className="pb-4 text-4xl">{title}</h2>
        <h3 className="text-3xl">{message}</h3>
      </div>
    </div>
  );
}

export default ErrorScreen;
