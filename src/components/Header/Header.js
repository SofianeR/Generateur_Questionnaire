import React from "react";

import { Link, useNavigate } from "react-router-dom";

const Header = ({ userConnexion, setUser }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-logo">
        <div className="logo">
          <p>T</p>
        </div>
        <p
          onClick={() => {
            navigate("/");
          }}>
          TellMeMore
        </p>
      </div>

      {userConnexion ? (
        <div className="header-buttons">
          <Link className="link" to={"/backoffice"}>
            <div className="link-div">
              <p>BackOffice</p>
            </div>
          </Link>
          <button
            onClick={() => {
              setUser(null);
              navigate("/backoffice/login");
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
