const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET POINT DETAIL ---------- **/
 router.get('/:id', (req, res) => {
  const sqlQueryPoint =`
    SELECT
      "id",
      "name",
      "image_url",
      "longitude",
      "latitude",
      "description",
      "sources_cited"
    FROM "poi_details"
    WHERE "id" = $1;`
  const sqlValues = [req.params.id];
  pool.query(sqlQueryPoint, sqlValues)
  .then((results) => {
    // console.log('Success in GET routeDetail.router!')
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /pointDetail/:id: ', error);
    res.sendStatus(500);
  }))
});

 /** ---------- GET ROUTE INFO FOR POINT DETAIL ---------- **/
 router.get('/:id/routeInfo', (req, res) => {
  const sqlQueryPoint =`
    SELECT
      "gtfs_routes"."route_name",
      "gtfs_routes"."route_desc"
    FROM "poi_routes"
    JOIN "gtfs_routes"
      ON "poi_routes"."route_id" = "gtfs_routes"."id"
    WHERE "poi_routes"."poi_id" = $1;`;
  const sqlValues = [req.params.id];
  pool.query(sqlQueryPoint, sqlValues)
  .then((results) => {
    // console.log('Success in GET routeDetail.router!')
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /pointDetail/:id: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;
