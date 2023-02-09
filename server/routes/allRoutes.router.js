const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET ALL ROUTES---------- **/
 router.get('/', (req, res) => {
  console.log('req.body:', req.body);
  const sqlQuery =`
    SELECT "id", "route_name", "route_desc"
    FROM "gtfs_routes"`
  pool.query(sqlQuery)
  .then((results) => {
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /allRoutes: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;
