const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET ALL POINTS---------- **/
 router.get('/', (req, res) => {
  console.log('req.body:', req.body);
  const sqlQuery =`
    SELECT "id", "name"
    FROM "poi_details"`
  pool.query(sqlQuery)
  .then((results) => {
    console.log('Success in GET /allPoints!')
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /allPoints: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;
