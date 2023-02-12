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
 router.get('/detail/:id', (req, res) => {
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
    console.log('Error in GET /points/:id: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- GET POINTS BY ROUTE ---------- **/


 /** ---------- GET ROUTE INFO FOR POINT DETAIL PAGE ---------- **/


/** ---------- GET SAVED POINTS BY USER ---------- **/
router.get('/saved', (req,res) => {
  // console.log('Req.user.id: ', req.user.id)
  const sqlQuery = `
  SELECT 
    "poi_saves"."user_id",
    "poi_saves"."poi_id",
    "poi_details"."name"
  FROM "poi_saves"
  JOIN "poi_details"
    ON "poi_saves"."poi_id" = "poi_details"."id"
  WHERE "user_id"=$1;`
  const sqlValues = [req.user.id]
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    // console.log('Success!', results.rows)
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /points/saved: ', error)
  })
})

/** ---------- POST SAVE POINT ---------- **/
router.post('/save', (req,res) => {
  const sqlQuery = `
  INSERT INTO "poi_saves" ("user_id", "poi_id")
  VALUES ($1, $2)`
  const sqlValues = [req.body.user_id, req.body.poi_id]
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('Error in POST /points/save: ', error)
  })
})

/** ---------- DELETE SAVED POINT BY USER ---------- **/
router.delete('/saved/delete', (req,res) => {
  console.log('Req.user.id: ', req.user.id)
  console.log('req.body.poi_id: ', req.body.poi_id)

  const sqlQuery = `
    DELETE FROM "poi_saves"
    WHERE "user_id" = $1 AND "poi_id"=$2;`;
  const sqlValues = [req.user.id, req.body.poi_id]
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    console.log('Success!')
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('Error in DELETE /points/saved: ', error)
  })
})

module.exports = router;