import "./App.scss";
import React, { useState } from "react";

// import containers BackOffice
import Login from "./containers/Backoffice/Login/Login";
import BackOffice from "./containers/Backoffice/HomeBackOffice/HomeBackOffice";
import CreateForm from "./containers/Backoffice/CreateForm/CreateForm";
import UpdateForm from "./containers/Backoffice/UpdateForm/UpdateForm";
import Answers from "./containers/Backoffice/Answers/Answers";

// import Container Client
import Home from "./containers/User/Home/Home";
import AnswerForm from "./containers/User/AnswerForm/AnswerForm";

// import component
import Header from "./components/Shared/Header/Header";

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

  const setUser = async (connexionState) => {
    if (connexionState) {
      Cookies.set("connexion", "connecté");
      setUserConnexion(Cookies.get("connexion"));
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
        </Routes>

        {userConnexion ? (
          <Routes>
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
