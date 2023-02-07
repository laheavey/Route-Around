const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET POP ROUTES---------- **/
 router.get('/routes', (req, res) => {
  console.log('req.body:', req.body);
  const sqlQuery =`
    SELECT 
      "transit_routes"."route_long_name",
      COUNT("completed_trips"."transit_route_id") AS "number_completed"
    FROM "transit_routes"
    JOIN "completed_trips"
      ON "completed_trips"."transit_route_id" = "transit_routes"."transit_route_id"
    GROUP BY "transit_routes"."route_long_name"
    ORDER BY "number_completed" DESC;
  `
  pool.query(sqlQuery)

  .then((results) => {
    console.log('Success!', results.rows)
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error making GET for map:', error);
    res.sendStatus(500);
  }))
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
