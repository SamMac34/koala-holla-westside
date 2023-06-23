const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// DB CONNECTION


// GET
// GET all koalas from database
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
    pool.query(query, [idToGet])

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


// PUT request to update tranfer value YES/NO 
router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    let query = `UPDATE "Koalas" SET "ready_to_transfer" = 'Y' WHERE "id" = $1;`;
    pool.query(query, [idToUpdate])
    .then((results) => {
        console.log('Koala is Ready to transfer!', results);
        res.sendStatus(200)
    }).catch((error) => {
        console.log('Error changing Koala transfer status', error)
        res.sendStatus(500)
    });
});
// DELETE
router.delete('/:id', (req, res) => {
    let idToDelete = req.params.id;
    // Use query parameterization to protect the 
    // database from SQL injection
    let query = `DELETE FROM "koalas" WHERE id = $1`;
    // Connect/talk with the database and run the query
    pool.query(query, [idToDelete])
        .then((results) => {
            console.log('koala deleted');
            // Send status 200 or 'ok' to the client
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error making database query - in router.delete: ', error);
            // Send status code 500 or 'internal server error'
            res.sendStatus(500);
        });
})

module.exports = router;