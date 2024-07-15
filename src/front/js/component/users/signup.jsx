import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const SignUp = () => {
  const { actions } = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState (false);
  const [passwordError, setPasswordError] = useState(""); // Añadir estado para el error de contraseña
  const navigate = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // To check if password and confirm password match
  const handlePasswordConfirmed = () => {
    if (password !== confirmPassword) {
      setPasswordError("Does not match password");
    } else {
      setPasswordError("");
    }
  };

  const handleAgreeTerms = e => setAgreeTerms(e.target.checked);

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRememberMe(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePasswordConfirmed();
    if (passwordError === "") {
      const dataToSend = { email, password, agreeTerms };
      const url = `${process.env.BACKEND_URL}/api/signup`;
      const options = {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      };
      const response = await fetch(url, options)
      console.log(response);
      if (!response.ok) {
        console.log('Error: ', response.status, response.statusText);
        return
      }
      const data = await response.json()
      console.log();
      localStorage.setItem("token", data.access_token)
      actions.setIsLogin(true)
      console.log(data.access_token);
      navigate('/profile')
    };
}

  return (
    <div className="d-flex justify-content-center">
      <form className="formLog" onSubmit={handleSubmit}>
        <p id="heading">Sign Up To Binaurapp</p>
        <div className="field" onSubmit={handleSubmit}>
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
          <input type="radio" className="formLog-check-input" id="termsAgreement" checked={agreeTerms} onChange={handleAgreeTerms}></input>
          <label className="formLog-check-label text-white" htmlFor="termsAgreement">&nbsp;&nbsp;I agree the Terms of Privacy Policy</label>
        </div>
        <div className="d-flex justify-content">
          <button className="button1 mx-auto" type="submit" onClick={handleSubmit}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button type="reset" className="button1 mx-auto" onClick={handleReset}>&nbsp;&nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;&nbsp;</button>
        </div>
        <div className="d-flex mx-auto justify-content-center text-white mb-2">
          <div className="borderLog align-self-center"></div>
          <span>Or sign up with</span>
          <div className="borderLog align-self-center"></div>
        </div>
        <button type="reset" className="button1 text-success mb-3"><b>Spotify</b></button>
      </form>
    </div>
  );
};