import React, { useState, useEffect } from "react";

import axios from "axios";

import { useAlert } from "react-alert";
import { useParams, Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnswersHeaderComponent from "../../../components/Backoffice/Answers/AnswersHeaderComponent";
import TextAnswerComponent from "../../../components/Backoffice/Answers/TextAnswerComponent";
import RateAnswerComponent from "../../../components/Backoffice/Answers/RateAnswerComponent";
import EmailAnswerComponent from "../../../components/Backoffice/Answers/EmailAnswerComponent";
import ChoiceAnswerComponent from "../../../components/Backoffice/Answers/ChoiceAnswerComponent";

const Answers = () => {
  const alert = useAlert();
  const { state } = useLocation();

  const dataFormulaire = state;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [dataForm, setDataForm] = useState();

  const [csvArray, setCsvArray] = useState([]);

  const deleteAllAnswerForm = async () => {
    setIsLoading(true);
    try {
      console.log("click");
      const response = await axios.post(
        // "https://sofiane-rehila-94.herokuapp.com/answerForm/delete/all",
        "http://localhost:4000/answerForm/delete/all",

        {
          formulaireId: dataFormulaire._id,
        }
      );

      const copy = [...dataForm];

      copy.splice(0, copy.length);

      setDataForm(copy);
    } catch (error) {
      setErrorMessage(error.message);
      alert.show(error.message);
    }
    setIsLoading(false);
  };

  const deleteSingleReponse = async (reponseId, index) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://sofiane-rehila-94.herokuapp.com/answerForm/delete/single",

        {
          id: reponseId,
        }
      );

      const copy = [...dataForm];

      copy.splice(index, 1);

      setDataForm(copy);
    } catch (error) {
      alert.show(error.message);
    }
    setIsLoading(false);
  };

  const sortArraysForCsv = (dataform) => {
    const arrayQuestion = [];
    const arrayReponse = [];

    dataform.map((reponse) => {
      reponse.reponses.map((item) => {
        arrayQuestion.push(item.value);
        arrayReponse.push(item.answer);
      });
    });
    console.log(arrayQuestion);
    console.log(arrayReponse);

    const copyCsvArray = [];

    copyCsvArray.push(arrayQuestion);
    copyCsvArray.push(arrayReponse);

    setCsvArray(copyCsvArray);
  };

  useEffect(() => {
    const fetchReponses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://sofiane-rehila-94.herokuapp.com/questionForm/single/${dataFormulaire._id}`
        );
        setDataForm(response.data.answerForm);

        sortArraysForCsv(response.data.answerForm);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    fetchReponses();
  }, []);

  return isLoading ? (
    <div>
      <p>En cours de chargement</p>
    </div>
  ) : (
    <div className="container-answers">
      <AnswersHeaderComponent
        deleteAllAnswerForm={deleteAllAnswerForm}
        csvArray={csvArray}
      />

      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
      {dataForm && <h1>{dataFormulaire.title}</h1>}
      {dataForm &&
        dataForm.map((answerForm, index) => {
          return (
            <div
              key={index}
              className="reponses-form"
              style={{ borderBottom: "solid #62C188 2px" }}>
              {answerForm.reponses.map((question, index) => {
                return (
                  <div className="reponse-container" key={index}>
                    {question.type === "text" ? (
                      <TextAnswerComponent question={question} />
                    ) : question.type === "rate" ? (
                      <RateAnswerComponent question={question} />
                    ) : question.type === "email" ? (
                      <EmailAnswerComponent question={question} />
                    ) : (
                      question.type === "choice" && (
                        <ChoiceAnswerComponent question={question} />
                      )
                    )}
                  </div>
                );
              })}
              <div className="suppr-div">
                <p>
                  {index + 1} / {dataForm.length}
                </p>
                <button
                  className="suppr-button"
                  onClick={() => {
                    deleteSingleReponse(answerForm._id, index);
                  }}>
                  Supprimer la réponse
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Answers;
