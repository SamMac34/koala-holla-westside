const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js')

// DB CONNECTION


// GET
// GET all songs from database
koalaRouter.get('/', (req, res) => {
    // write SQL query and save that in a variable
    let queryText = 'SELECT * FROM "Koalas";';

    // send SQL query to the database using pool.query
    pool.query(queryText)
    // convention is to use the word 'result to describe
    // what we get back from the database
        .then((result) => {
            console.log('result is: ', result);
            //result.rows is where the data we requested is
            res.send(result.rows);
        }).catch ((error) => {
            console.log('Error making query:', error)
            res.sendStatus(500);
        })
});


// GET for specific id
koalaRouter.get('/:id', (req, res) => {
    // id is a route parameter
    // we use this parameter to identify
    // that we want this specific identified part of the request
    console.log(req.params.id);
    // assign req.params.id to a variable
    const idToGet = req.params.id;

    // write a SQL query that gets back the koala with the
    // specified (parameter) id
    const query = `SELECT * FROM "Koalas" WHERE id=$1;`;

    // use pool.query to access pool 
    // (group of connections between server and database)
    Pool.query(query, [idToGet])

    // .then because query is asynchronous
        .then((result) => {
            
            // result.rows is where the desired part of the
            // result/response is
            console.log(`Song with id of ${idToGet}`, result.rows);

            // send data back to client
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error making database query: ', error);
            res.sendStatus(500);
        })

})


// POST


// PUT


// DELETE

module.exports = koalaRouter;