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
        <div class="row">
        <div class="col-md-4" >

          <Google />
        
          </div>
          <div class="col-md-2" ><span></span></div>
          <div class="col-md-4" >

          {/* <EmailLogin setUser={setUser} /> */}
          <EmailLogin setUser={setUser} setExistingLogin={setExistingLogin} />

          </div>
          </div>
        </>
      ) : (
        <EmailSignUp setUser={setUser} setExistingLogin={setExistingLogin} />
      )}
    </div>
  );
};

export default Login;
