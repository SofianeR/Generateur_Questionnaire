import React, { useState, useEffect } from "react";

// import packages
import axios from "axios";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";

// import components
import AnswersHeaderComponent from "../../components/Answers/AnswersHeader/AnswersHeaderComponent";
import TextAnswerComponent from "../../components/Answers/TextAnswer/TextAnswerComponent";
import RateAnswerComponent from "../../components/Answers/RateAnswer/RateAnswerComponent";
import EmailAnswerComponent from "../../components/Answers/EmailAnswerComponent";
import ChoiceAnswerComponent from "../../components/Answers/ChoiceAnswerComponent";

const Answers = () => {
  const alert = useAlert();

  const { state } = useLocation();

  const dataFormulaire = state;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [dataForm, setDataForm] = useState();

  const [csvArray, setCsvArray] = useState([]);

  // fonction pour supprimer toutes les reponses d'un formulaire
  const deleteAllAnswerForm = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://sofiane-rehila-94.herokuapp.com/answerForm/delete/all",

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

  // fonction pour supprimer une seule reponse
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

  // fonction pour trier les questions et les reponses dans deux arrays differents pour l'export csv (prends deux array)
  const sortArraysForCsv = (dataform) => {
    const arrayQuestion = [];
    const arrayReponse = [];

    dataform.map((reponse) => {
      reponse.reponses.map((item) => {
        arrayQuestion.push(item.value);
        arrayReponse.push(item.answer);
      });
    });

    const copyCsvArray = [];

    copyCsvArray.push(arrayQuestion);
    copyCsvArray.push(arrayReponse);

    setCsvArray(copyCsvArray);
  };

  useEffect(() => {
    // fonction pour recuperer toutes les reponses correspondant a un formulaire de question
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
      {dataForm && (
        <div className="reponses-container">
          <h1>{dataFormulaire.title}</h1>

          {dataForm.map((answerForm, index) => {
            return (
              <div key={index} className="reponses-form">
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
      )}
    </div>
  );
};

export default Answers;
