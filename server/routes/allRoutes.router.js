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
    console.log('Success in GET /allRoutes!')
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /allRoutes: ', error);
    res.sendStatus(500);
  }))
});

// router.get('/:id', (req, res) => {
//   console.log('req.body:', req.body);
//   const sqlQuery =`
//   SELECT
//     "gtfs_routes"."route_name",
//     "gtfs_routes"."route_desc"
//   FROM "poi_routes"
//   JOIN "gtfs_routes"
//     ON "poi_routes"."route_id" = "gtfs_routes"."id"
//   WHERE "poi_routes"."poi_id" = $1;`;
//   pool.query(sqlQuery)
//   .then((results) => {
//     console.log('Success in GET /allRoutes/:id!')
//     res.send(results.rows)
//   })
//   .catch((error => {
//     console.log('Error in GET /allRoutes: ', error);
//     res.sendStatus(500);
//   }))
// });

module.exports = router;
