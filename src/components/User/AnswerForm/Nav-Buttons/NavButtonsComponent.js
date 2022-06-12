import React, { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAlert } from "react-alert";

const isEmail = (email) => {};

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
  const [onMouseOver, setOnMouseOver] = useState(false);
  const alert = useAlert();
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
        onMouseEnter={() => {
          setOnMouseOver(true);
          console.log(question.type);
        }}
        onMouseLeave={() => {
          setOnMouseOver(false);
        }}
        style={
          onMouseOver
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
          onMouseOver
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

              for (let i = 0; i < question.answer.length; i++) {
                checkForAt.push(question.answer[i]);
              }

              if (checkForAt.indexOf("@") !== -1) {
                setNext((prevState) =>
                  prevState < pages + 1 ? prevState + 1 : prevState
                );
              } else {
                alert.show("Vous devez renseigner un adresse valide");
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
