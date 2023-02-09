const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET POPULAR ROUTES ---------- **/
 router.get('/routes', (req, res) => {
  console.log('req.body:', req.body);
  const sqlQuery =`
      SELECT 
        "gtfs_routes"."route_name",
        "gtfs_routes"."id" AS "route_id",
        COUNT("trips_completed"."route_id") AS "count_completed"
      FROM "gtfs_routes"
      JOIN "trips_completed"
        ON "trips_completed"."route_id" = "gtfs_routes"."id"
      GROUP BY "gtfs_routes"."route_name", "gtfs_routes"."id"
      ORDER BY "count_completed" DESC
      LIMIT 4;`
  pool.query(sqlQuery)
  .then((results) => {
    console.log('Success in GET /popular/routes!')
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /popular/routes: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;
