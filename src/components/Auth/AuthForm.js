import { useState, useRef ,useContext} from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const enteredMailRef = useRef();
  const enteredPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
   const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = enteredMailRef.current.value;
    const password = enteredPasswordRef.current.value;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBm7sa7FWN8Hir1RIN4CPQK-QTaQOh7-lM`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Signup failed!");
      }

      const data = await response.json();
      console.log("User signed up:", data);
      // data.idToken is your auth token
      // data.localId is the user’s UID
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    const email = enteredMailRef.current.value;
    const password = enteredPasswordRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBm7sa7FWN8Hir1RIN4CPQK-QTaQOh7-lM",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        },
      );
      if (!response.ok) {
        console.error("Signin failed!");
        console.error("Status:", response.status);
        console.error("Status text:", response.statusText);
      }

      const data = await response.json();
      console.log("User signedin :", data);
      authCtx.login(data.idToken, data.email, data.displayName || "Anonymous");
      if(data.idToken){
        navigate("/")
      }
      


    } catch (error) {
      console.error("Signin error:", error.message);
      console.error("Full error:", error);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={isLogin ? signInHandler : submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={enteredMailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={enteredPasswordRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
