import { ApplicationBarEmpty } from "containers/application-bar/AppBarEmpty"

function ErrorScreen({ title, message }: { title: string; message: string }): JSX.Element {
  return (
    <div className="flex h-dvh w-full flex-col">
      <ApplicationBarEmpty />
      <div className="m-auto flex flex-col items-center justify-center rounded-lg border p-20">
        <h2 className="pb-4 text-4xl">{title}</h2>
        <h3 className="text-3xl">{message}</h3>
      </div>
    </div>
  )
}

export default ErrorScreen
