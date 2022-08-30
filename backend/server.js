const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const recipeRoutes = require('./routes/recipeRoutes');
// express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/recipes', recipeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to Database');
    app.listen(
      process.env.PORT_NUMBER,
      console.log('Listening on port: ' + process.env.PORT_NUMBER)
    );
  })
  .catch((err) => {
    console.error(err);
  });
