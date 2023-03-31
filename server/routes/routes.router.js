const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/** ---------- GET ALL ROUTES---------- **/
router.get('/all', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
    SELECT "route_id", "route_name", "route_desc"
    FROM "gtfs_routes"
    ORDER BY "route_name" ASC;`;
  pool.query(sqlQuery)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error => {
    console.log('Error in GET /allRoutes: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- GET POPULAR ROUTES ---------- **/
router.get('/popular', (req, res) => {
  const sqlQuery =`
    SELECT 
      "gtfs_routes"."route_name",
      "gtfs_routes"."route_id",
      COUNT("trips_completed"."gtfs_routes_id") AS "count_completed"
    FROM "gtfs_routes"
    JOIN "trips_completed"
      ON "trips_completed"."gtfs_routes_id" = "gtfs_routes"."id"
    GROUP BY "gtfs_routes"."route_name", "gtfs_routes"."route_id"
    ORDER BY "count_completed" DESC
    LIMIT 4;`;
  pool.query(sqlQuery)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error => {
    console.log('Error in GET /popular/routes: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- GET ROUTE DETAIL ---------- **/
router.get('/detail/:id', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
    SELECT 
      "gtfs_routes"."route_id",
      "gtfs_routes"."route_name",
      "gtfs_routes"."route_desc",
      "gtfs_routes"."route_url",
      "gtfs_routes"."route_color",
      "gtfs_routes"."route_type_name",
      "gtfs_routes"."agency_name"
    FROM "gtfs_routes"
    WHERE "gtfs_routes"."route_id"=$1
    GROUP BY 
      "gtfs_routes"."route_id",
      "gtfs_routes"."route_name",
      "gtfs_routes"."route_desc",
      "gtfs_routes"."route_url",
      "gtfs_routes"."route_color",
      "gtfs_routes"."route_type_name",
      "gtfs_routes"."agency_name";`;
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    res.send(results.rows[0]);
  })
  .catch((error => {
    console.log('Error in GET /routes/detail/:id: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- GET ROUTE DETAIL BY POI ID ---------- **/
router.get('/point/:id', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
    SELECT
      "gtfs_routes"."route_name",
      "gtfs_routes"."route_desc"
    FROM "poi_routes"
    JOIN "gtfs_routes"
      ON "poi_routes"."gtfs_routes_id" = "gtfs_routes"."id"
    WHERE "poi_routes"."poi_id" = $1;`;
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error => {
    console.log('Error in GET /routes/point/:id: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- GET COMPLETED TRIPS BY USER ID ---------- **/
router.get('/user/:id', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
    SELECT 
      "gtfs_routes"."route_id",
      "gtfs_routes"."route_name",
      "gtfs_routes"."route_desc",
      "gtfs_routes"."route_url",
      JSON_AGG("trips_completed"."completed_on") AS "completed_trips"
    FROM "gtfs_routes"
    JOIN "trips_completed"
      ON "gtfs_routes"."id" = "trips_completed"."gtfs_routes_id"
    WHERE "trips_completed"."user_id"=$1
    GROUP BY 
      "gtfs_routes"."route_id",
      "gtfs_routes"."route_name",
      "gtfs_routes"."route_desc",
      "gtfs_routes"."route_url";`;
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error => {
    console.log('Error in GET /routes/user/:id: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;