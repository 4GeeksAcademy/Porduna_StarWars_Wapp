import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/loginForm.css";

export const Login = () => {
    const {actions} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Para almacenar el mensaje de error
    const navigate = useNavigate()

    const handleEmailChange = (e) => { setEmail(e.target.value) };
    const handlePasswordChange = (e) => { setPassword(e.target.value) };

    const handleReset = () => {
      setEmail('');
      setPassword('');
      setRememberMe(false);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const dataToSend = { email, password };
      const url = `${process.env.BACKEND_URL}/api/login`;
      const options = {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          if (response.status === 401 || response.status === 404) {
            setErrorMessage("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
          } else {
            setErrorMessage("Ocurrió un error. Por favor, inténtelo de nuevo más tarde.");
          }
          return;
        }
  
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        actions.setIsLogin(true);
        actions.setcurrentUser(data.results);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error de fetch:', error);
        setErrorMessage("Ocurrió un error. Por favor, inténtelo de nuevo más tarde.");
      }
    };

  return (
    <div className="d-flex justify-content-center">
      <form className="formLog" onSubmit={handleSubmit}>
        <p id="heading">Login</p>
        <div className="field">
          <span className="material-symbols-outlined">alternate_email</span>
          <input autoComplete="off" placeholder="Username" className="formLog-control" type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="field">
          <span className="material-symbols-outlined">lock</span>
          <input placeholder="Password" required={true} className="formLog-control" type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="d-flex justify-content">
          <button className="button1 mx-auto">
            &nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button type="reset" className="button1 mx-auto" onClick={handleReset}>&nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;</button>
        </div>
      </form>
    </div>
  );
};
