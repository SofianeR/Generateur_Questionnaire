import React, { useState } from "react";

// import packages
// import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Login = ({ setUser }) => {
  // navigation
  const navigate = useNavigate();

  const alert = useAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // fonction de connexion. envoie au server pour verification. enregistrement de la connexion avec la fonction setUser de App.js
  const connexion = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://sofiane-rehila-94.herokuapp.com/backoffice/login",
        {
          password: password,
        }
      );
      if (response.data.password) {
        setUser(response.data.message, response.data.password);
        alert.show(response.data.message);
        navigate("/backoffice");
      } else {
        alert.show(response.data.error);
      }
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

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
          autoFocus
          className="login"
          type="text"
          placeholder="Saisir votre mot de passe"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input className="submit-button" type="submit" value={"Se connecter"} />
      </form>
      {errorMessage && (
        <div className="errorMessage">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
