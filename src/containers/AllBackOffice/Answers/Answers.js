import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import TextQuestionComponent from "../../../components/AnswerForm/TextQuestionComponent/TextQuestionComponent";

const Answers = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [reponses, setReponses] = useState();

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
      <p>aoiefj</p>
      {reponses &&
        reponses.reponseFormulaire.map((reponseForm, index) => {
          reponseForm.reponses.map((reponse, index) => {
            return (
              <div className="component-container">
                <p>aipefjoiafj</p>
                <p className="count-question">
                  Question {index + "/" + reponseForm.reponses.length - 1}
                </p>

                <p className="title-question">{reponse.question}</p>
                <div className="module-component">
                  <textarea
                    name="reponse-text"
                    cols="30"
                    rows="10"
                    value={reponse.answer}></textarea>
                </div>
              </div>
            );
          });
        })}
    </div>
  );
};

export default Answers;
