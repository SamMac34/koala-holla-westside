const express = require('express');
const koalaRouter = express.Router();


// DB CONNECTION

// GET

// POST
// Post the Koalas
koalaRouter.post("/", (req, res) => {
  let newKoala = req.body;
  // Insert and use pararmeteraiztion for POST
  let queryText = `INSERT INTO "Koalas" ("name", "gender", "age", "ready_to_transfer","notes")
                   VALUES ($1, $2,$3,$4);`;

  let koalasParams = [newKoala.name, newKoala.gender, newKoala.age,newKoala.ready_to_transfer];
  // Use the Query and Pool
   pool.query(queryText, koalasParams)
    // Get the Response
   .then((response) => {
    //  Send an Ok - Status
     res.sendStatus(201);
    //  Catch any Errors
   }).catch((error) => {
     console.log(`Catch any Errors ${queryText}`, error);
    //  Send me an Error
     res.sendStatus(500);
   })
});

// PUT

// DELETE

module.exports = koalaRouter;
