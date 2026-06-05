import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import CreatePost from "./pages/components/CreatePost";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  if (!user) {
    return <Login />;
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