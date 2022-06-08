import React from "react";

const NavButtonsComponent = ({
  setNext,
  pages,
  answersArray,
  setAnswersArray,
  answerState,
  question,
}) => {
  const storeAnswer = () => {
    const copyAnswerArray = [...answersArray];
    const index = copyAnswerArray.length;

    // let answerToSave;

    // if (!answerState) {
    //   answerToSave = "Pas de reponse";
    // } else {
    //   answerToSave = answerState;
    // }

    copyAnswerArray.push({
      index: index,
      question: question.question,
      type: question.type,
      answer: answerState,
    });
    setAnswersArray(copyAnswerArray);
  };

  return (
    <div className="nav-questions">
      <button
        onClick={(e) => {
          e.preventDefault();
          const copyAnswerArray = [...answersArray];

          const isAlreadyAnswered = copyAnswerArray.find(
            (elmt) => elmt.answer === answerState
          );

          if (isAlreadyAnswered) {
            console.log("already =>", isAlreadyAnswered);
          } else {
            console.log("not yest");
          }
        }}>
        console
      </button>
      <button
        onClick={() => {
          setNext((prevState) => (prevState > 0 ? prevState - 1 : prevState));

          console.log(answerState);
        }}>
        Précédent
      </button>

      <button
        onClick={() => {
          setNext((prevState) =>
            prevState < pages + 1 ? prevState + 1 : prevState
          );
          storeAnswer();
        }}>
        Suivant
      </button>
    </div>
  );
};

export default NavButtonsComponent;
