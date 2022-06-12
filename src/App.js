import "./App.scss";
import React, { useState } from "react";

// import containers BackOffice
import Login from "./Backoffice/containers/Login/Login";
import BackOffice from "./Backoffice/containers/Home/HomeBackOffice";
import CreateForm from "./Backoffice/containers/CreateForm/CreateForm";
import UpdateForm from "./Backoffice/containers/UpdateForm/UpdateForm";
import Answers from "./Backoffice/containers/Answers/Answers";

// import Container Client
import Home from "./Client/containers/Home/Home";
import AnswerForm from "./Client/containers/AnswerForm/AnswerForm";

// import component
import Header from "./Shared/Header/Header";

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
  faArrowLeft,
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
  faArrowUpRightFromSquare,
  faArrowLeft
);

function App() {
  // state //
  const [userConnexion, setUserConnexion] = useState(
    Cookies.get("connexion") || null
  );

  // function //

  const setUser = async (connexionState, password) => {
    if (connexionState) {
      Cookies.set("connexion", password);
      setUserConnexion(password);
    } else {
      Cookies.remove("connexion");
      setUserConnexion(null);
    }
  };

  return (
    <Router>
      <Header userConnexion={userConnexion} setUser={setUser} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form/:slug" element={<AnswerForm />} />

          {!userConnexion ? (
            <Route
              path="/backoffice/login"
              element={<Login setUser={setUser} />}
            />
          ) : (
            <>
              <Route
                path="/backoffice"
                element={<BackOffice userConnexion={userConnexion} />}
              />

              <Route
                path="/backoffice/create"
                element={<CreateForm setUser={setUser} />}
              />
              <Route
                path="/backoffice/update/:id"
                element={<UpdateForm setUser={setUser} />}
              />
              <Route
                path="/backoffice/reponses/:id"
                element={<Answers setUser={setUser} />}
              />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
