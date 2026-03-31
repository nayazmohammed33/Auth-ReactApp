import { Routes, Route } from "react-router-dom";
import { useEffect,useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./components/Context/AuthContext";




function App() {
  const ctx =useContext(AuthContext);

  useEffect(()=>{
    const checkAuth = async()=>{
      if(!ctx.token)return;
      try {        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC8n9sXo2l3mLh7a5j6v0z5X9s8f7g6h', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idToken: ctx.token
          })
        });
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    checkAuth();
  }, [ctx.token]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Layout>
  );
}

export default App;
