const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel');

// GET ALL RECIPES
const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).sort({ createdAt: -1 });

  res.status(200).json(recipes);
  console.log('GET ALL RECIPES');
};

// GET ONE RECIPE
const getOneRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid Id provided' });
  }

  const recipes = await Recipe.findById(id);
  if (!recipes) {
    return res.status(404).json({ message: 'No recipes found' });
  }

  res.status(200).json(recipes);
  console.log('GET A SINGLE RECIPE');
};

// POST ONE RECIPE
const createRecipe = async (req, res) => {
  const { title, duration, preparation } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push('title');
  }
  if (!duration) {
    emptyFields.push('duration');
  }
  if (!preparation) {
    emptyFields.push('preparation');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: 'Please fill out the fields: ', emptyFields });
  }
  try {
    const recipe = await Recipe.create({ title, duration, preparation });
    res.status(200).json(recipe);
    console.log('POST A RECIPE');
  } catch (e) {
    res.status(404).json({ message: 'INVALID error message: ' + e.message });
  }
};

// UPDATE A RECIPE
const updateRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ message: 'No recipe found' });
    }
    res.status(200).json(recipe);

    console.log('UPDATE A RECIPE');
  } catch (e) {
    res.status(404).json({ message: 'INVALID error: ' + e.message });
  }
};
// DELETE A RECIPE
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid Id' });
  }

  const recipe = await Recipe.findOneAndDelete({ _id: id });
  if (!recipe) {
    return res.status(404).json({ message: 'No recipe found' });
  }
  res.status(200).json(recipe);
  console.log('DELETE A RECIPE');
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
