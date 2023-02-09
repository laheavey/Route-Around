const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET ALL POINTS---------- **/
 router.get('/all', (req, res) => {
  console.log('req.body:', req.body);
  const sqlQuery =`
    SELECT "id", "name"
    FROM "poi_details"`
  pool.query(sqlQuery)
  .then((results) => {
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /allPoints: ', error);
    res.sendStatus(500);
  }))
});

 /** ---------- GET POPULAR POINTS ---------- **/
 router.get('/popular', (req, res) => {
  // console.log('req.body:', req.body);
  const sqlQuery =`
    SELECT 
      "poi_details"."name",
      "poi_details"."id",
      COUNT("poi_saves"."poi_id") AS "count_saved"
    FROM "poi_details"
    JOIN "poi_saves"
      ON "poi_saves"."poi_id" = "poi_details"."id"
    GROUP BY "poi_details"."name", "poi_details"."id"
    ORDER BY "count_saved" DESC
    LIMIT 4;`
  pool.query(sqlQuery)
  .then((results) => {
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /popular/points: ', error);
    res.sendStatus(500);
  }))
});

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
    res.send(results.rows[0])
  })
  .catch((error => {
    console.log('Error in GET /pointDetail/:id: ', error);
    res.sendStatus(500);
  }))
});

 /** ---------- GET ROUTE INFO FOR POINT DETAIL PAGE ---------- **/
 router.get('/route/:id', (req, res) => {
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
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /pointDetail/route/:id: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- POST SAVE POINT ---------- **/
router.post('/', (req,res) => {
  const sqlQuery = `
  INSERT INTO "poi_saves" ("user_id", "poi_id")
  VALUES ($1, $2)`
  const sqlValues = [req.body.user_id, req.body.poi_id]
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    console.log('Success!')
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('Error in POST /pointDetail: ', error)
  })
})

module.exports = router;