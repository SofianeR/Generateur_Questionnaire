import React from "react";

import { useNavigate } from "react-router-dom";

const CardFormComponent = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="item-container" key={item._id}>
      <div className="link">
        <p>Formulaire</p>
      </div>
      <div className="item-title">{item.title}</div>
      <div className="item-buttons">
        <button
          className="edit-button"
          onClick={() => {
            navigate(`/backoffice/update/${item._id}`);
          }}>
          éditer
        </button>
        <button
          className="answer-button"
          onClick={() => {
            navigate(`/backoffice/reponses/${item._id}`, {
              state: item,
            });
          }}>
          Voir les reponses
        </button>
      </div>
    </div>
  );
};

export default CardFormComponent;
