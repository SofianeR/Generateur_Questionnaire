import logoTellMeMore from "../../assets/img/favicon2.png";

import React from "react";

import { Link, useNavigate } from "react-router-dom";

const Header = ({ userConnexion, setUser }) => {
  const navigate = useNavigate();

  return (
    <header>
      <Link to={"/"} className="header-logo">
        <img src={logoTellMeMore} alt="" />
        <h1>QuestionForm Generator</h1>
      </Link>

      {userConnexion ? (
        <div className="header-buttons">
          <Link className="link" to={"/backoffice"}>
            <div className="link-div">
              <p>BackOffice</p>
            </div>
          </Link>
          <button
            className="deconnexion"
            onClick={() => {
              setUser(null);
              navigate("/");
            }}>
            Déconnexion
          </button>
        </div>
      ) : (
        <Link className="link" to={"/backoffice/login"}>
          <div className="link-div">
            <p>BackOffice</p>
          </div>
        </Link>
      )}
    </header>
  );
};
export default Header;
