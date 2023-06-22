const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT


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

module.exports = koalaRouter;