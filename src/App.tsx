import { useCookies } from "react-cookie";

function App() {
  const [{ token }, , removeCookie] = useCookies(["token"]);

  const unauth = () => removeCookie("token");

  if (!token) {
    window.location.href = "http://localhost:3000";
    return null;
  }
  console.log(token);

  return (
    <div>
      CV Gen App
      <button onClick={unauth}>Unauthorized</button>
    </div>
  );
}

export default App;
