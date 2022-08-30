const express = require('express');

const {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controller/recipeController');

// initialse router variable
const router = express.Router();

// GET all recipe
router.get('/', getAllRecipes);

// GET a single recipe
router.get('/:id', getOneRecipe);

// POST a recipe
router.post('/', createRecipe);

// UPDATE a single recipe
router.patch('/:id', updateRecipe);

// DELETE a single recipe
router.delete('/:id', deleteRecipe);

module.exports = router;
