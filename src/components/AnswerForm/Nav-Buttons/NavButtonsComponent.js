import React, { useEffect } from "react";
import axios from "axios";

const NavButtonsComponent = ({
  setNext,
  next,
  pages,
  questionsArrayState,
  setQuestionsArrayState,
  question,
  formData,
}) => {
  const sendResponseServer = async () => {
    try {
      const copy = [...questionsArrayState];

      copy.map((item) => {
        if (!item.answer || item.answer === "") {
          item.answer = "Pas de réponse";
        }
      });

      const response = await axios.post("http://localhost:4000/reponseForm", {
        title: formData.title,
        reponses: copy,
        formulaire: formData,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="nav-questions">
      <button
        onClick={() => {
          setNext((prevState) => (prevState > 0 ? prevState - 1 : prevState));
        }}>
        Précédent
      </button>

      <button
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
