import { useAuth } from './hooks/useAuth';
import { AuthState } from './utils/const';

function App() {
  const {
    authState, userName, logout,
  } = useAuth();

  if (authState === AuthState.Loading) {
    return <div>Loading</div>;
  }

  if (authState === AuthState.LoggedOut) {
    return <div>Logged out</div>;
  }

  return (
    <div>
      <h1>CV Gen App</h1>
      <span>
        Logged in as:
        {userName}
      </span>
      <div>
        <button onClick={logout} type="button">logout</button>
      </div>
    </div>
  );
}

export default App;
