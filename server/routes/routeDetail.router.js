const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET ROUTE DETAIL ---------- **/
 router.get('/:id', (req, res) => {
  const sqlQuery =`
    SELECT 
      "gtfs_routes"."id" AS "route_id",
      "gtfs_routes"."route_name",
      "gtfs_routes"."route_desc",
      "gtfs_routes"."route_url",
      "gtfs_routes"."route_color",
      "trips_completed"."completed_on",
      "poi_details"."id" AS "poi_id",
      "poi_details"."name" AS "poi_name"
    FROM "gtfs_routes"
    JOIN "trips_completed"
      ON "trips_completed"."route_id" = "gtfs_routes"."id"
    JOIN "poi_routes"
      ON "poi_routes"."route_id" = "gtfs_routes"."id"
    JOIN "poi_details"
      ON "poi_details"."id" = "poi_routes"."poi_id"
    WHERE "gtfs_routes"."id"=$1;`
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    console.log('Success in GET routeDetail.router!')
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /routeDetail/:id: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;
