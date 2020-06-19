import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  //state to hold repositories
  const [repositories, setRepositories] = useState([]);

  //retrieve repositories from the back-end and update the repositories state
  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    //POST request to the back-end
    const response = await api.post("/repositories", {
      url: "https://newrepository.com",
      title: `Repo ${Date.now()}`,
      techs: ["Node", "React", "React Native"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    //DELETE request to the back-end
    const response = await api.delete(`/repositories/${id}`);
    //update state if deletion succeeded
    if (response.status === 204) {
      const updatedArray = repositories.filter(
        (repository) => repository.id !== id
      );
      setRepositories(updatedArray);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
