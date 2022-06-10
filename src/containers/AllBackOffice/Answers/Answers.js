import React, { useState, useEffect } from "react";

import axios from "axios";

import { CSVLink, CSVDownload } from "react-csv";
import { useParams, Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Answers = () => {
  const { state } = useLocation();

  const dataFormulaire = state;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [dataForm, setDataForm] = useState();

  const [rateDisplay, setRateDisplay] = useState([]);

  const [csvArray, setCsvArray] = useState([]);

  const supprAllResponsesForm = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/deleteAllResponse",
        {
          formulaireId: dataFormulaire._id,
        }
      );

      const copy = [...dataForm];

      copy.splice(0, copy.length);

      setDataForm(copy);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  const supprSingleReponse = async (reponseId, index) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/deleteReponse", {
        id: reponseId,
      });

      const copy = [...dataForm];

      copy.splice(index, 1);

      setDataForm(copy);
    } catch (error) {
      setErrorMessage(error.message);
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
        const response = await axios.get(
          `http://localhost:4000/form/${dataFormulaire._id}`
        );
        setDataForm(response.data.reponseFormulaire);

        sortArraysForCsv(response.data.reponseFormulaire);
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
            Supprimer toutes les réponses
          </button>

          {csvArray && (
            <CSVLink className="button-light-green" data={csvArray}>
              Exporter en csv
            </CSVLink>
          )}
        </div>
      </div>
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
      {dataForm && <h1>{dataFormulaire.title}</h1>}
      {dataForm &&
        dataForm.map((reponseForm, index) => {
          return (
            <div
              key={index}
              className="reponses-form"
              style={{ borderBottom: "solid #62C188 2px" }}>
              {reponseForm.reponses.map((question, index) => {
                return (
                  <div className="reponse-container" key={index}>
                    {question.type === "text" ? (
                      <div className="reponse-title">
                        <div
                          style={{ backgroundColor: "#F5BA49" }}
                          className="icon-container">
                          <p>{question.index + 1}</p>
                          <p>-</p>
                          <FontAwesomeIcon icon={"fa-file-lines"} />
                        </div>
                        <div className="reponse">
                          <h4>{question.value}</h4>
                          <p>{question.answer}</p>
                        </div>
                      </div>
                    ) : question.type === "rate" ? (
                      <div className="reponse-title">
                        <div
                          style={{ backgroundColor: "#F09F97" }}
                          className="icon-container">
                          <p>{question.index + 1}</p>
                          <p>-</p>
                          <FontAwesomeIcon icon={"fa-star"} />
                        </div>
                        <div className="reponse">
                          <h4>{question.value}</h4>
                          <div className="rate-container">
                            {rateDisplay &&
                              rateDisplay.map((rate, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={
                                      Number(rate.key) + 1 === question.answer
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
                    ) : question.type === "email" ? (
                      <div className="reponse-title">
                        <div
                          style={{ backgroundColor: "#79A5DD" }}
                          className="icon-container">
                          <p>{question.index + 1}</p>
                          <p>-</p>
                          <FontAwesomeIcon icon={"fa-envelope"} />
                        </div>
                        <div className="reponse">
                          <h4>{question.value}</h4>
                          <p>{question.answer}</p>
                        </div>
                      </div>
                    ) : question.type === "choice" ? (
                      <div className="reponse-title">
                        <div
                          style={{ backgroundColor: "#9ACE83" }}
                          className="icon-container">
                          <p>{question.index + 1}</p>
                          <p>-</p>
                          <FontAwesomeIcon icon={"fa-question"} />
                        </div>
                        <div className="reponse">
                          <h4>{question.value}</h4>
                          <div className="choice-container">
                            <div
                              className={
                                question.answer === true
                                  ? "selected-block"
                                  : "choice"
                              }>
                              <p>Oui</p>
                            </div>
                            <div
                              className={
                                question.answer === false
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
                  {index + 1} / {dataForm.length}
                </p>
                <button
                  className="suppr-button"
                  onClick={() => {
                    supprSingleReponse(reponseForm._id, index);
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
