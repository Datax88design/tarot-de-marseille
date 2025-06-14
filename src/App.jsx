import { useState } from "react";
import TarotGame from "./TarotGame";
import Login from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? <TarotGame /> : <Login onLogin={setLoggedIn} />;
}

export default App;
