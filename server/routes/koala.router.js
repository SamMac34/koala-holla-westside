const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all koalas from the database
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "Koalas";';

  pool
    .query(queryText)
    .then((result) => {
      console.log('result is:', result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error making query:', error);
      res.sendStatus(500);
    });
});

// GET specific koala by ID
router.get('/:id', (req, res) => {
  const idToGet = req.params.id;
  const query = 'SELECT * FROM "Koalas" WHERE id = $1;';
  
  pool
    .query(query, [idToGet])
    .then((result) => {
      console.log(`Koala with id of ${idToGet}:`, result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error making database query:', error);
      res.sendStatus(500);
    });
});

// POST a new koala
router.post('/', (req, res) => {
  const newKoala = req.body;
  console.log('Adding koala', newKoala);

  const queryText = `INSERT INTO "Koalas" ("name", "age", "gender", "ready_to_transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;

  const koalaParams = [
    newKoala.name,
    newKoala.age,
    newKoala.gender,
    newKoala.ready_to_transfer,
    newKoala.notes,
  ];

  pool
    .query(queryText, koalaParams)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error making database query:', error);
      res.sendStatus(500);
    });
});

// UPDATE koala ready_to_transfer value to 'Y' for a specific ID
router.put('/:id', (req, res) => {
  const idToUpdate = req.params.id;
  const query = `UPDATE "Koalas" SET "ready_to_transfer" = 'Y' WHERE "id" = $1;`;

  pool
    .query(query, [idToUpdate])
    .then((result) => {
      console.log('Koala is ready to transfer!', result);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error changing Koala transfer status:', error);
      res.sendStatus(500);
    });
});

// DELETE a koala by ID
router.delete('/:id', (req, res) => {
  const idToDelete = req.params.id;
  const query = `DELETE FROM "Koalas" WHERE "id" = $1`;

  pool
    .query(query, [idToDelete])
    .then((result) => {
      console.log('Koala deleted');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error making database query:', error);
      res.sendStatus(500);
    });
});

module.exports = router;


// const express = require('express');
// const pool = require('../modules/pool');
// const router = express.Router();


// // DB CONNECTION

// // GET
// // GET all koalas from database
// router.get('/', (req, res) => {
//     // write SQL query and save that in a variable
//     let queryText = 'SELECT * FROM "Koalas";';

//     // send SQL query to the database using pool.query
//     pool.query(queryText)
//     // convention is to use the word 'result to describe
//     // what we get back from the database
//         .then((result) => {
//             console.log('result is: ', result);
//             //result.rows is where the data we requested is
//             res.send(result.rows);
//         }).catch ((error) => {
//             console.log('Error making query:', error)
//             res.sendStatus(500);
//         })
// });



// // GET for specific id
// router.get('/:id', (req, res) => {
//     // id is a route parameter
//     // we use this parameter to identify
//     // that we want this specific identified part of the request
//     console.log(req.params.id);
//     // assign req.params.id to a variable
//     const idToGet = req.params.id;

//     // write a SQL query that gets back the koala with the
//     // specified (parameter) id
//     const query = `SELECT * FROM "Koalas" WHERE id=$1;`;

//     // use pool.query to access pool 
//     // (group of connections between server and database)
//     pool.query(query, [idToGet])

//     // .then because query is asynchronous
//         .then((result) => {
            
//             // result.rows is where the desired part of the
//             // result/response is
//             console.log(`Koala with id of ${idToGet}`, result.rows);

//             // send data back to client
//             res.sendStatus(200);
//         }).catch((error) => {
//             console.log('error making database query: ', error);
//             res.sendStatus(500);
//         })

// })

// // POST
// // Post the Koalas
// router.post("/", (req, res) => {
//   let newKoala = req.body;
//   console.log('Adding koala', newKoala)
//   // Insert and use parameterization for POST
//   let queryText = `INSERT INTO "Koalas" ("name", "age", "gender", "ready_to_transfer", "notes")
//                    VALUES ($1, $2, $3, $4, $5);`;
// // let queryText = `INSERT INTO "Koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
// // VALUES ($1, $2, $3, $4, $5);`;

//     let koalasParams = [newKoala.name, newKoala.age, newKoala.gender, newKoala.ready_to_transfer, newKoala.notes];
//     // let koalasParams = [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer];
//   // Use the Query and Pool
//    pool.query(queryText, koalasParams)
//     // Get the Response
//    .then(result => {
//     //  Send an Ok - Status
//      res.sendStatus(201);
//     //  Catch any Errors
//    })
//    .catch(error => {
//      console.log(`Catch any Errors ${queryText}`, error);
//     //  Send me an Error
//      res.sendStatus(500);
//    });
// });



// // PUT request to update transfer value YES/NO 
// router.put('/:id', (req, res) => {
//     let idToUpdate = req.params.id;
//     let query = `UPDATE "Koalas" SET "ready_to_transfer" = 'Y' WHERE "id" = $1;`;
//     pool.query(query, [idToUpdate])
//     .then((results) => {
//         console.log('Koala is Ready to transfer!', results);
//         res.sendStatus(200)
//     }).catch((error) => {
//         console.log('Error changing Koala transfer status', error)
//         res.sendStatus(500)
//     });
// });


// // DELETE
// router.delete('/:id', (req, res) => {
//     let idToDelete = req.params.id;
//     // Use query parameterization to protect the 
//     // database from SQL injection
//     let query = `DELETE FROM "Koalas" WHERE "id" = $1`;
//     // Connect/talk with the database and run the query
//     pool.query(query, [idToDelete])
//         .then((results) => {
//             console.log('koala deleted');
//             // Send status 200 or 'ok' to the client
//             res.sendStatus(200);
//         }).catch((error) => {
//             console.log('Error making database query - in router.delete: ', error);
//             // Send status code 500 or 'internal server error'
//             res.sendStatus(500);
//         });
// })

// module.exports = router;
