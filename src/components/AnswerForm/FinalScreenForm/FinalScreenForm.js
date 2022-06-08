import React from "react";

import { useNavigate } from "react-router-dom";

const FinalScreenQuestionComponent = ({
  setNext,
  pages,
  answersArray,
  setAnswersArray,
  formData,
}) => {
  const navigate = useNavigate();
  return (
    <div className="component-container">
      <p className="title-question">Merci d'avoir repondu a ce questionnaire</p>

      <div className="nav-final-screen">
        <button
          onClick={() => {
            setAnswersArray([]);
            setNext(0);
          }}>
          Recommencer
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}>
          Revenir à l'accueil
        </button>
      </div>
    </div>
  );
};

export default FinalScreenQuestionComponent;
