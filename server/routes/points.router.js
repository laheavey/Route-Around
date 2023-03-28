const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/** ---------- GET ALL POINTS---------- **/
router.get('/all', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
    SELECT "id", "name", "longitude", "latitude"
    FROM "poi_details"
    ORDER BY "name" ASC;`;
  pool.query(sqlQuery)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error => {
    console.log('Error in GET /points/all: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- GET POPULAR POINTS ---------- **/
router.get('/popular', rejectUnauthenticated, (req, res) => {
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
    LIMIT 4;`;
  pool.query(sqlQuery)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error => {
    console.log('Error in GET /points/popular: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- GET POINT DETAIL ---------- **/
router.get('/detail/:id', rejectUnauthenticated, (req, res) => {
  const sqlQueryPoint =`
    SELECT
      "id",
      "name",
      "image_url",
      "street_address",
      "longitude",
      "latitude",
      "description",
      "sources_cited"
    FROM "poi_details"
    WHERE "id" = $1;`;
  const sqlValues = [req.params.id];
  pool.query(sqlQueryPoint, sqlValues)
  .then((results) => {
    res.send(results.rows[0]);
  })
  .catch((error => {
    console.log('Error in GET /points/detail/:id: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- GET POINT DETAIL SOURCES CITED ---------- **/
router.get('/detail/sources/:id', rejectUnauthenticated, (req, res) => {
  const sqlQueryPoint =`
    SELECT
      "id",
      "name",
      "url",
      "poi_id"
    FROM "poi_sources"
    WHERE "poi_id" = $1;`;
  const sqlValues = [req.params.id];
  pool.query(sqlQueryPoint, sqlValues)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error => {
    console.log('Error in GET /points/detail/sources/:id: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- GET POINTS BY ROUTE ---------- **/
router.get('/route/:id', rejectUnauthenticated, (req, res) => {
  const sqlQueryPoint =`
    SELECT 
      "poi_details"."id",
      "poi_details"."name",
      "poi_details"."short_desc",
      "poi_details"."image_url",
      "poi_details"."street_address",
      "poi_details"."longitude",
      "poi_details"."latitude",
      "poi_routes"."poi_order_num"
    FROM "poi_details"
    JOIN "poi_routes"
      ON "poi_details"."id" = "poi_routes"."poi_id"
    WHERE "poi_routes"."route_id" = $1
    ORDER BY "poi_routes"."poi_order_num" ASC;`;
  const sqlValues = [req.params.id];
  pool.query(sqlQueryPoint, sqlValues)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error => {
    console.log('Error in GET /points/route/:id: ', error);
    res.sendStatus(500);
  }))
});

/** ---------- GET SAVED POINTS BY USER ---------- **/
router.get('/saved', rejectUnauthenticated, (req,res) => {
  const sqlQuery = `
    SELECT 
      "poi_saves"."id",
      "poi_saves"."user_id",
      "poi_saves"."poi_id",
      "poi_details"."name"
    FROM "poi_saves"
    JOIN "poi_details"
      ON "poi_saves"."poi_id" = "poi_details"."id"
    WHERE "user_id"=$1
    ORDER BY "poi_details"."name" ASC;`;
  const sqlValues = [req.user.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /points/saved: ', error);
    res.sendStatus(500);
  })
});

/** ---------- POST SAVE POINT ---------- **/
router.post('/save', rejectUnauthenticated, (req,res) => {
  const sqlQuery = `
    INSERT INTO "poi_saves" ("user_id", "poi_id")
    VALUES ($1, $2);`;
  const sqlValues = [req.body.user_id, req.body.poi_id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('Error in POST /points/save: ', error);
    res.sendStatus(500);
  })
});

/** ---------- DELETE SAVED POINT BY USER ---------- **/
router.delete('/saved/delete', rejectUnauthenticated, (req,res) => {
  // console.log('req.body:', req.body);
  const sqlQuery = `
    DELETE FROM "poi_saves"
    WHERE "user_id" = $1 AND "poi_id"=$2;`;
  const sqlValues = [req.user.id, req.body.poi_id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('Error in DELETE /points/saved/delete: ', error);
    res.sendStatus(500);
  })
});

module.exports = router;