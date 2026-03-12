import classes from "./ProfileForm.module.css";
import { AuthContext } from "../Context/AuthContext";
import { useState, useContext } from "react";
const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const [updatePass, setUpdatepass] = useState("");

  const newpasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBm7sa7FWN8Hir1RIN4CPQK-QTaQOh7-lM",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: authCtx.token,
            password: updatePass,
            returnSecureToken: true,
          }),
        },
      );

      const data = await response.json();
      console.log("password Updated")
      if (!response.ok) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={updatePass}
          onChange={(e) => setUpdatepass(e.target.value)}
        />
      </div>
      <div className={classes.action}>
        <button onClick={newpasswordHandler}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
