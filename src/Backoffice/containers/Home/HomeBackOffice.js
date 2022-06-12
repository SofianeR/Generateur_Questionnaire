import React, { useState, useEffect } from "react";

// import packages
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import CardFormComponent from "../../components/Home/CardFormComponent";

const HomeBackoffice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formulaireData, setFormulaireData] = useState([]);

  useEffect(() => {
    // fonction pour récupérer tout les formulaires de questions de la base de données
    const fetchFormulaire = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://sofiane-rehila-94.herokuapp.com/questionForm/all"
        );
        setFormulaireData(response.data);
      } catch (error) {}
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
            <p>En cours de chargement ...</p>
          </div>
        ) : (
          formulaireData.listForm &&
          formulaireData.listForm.map((item, index) => {
            return <CardFormComponent item={item} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default HomeBackoffice;
