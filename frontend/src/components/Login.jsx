import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/adminlogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-24 border loginForm">
        <div className="text-warning">{error && error}</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Digite seu email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Senha:</strong>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              placeholder="Digite sua senha"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Enviar
          </button>
          <div className="mb-3">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="password">
              Você concorda com os termos e condições
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
