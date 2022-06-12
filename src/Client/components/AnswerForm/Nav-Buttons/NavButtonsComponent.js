import React from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAlert } from "react-alert";

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
  onMouseOver,
  setOnMouseOver,
}) => {
  const alert = useAlert();
  const sendResponseServer = async () => {
    try {
      const copy = [...questionsArrayState];

      copy.map((item) => {
        if (item.answer === "" || item.answer === undefined) {
          item.answer = "Pas de réponse";
        }
      });

      const response = await axios.post(
        "https://sofiane-rehila-94.herokuapp.com/answerForm/create",
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
        onMouseEnter={() => {
          const copyHover = [...onMouseOver];
          copyHover[0] = true;
          setOnMouseOver(copyHover);
        }}
        onMouseLeave={() => {
          const copyHover = [...onMouseOver];
          copyHover[0] = false;
          setOnMouseOver(copyHover);
        }}
        style={
          onMouseOver[0]
            ? {
                backgroundColor: secondaryTheme,
                color: primaryTheme,
                border: "solid",
                borderColor: primaryTheme,
              }
            : {
                backgroundColor: secondaryTheme,
                color: primaryTheme,
                border: "solid",
                borderColor: secondaryTheme,
              }
        }
        onClick={() => {
          setNext((prevState) => (prevState > 0 ? prevState - 1 : prevState));
        }}>
        <FontAwesomeIcon icon={"arrow-left"} />
        <p>Précédent</p>
      </div>

      <button
        onMouseEnter={() => {
          const copyHover = [...onMouseOver];
          copyHover[1] = true;
          setOnMouseOver(copyHover);
        }}
        onMouseLeave={() => {
          const copyHover = [...onMouseOver];
          copyHover[1] = false;
          setOnMouseOver(copyHover);
        }}
        style={
          onMouseOver[1]
            ? {
                backgroundColor: secondaryTheme,
                color: primaryTheme,
                border: "solid",
                borderColor: primaryTheme,
              }
            : {
                backgroundColor: primaryTheme,
                color: "white",
                border: "solid",
                borderColor: primaryTheme,
              }
        }
        onClick={() => {
          if (question.type === "email") {
            if (question.answer !== undefined && question.answer !== "") {
              const checkForAt = [];

              if (
                question.answer
                  .toLowerCase()
                  .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
              ) {
                setNext((prevState) =>
                  prevState < pages + 1 ? prevState + 1 : prevState
                );
              } else {
                alert.show("Vous devez entrer une adresse valide");
              }
            } else {
              setNext((prevState) =>
                prevState < pages + 1 ? prevState + 1 : prevState
              );
            }
          } else {
            setNext((prevState) =>
              prevState < pages + 1 ? prevState + 1 : prevState
            );
          }

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
