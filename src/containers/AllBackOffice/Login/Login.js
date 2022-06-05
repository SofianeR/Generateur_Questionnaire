import React, { useState } from "react";

// import packages
// import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  // navigation
  const navigate = useNavigate();
  // connexion state
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const connexion = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:4000/login", {
        password: password,
      });
      console.log(response.data);
      if (response.data.message === "connecté") {
        setUser(response.data.message);
        navigate("/backoffice");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };
  {
    return isLoading ? (
      <div className="container-login">
        <p>En cours de chargement ...</p>
      </div>
    ) : (
      <div className="container-login">
        <h1>Accéder à mon espace Admin</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            connexion();
          }}>
          <input
            className="search"
            type="text"
            placeholder="Saisir votre mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className="submit-button"
            type="submit"
            value={"Se connecter"}
          />
        </form>
        {errorMessage && (
          <div className="errorMessage">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
};

export default Login;
