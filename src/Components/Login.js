import React, { useState } from "react";
import EmailLogin from "../AuthComponents/EmailLogin";
import EmailSignUp from "../AuthComponents/EmailSignUp";
import Google from "../AuthComponents/Google";

const Login = props => {
  const [existingLogin, setExistingLogin] = useState(true);
  const { setUser, hideNavBar } = props;

  hideNavBar(true);

  return (
    <div className="login-container">
      {existingLogin ? (
        <>
          <Google />
          <div>
            <span>OR</span>
          </div>
          {/* <EmailLogin setUser={setUser} /> */}
          <EmailLogin setUser={setUser} setExistingLogin={setExistingLogin} />
        </>
      ) : (
        <EmailSignUp setUser={setUser} setExistingLogin={setExistingLogin} />
      )}
    </div>
  );
};

export default Login;
