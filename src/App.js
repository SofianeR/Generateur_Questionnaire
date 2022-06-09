import "./App.scss";
import React, { useState } from "react";

// import containers BackOffice
import Login from "./containers/AllBackOffice/Login/Login";
import BackOffice from "./containers/AllBackOffice/BackOffice/BackOffice";
import CreateFormulaire from "./containers/AllBackOffice/CreateFormulaire/CreateFormulaire";
import UpdateFormulaire from "./containers/AllBackOffice/UpdateFormulaire/UpdateFormulaire";
import Answers from "./containers/AllBackOffice/Answers/Answers";

// import Container Client
import Home from "./containers/Home/Home";
import AnswerForm from "./containers/AnswerForm/AnswerForm";

// import component
import Header from "./components/Header/Header";

// import packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//////////// import icons ///////////////////////////////////
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faChevronLeft,
  faFileLines,
  faStar,
  faEnvelope,
  faQuestion,
  faTrash,
  faAngleUp,
  faAngleDown,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPlus,
  faChevronLeft,
  faFileLines,
  faStar,
  faEnvelope,
  faQuestion,
  faTrash,
  faAngleUp,
  faAngleDown,
  faArrowUpRightFromSquare
);

function App() {
  // state //
  const [userConnexion, setUserConnexion] = useState(
    Cookies.get("connexion") || null
  );

  // function //

  const setUser = async (connexionState) => {
    connexionState
      ? Cookies.set(
          "connexion",
          "connecté"
        )(setUserConnexion(Cookies.get("connexion")))
      : Cookies.remove("connexion")(setUserConnexion(Cookies.get("connexion")));
  };
  return (
    <Router>
      <Header userConnexion={userConnexion} setUser={setUser} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form/:slug" element={<AnswerForm />} />
        </Routes>

        {userConnexion ? (
          <Routes>
            <Route
              path="/backoffice"
              element={<BackOffice userConnexion={userConnexion} />}
            />

            <Route
              path="/backoffice/create"
              element={<CreateFormulaire setUser={setUser} />}
            />
            <Route
              path="/backoffice/update/:id"
              element={<UpdateFormulaire setUser={setUser} />}
            />
            <Route
              path="/backoffice/reponses/:id"
              element={<Answers setUser={setUser} />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/backoffice/login"
              element={<Login setUser={setUser} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
