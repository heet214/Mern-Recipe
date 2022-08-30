import React, { useEffect } from 'react';
import '../css/Home.css';
import { useRecipesContext } from '../hooks/useRecipesContext';
//import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// components
import RecipeDetails from './RecipeDetails';
import RecipeForm from './RecipeForm';

const Home = () => {
  const { recipes, dispatch } = useRecipesContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      //fetching
      const response = await fetch('/api/recipes');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_RECIPES', payload: json });
        console.log(json);
      }
    };
    fetchRecipes();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="recipe_list">
        {recipes &&
          recipes.map((recipe) => (
            <RecipeDetails recipe={recipe} key={recipe._id} />
          ))}
      </div>
      <div className="recipe_form">
        <RecipeForm />
      </div>
    </div>
  );
};

export default Home;
