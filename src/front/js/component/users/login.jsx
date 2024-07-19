import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/loginForm.css";

export const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { email, password };
    const url = `${process.env.BACKEND_URL}/api/login`;
    const options = {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type' : 'application/json'
        }        
    }
    const response = await fetch(url, options)
    if (!response.ok) {
        console.log('Error: ', response.status, response.statusText);
        return 
    }
    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.results));
    actions.setIsLogin(true);
    actions.setUser(data.results);
    navigate('/characters')
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
        </div>
      </form>
    </div>
  );
};
