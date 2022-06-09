import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinalScreenQuestionComponent = ({
  setNext,
  next,
  pages,
  formData,
  questionsArrayState,
  setQuestionsArrayState,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(formData);
  }, []);
  return (
    <div className="component-container">
      <p className="title-question">Merci d'avoir repondu a ce questionnaire</p>

      <div className="nav-final-screen">
        <button
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
