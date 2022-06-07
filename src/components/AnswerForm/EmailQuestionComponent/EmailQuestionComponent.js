import React from "react";

const EmailQuestionComponent = ({ pages, next }) => {
  return (
    <div className="textComponent">
      <p>Question {next + "/" + pages}</p>

      <h1>Email</h1>
      <input type="text" />
    </div>
  );
};
export default EmailQuestionComponent;
