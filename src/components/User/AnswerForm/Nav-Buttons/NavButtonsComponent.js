import React, { useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavButtonsComponent = ({
  setNext,
  next,
  pages,
  questionsArrayState,
  setQuestionsArrayState,
  question,
  formData,
  primaryTheme,
  secondaryTheme,
  textTheme,
}) => {
  const sendResponseServer = async () => {
    try {
      const copy = [...questionsArrayState];

      copy.map((item) => {
        if (item.answer === "") {
          item.answer = "Pas de réponse";
        }
      });

      const response = await axios.post(
        // "https://sofiane-rehila-94.herokuapp.com/answerForm/create",
        "http://localhost:4000/answerForm/create/",

        {
          title: formData.title,
          reponses: copy,
          questionForm: formData,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="nav-questions">
      <div
        style={{ backgroundColor: secondaryTheme, color: primaryTheme }}
        onClick={() => {
          setNext((prevState) => (prevState > 0 ? prevState - 1 : prevState));
        }}>
        <FontAwesomeIcon icon={"arrow-left"} />
        <p>Précédent</p>
      </div>

      <button
        style={{ backgroundColor: primaryTheme }}
        onClick={() => {
          setNext((prevState) =>
            prevState < pages + 1 ? prevState + 1 : prevState
          );
          if (next === pages) {
            sendResponseServer();
          }
        }}>
        Suivant
      </button>
    </div>
  );
};

export default NavButtonsComponent;
