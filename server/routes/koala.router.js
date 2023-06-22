const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET
Router.get('/:id', (req, res) => {
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