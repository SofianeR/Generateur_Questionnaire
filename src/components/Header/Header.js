import React from "react";

import { Link } from "react-router-dom";

const Header = ({ userConnexion, setUser }) => {
  return (
    <header>
      <div className="header-logo">
        <div className="logo">
          <p>T</p>
        </div>
        <p>TellMeMore</p>
      </div>

      {userConnexion ? (
        <button onClick={() => setUser(null)}>Déconnexion</button>
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
