const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET ROUTE DETAIL ---------- **/
 router.get('/:id', (req, res) => {
  console.log('req.params: ',req.params)
  const sqlQuery =`
  SELECT 
    "gtfs_routes"."id" AS "route_id",
    "gtfs_routes"."route_name",
    "gtfs_routes"."route_desc",
    "gtfs_routes"."route_url",
    "gtfs_routes"."route_color",
    JSON_AGG("trips_completed"."completed_on") AS "completed_trips",
    "poi_routes"."poi_id",
    "poi_details"."name" AS "poi_name"
  FROM "gtfs_routes"
  JOIN "trips_completed"
    ON "gtfs_routes"."id" = "trips_completed"."route_id"
  JOIN "poi_routes"
    ON "poi_routes"."route_id" = "gtfs_routes"."id"
  JOIN "poi_details"
    ON "poi_details"."id" = "poi_routes"."poi_id"
  WHERE "gtfs_routes"."id"=$1
  GROUP BY 
  "gtfs_routes"."id",
    "gtfs_routes"."route_name",
    "gtfs_routes"."route_desc",
    "gtfs_routes"."route_url",
    "gtfs_routes"."route_color",
    "poi_routes"."poi_id",
    "poi_details"."name";`;
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    // console.log(results)
    res.send(results.rows[0])
  })
  .catch((error => {
    console.log('Error in GET /routeDetail/:id: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;
