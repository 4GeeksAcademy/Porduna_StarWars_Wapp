import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const SignUp = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordConfirmed = () => {
    if (password !== confirmPassword) {
      setPasswordError("Does not match password");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePasswordConfirmed();
    if (passwordError === "") {
      const dataToSend = { email, password };
      const url = `${process.env.BACKEND_URL}/api/signup`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      };
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          console.log('Error: ', response.status, response.statusText);
          return;
        }
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        actions.setIsLogin(true);
        navigate('/ships');
      } catch (error) {
        console.error("Error during fetch: ", error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {passwordError && <div className="alert alert-secondary" role="alert">{passwordError}</div>}
      <form className="formLog" onSubmit={handleSubmit}>
        <p id="heading">Sign Up</p>
        <div className="field">
          <span className="material-symbols-outlined">alternate_email</span>
          <input autoComplete="off" placeholder="Username" className="formLog-control" type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="field">
          <span className="material-symbols-outlined">lock</span>
          <input placeholder="Password" required={true} className="formLog-control" type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="field">
          <span className="material-symbols-outlined">password</span>
          <input placeholder="Confirm Password" required={true} className="formLog-control" type="password" id="passwordConfirmed" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </div>
        <div className="mb-3 formLog-check">
          <input type="radio" className="formLog-check-input" id="termsAgreement"></input>
          <label className="formLog-check-label text-white" htmlFor="termsAgreement">&nbsp;&nbsp;I agree the Terms of Privacy Policy</label>
        </div>
        <div className="d-flex justify-content">
          <button className="button1 mx-auto" type="submit">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button type="reset" className="button1 mx-auto">&nbsp;&nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;&nbsp;</button>
        </div>
      </form>
    </div>
  );
};
