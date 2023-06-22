const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT request to update tranfer value YES/NO 
router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    let query = `UPDATE "koalas" SET "ready_to_transfer" = yes; WHERE "id" = $1;`;
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

module.exports = koalaRouter;