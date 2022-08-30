import React, { useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import '../css/RecipeForm.css';

function RecipeForm() {
  const { dispatch } = useRecipesContext();

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [preparation, setPreparation] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = { title, duration, preparation };

    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(newRecipe),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle('');
      setDuration('');
      setPreparation('');
      setError(null);
      setEmptyFields([]);
      console.log('new Recipe added: ', json);
      dispatch({ type: 'CREATE_RECIPE', payload: json });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <span className="heading">Add a New Recipe</span>

      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Title:{' '}
        </label>
        <input
          className={`form-input ${
            emptyFields.includes('title') ? 'error form-input' : ''
          }`}
          type="text"
          id="title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />

        <label className="form-label" htmlFor="duration">
          Duration (in hrs):{' '}
        </label>
        <input
          className={`form-input ${
            emptyFields.includes('duration') ? 'error form-input' : ''
          }`}
          type="number"
          id="duration"
          onChange={(event) => setDuration(event.target.value)}
          value={duration}
        />

        <label className="form-label" htmlFor="preparation">
          Preparation:{' '}
        </label>
        <textarea
          className={`form-input ${
            emptyFields.includes('preparation') ? 'error form-input' : ''
          }`}
          type="text"
          id="preparation"
          rows="10"
          onChange={(event) => setPreparation(event.target.value)}
          value={preparation}
        />
      </div>

      <button className="button button-form">Submit</button>
      {error && <div className="error-block">{error + emptyFields}</div>}
    </form>
  );
}

export default RecipeForm;
