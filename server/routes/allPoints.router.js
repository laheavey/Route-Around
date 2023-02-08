const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET ALL ROUTES---------- **/
 router.get('/', (req, res) => {
  console.log('req.body:', req.body);
  const sqlQuery =`
  SELECT
  "id",
  "name"
  FROM "points_of_interest"
  ORDER BY "id" ASC;
  `
  pool.query(sqlQuery)
  .then((results) => {
    console.log('Success!', results.rows)
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /allRoutes: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;
