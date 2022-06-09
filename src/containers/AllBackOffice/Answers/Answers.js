import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams, Link } from "react-router-dom";

import TextQuestionComponent from "../../../components/AnswerForm/TextQuestionComponent/TextQuestionComponent";
import RateQuestionComponent from "../../../components/AnswerForm/RateQuestionComponent/RateQuestionComponent";
import EmailQuestionComponent from "../../../components/AnswerForm/EmailQuestionComponent/EmailQuestionComponent";
import ChoiceQuestionComponent from "../../../components/AnswerForm/ChoiceQuestionComponent/ChoiceQuestionComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Answers = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [reponses, setReponses] = useState();

  const [rateDisplay, setRateDisplay] = useState([]);

  const supprAllResponsesForm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/deleteAllResponse",
        {
          formulaireId: id,
        }
      );
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    const rateStar = async () => {
      const displayArray = [...rateDisplay];
      for (let i = 0; i < 5; i++) {
        displayArray.push(<p key={i}>{i + 1}</p>);
      }
      setRateDisplay(displayArray);
    };
    rateStar();
  }, []);

  useEffect(() => {
    const fetchReponses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/form/${id}`);
        setReponses(response.data);
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
      <div className="header-reponses">
        <Link className="toHome" to={"/backoffice"}>
          <div>
            <FontAwesomeIcon icon={"fa-chevron-left"} />
            <p>Formulaire</p>
          </div>
        </Link>
        <div className="reponse-delete-div">
          <button className="suppr-button" onClick={supprAllResponsesForm}>
            Supprimer tous les formulaire
          </button>
          <button className="button-light-green">Exporter en csv</button>
        </div>
      </div>
      {reponses && <h1>{reponses.title}</h1>}
      {reponses &&
        reponses.reponseFormulaire.map((reponseForm, index) => {
          return (
            <div
              className="reponses-form"
              style={{ borderBottom: "solid #62C188 2px" }}>
              {reponseForm.reponses.map((reponse, index) => {
                return (
                  <div className="reponse-container">
                    {reponse.type === "textQuestion" ? (
                      <div className="reponse-title">
                        <div
                          style={{ backgroundColor: "#F5BA49" }}
                          className="icon-container">
                          <p>{reponse.index + 1}</p>
                          <p>-</p>
                          <FontAwesomeIcon icon={"fa-file-lines"} />
                        </div>
                        <div className="reponse">
                          <h4>{reponse.question}</h4>
                          <p>{reponse.answer}</p>
                        </div>
                      </div>
                    ) : reponse.type === "rateQuestion" ? (
                      <div className="reponse-title">
                        <div
                          style={{ backgroundColor: "#F09F97" }}
                          className="icon-container">
                          <p>{reponse.index + 1}</p>
                          <p>-</p>
                          <FontAwesomeIcon icon={"fa-star"} />
                        </div>
                        <div className="reponse">
                          <h4>{reponse.question}</h4>
                          <div className="rate-container">
                            {rateDisplay &&
                              rateDisplay.map((rate, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={
                                      Number(rate.key) + 1 === reponse.answer
                                        ? "selected-rate"
                                        : "rate-block"
                                    }>
                                    {rate}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    ) : reponse.type === "emailQuestion" ? (
                      <div className="reponse-title">
                        <div
                          style={{ backgroundColor: "#79A5DD" }}
                          className="icon-container">
                          <p>{reponse.index + 1}</p>
                          <p>-</p>
                          <FontAwesomeIcon icon={"fa-envelope"} />
                        </div>
                        <div className="reponse">
                          <h4>{reponse.question}</h4>
                          <p>{reponse.answer}</p>
                        </div>
                      </div>
                    ) : reponse.type === "choiceQuestion" ? (
                      <div className="reponse-title">
                        <div
                          style={{ backgroundColor: "#9ACE83" }}
                          className="icon-container">
                          <p>{reponse.index + 1}</p>
                          <p>-</p>
                          <FontAwesomeIcon icon={"fa-question"} />
                        </div>
                        <div className="reponse">
                          <h4>{reponse.question}</h4>
                          <div className="choice-container">
                            <div
                              className={
                                reponse.answer === true
                                  ? "selected-block"
                                  : "choice"
                              }>
                              <p>Oui</p>
                            </div>
                            <div
                              className={
                                reponse.answer === false
                                  ? "selected-block"
                                  : "choice"
                              }>
                              <p>Non</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <div className="suppr-div">
                <p>
                  {index + 1} / {reponses.reponseFormulaire.length}
                </p>
                <button className="suppr-button">console</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Answers;
