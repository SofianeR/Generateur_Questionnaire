import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddQuestionButtonComponent = ({ setQuestions, questions }) => {
  const addTextQuestion = () => {
    const arrayQuestionsForm = [...questions];
    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      index: index,

      value: "",
      type: "text",
    });
    setQuestions(arrayQuestionsForm);
  };

  const addRateQuestion = () => {
    const arrayQuestionsForm = [...questions];

    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      index: index,

      value: "",
      type: "rate",
    });
    setQuestions(arrayQuestionsForm);
  };

  const addEmailQuestion = () => {
    const arrayQuestionsForm = [...questions];

    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      index: index,

      value: "",
      type: "email",
    });
    setQuestions(arrayQuestionsForm);
  };

  const addChoiceQuestion = () => {
    const arrayQuestionsForm = [...questions];

    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      index: index,

      value: "",
      type: "choice",
    });
    setQuestions(arrayQuestionsForm);
  };

  return (
    <div className="add-question">
      <div className="question-item" onClick={addTextQuestion}>
        <FontAwesomeIcon className="icon" icon={"fa-file-lines"} />
        <p>Ajouter une question Texte</p>
      </div>

      <div className="question-item" onClick={addRateQuestion}>
        <FontAwesomeIcon className="icon" icon={"fa-star"} />
        <p>Ajouter une question Note</p>
      </div>

      <div className="question-item" onClick={addEmailQuestion}>
        <FontAwesomeIcon className="icon" icon={"fa-envelope"} />
        <p>Ajouter une question Email</p>
      </div>

      <div className="question-item" onClick={addChoiceQuestion}>
        <FontAwesomeIcon className="icon" icon={"fa-question"} />
        <p>Ajouter une question Oui/Non</p>
      </div>
    </div>
  );
};

export default AddQuestionButtonComponent;
