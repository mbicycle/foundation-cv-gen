import {useAuth} from "./hooks/useAuth.ts";
import {AuthState} from "./utils/const.ts";

function App() {
  const {authState, userName, logout, account} = useAuth()

  if (authState === AuthState.Loading) {
    return <div>Loading</div>;
  }

    if (authState === AuthState.LoggedOut) {
        return <div>Logged out</div>;
    }

  return (
    <div>
      <h1>CV Gen App</h1>
      <span>Logged in as:{userName}</span>
        <div>
            <button onClick={logout}>logout</button>
            <button onClick={account}>account</button>
        </div>
    </div>
  );
}

export default App;
