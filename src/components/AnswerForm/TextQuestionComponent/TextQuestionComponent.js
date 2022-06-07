import React from "react";

const TextQuestionComponent = ({ pages, next }) => {
  return (
    <div className="textComponent">
      <p>Question {next + "/" + pages}</p>

      <h1>title</h1>
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
  );
};
export default TextQuestionComponent;
