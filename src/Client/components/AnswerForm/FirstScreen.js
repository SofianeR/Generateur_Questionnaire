import React from "react";

const FirstScreen = ({
  formData,
  pages,
  primaryTheme,
  textTheme,
  setNext,
  index,
}) => {
  return (
    <div className="form-card" key={index}>
      <div className="card-description">
        <p className="form-type" style={{ color: primaryTheme }}>
          Sondage
        </p>
        <p className="form-title" style={{ color: textTheme }}>
          {formData.title}
        </p>
        <p className="form-count" style={{ color: primaryTheme }}>
          {pages} questions
        </p>
        <button
          style={{ backgroundColor: primaryTheme }}
          onClick={() => {
            setNext((prevState) => prevState + 1);
          }}
          className="form-button">
          Commencer
        </button>
      </div>
      {formData.picture && (
        <div className="img-form">
          <img src={formData.picture} />
        </div>
      )}
    </div>
  );
};

export default FirstScreen;
