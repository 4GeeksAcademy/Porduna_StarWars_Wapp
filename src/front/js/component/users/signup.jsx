import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const SignUp = () => {
  const { actions } = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // Para almacenar el mensaje de error
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
        email,
        password,
    };
    const url = `${process.env.BACKEND_URL}/api/signup`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    };

    try {
        const response = await fetch(url, options,);
        if (response.status === 409) {
            setErrorMessage("El usuario ya existe");
        } else if (!response.ok) {
            console.log('Error:', response.status, response.statusText);
            setErrorMessage("Ha ocurrido un error, intentalo de nuevo.");
        } else {
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            actions.setIsLogin(true);
            actions.setcurrentUser(data.results);
            navigate('/dashboard');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        setErrorMessage("An error occurred. Please try again.");
    }
};

  return (
    <div className="d-flex justify-content-center">
      {errorMessage && <div className="alert alert-secondary" role="alert">{errorMessage}</div>}
      <form className="formLog">
        <p id="heading">Sign Up</p>
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
          <input type="radio" className="formLog-check-input" id="termsAgreement"></input>
          <label className="formLog-check-label text-white" htmlFor="termsAgreement">&nbsp;&nbsp;I agree the Terms of Privacy Policy</label>
        </div>
        <div className="d-flex justify-content">
          <button className="button1 mx-auto" type="submit" onClick={handleSubmit}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button type="reset" className="button1 mx-auto">&nbsp;&nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;&nbsp;</button>
        </div>
      </form>
    </div>
  );
};