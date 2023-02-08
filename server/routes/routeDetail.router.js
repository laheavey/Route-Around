const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET ROUTE DETAIL ---------- **/
 router.get('/:id', (req, res) => {
  console.log('req.params:', req.params);
  const sqlQuery =`
    SELECT 
      "routes"."id" AS "route_id",
      "routes"."route_name",
      "routes"."route_desc",
      "routes"."route_url",
      "completed_trips"."completed_on",
      "points_of_interest"."id" AS "poi_id",
      "points_of_interest"."name" AS "poi_name"
    FROM "routes"
    JOIN "completed_trips"
      ON "completed_trips"."route_id" = "routes"."id"
    JOIN "poi_route_join"
      ON "poi_route_join"."route_id" = "routes"."id"
    JOIN "points_of_interest"
      ON "points_of_interest"."id" = "poi_route_join"."poi_id"
    WHERE "routes"."id"=$1;
  `
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    console.log('Success!', results.rows)
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /routeDetail/:id: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;
