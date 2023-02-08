const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET POPULAR ROUTES---------- **/
 router.get('/routes', (req, res) => {
  console.log('req.body:', req.body);
  const sqlQuery =`
    SELECT 
      "routes"."route_name",
      "routes"."id",
      COUNT("completed_trips"."route_id") AS "count_completed"
    FROM "routes"
    JOIN "completed_trips"
      ON "completed_trips"."route_id" = "routes"."id"
    GROUP BY "routes"."route_name", "routes"."id"
    ORDER BY "count_completed" DESC
    LIMIT 4;
  `
  pool.query(sqlQuery)
  .then((results) => {
    console.log('Success!', results.rows)
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /popular/routes: ', error);
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
