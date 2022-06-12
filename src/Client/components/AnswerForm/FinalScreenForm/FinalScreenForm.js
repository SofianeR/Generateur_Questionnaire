import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const FinalScreenQuestionComponent = ({
  setNext,
  next,
  pages,
  formData,
  questionsArrayState,
  setQuestionsArrayState,
  primaryTheme,
  secondaryTheme,
  textTheme,
}) => {
  const navigate = useNavigate();

  return (
    <div className="component-container">
      <p className="title-question" style={{ color: textTheme }}>
        Vos réponses ont bien été enregistrées !
      </p>

      <div className="nav-final-screen">
        <button
          style={{ backgroundColor: primaryTheme, color: "white" }}
          onClick={() => {
            const copy = [...questionsArrayState];
            copy.map((item) => {
              item.answer = "";
            });
            setQuestionsArrayState(copy);
            setNext(0);
          }}>
          Recommencer
        </button>
        <button
          style={{ backgroundColor: primaryTheme, color: "white" }}
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
