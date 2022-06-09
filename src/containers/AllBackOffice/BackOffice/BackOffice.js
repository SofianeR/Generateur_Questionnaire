import React, { useState, useEffect } from "react";

// import packages
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const BackOffice = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formulaireData, setFormulaireData] = useState([]);

  useEffect(() => {
    const fetchFormulaire = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/formList");
        setFormulaireData(response.data);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    fetchFormulaire();
  }, []);
  return (
    <div className="container-backOffice">
      <h1>Formulaires</h1>
      <div className="formulaire-container">
        <Link className="add-formulaire" to={"/backoffice/create"}>
          <FontAwesomeIcon icon={"fa-plus"} size={"2x"} color={"white"} />
          <p>Nouveau formulaire</p>
        </Link>
        {isLoading ? (
          <div>
            <p>en cours de chargement</p>
          </div>
        ) : (
          formulaireData.listForm &&
          formulaireData.listForm.map((item) => {
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
                      navigate(`/backoffice/reponses/${item._id}`);
                    }}>
                    Voir les reponses
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BackOffice;
