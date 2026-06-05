import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import CreatePost from "./pages/components/CreatePost";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  if (!user) {
    return (
      <div>
        {showRegister ? <Register /> : <Login />}

        <br />

        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Social Media App 🚀</h1>
      <CreatePost />
      <Feed />
    </div>
  );
}

export default App;