import { useEffect } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [{ token }, setToken, removeCookie] = useCookies(["token"]);
  const searchParams = new URLSearchParams(window.location.search);

  const unauth = () => removeCookie("token");

  const accessToken = searchParams.get("token") ?? token;

  useEffect(() => {
    if (accessToken) {
      setToken("token", accessToken);
      window.history.replaceState({}, "", "/");
    }
  }, [accessToken, setToken]);

  if (!accessToken) {
    window.location.href = import.meta.env.VITE_ENTRY_POINT;
    return null;
  }

  return (
    <div>
      CV Gen App
      <button onClick={unauth}>Unauthorized</button>
    </div>
  );
}

export default App;
