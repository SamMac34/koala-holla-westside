const express = require('express');
const koalaRouter = express.Router();
const koalas = require('../public/Modules/koalas')

// DB CONNECTION


// GET


// POST
// Post the Koalas
koalaRouter.post('/', (req,res) => {
  // Push and POST the Data that the user submits.
  koalas.push(req.body);
  res.sendStatus(201);
})


// PUT

// DELETE

module.exports = koalaRouter;