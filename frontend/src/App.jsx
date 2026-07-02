import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import "./styles/dashboard.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return isLoggedIn ? (
    <Dashboard setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <Login setIsLoggedIn={setIsLoggedIn} />
  );
}

export default App;