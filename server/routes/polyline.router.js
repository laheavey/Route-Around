const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/** ---------- GET POLYLINE (COORDINATES FOR MAP LINE) ---------- **/
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
    SELECT "shape_pt_lon", "shape_pt_lat"
    FROM "gtfs_shapes"
    WHERE "shape_id" = (
      SELECT "shape_id"
      FROM "gtfs_shapes"
      JOIN "gtfs_routes"
        ON "gtfs_shapes"."gtfs_routes_id" = "gtfs_routes"."id"
      WHERE "gtfs_routes"."route_id" = $1
      ORDER BY "shape_pt_sequence" DESC
      LIMIT 1
    )
    ORDER BY "shape_pt_sequence" ASC;`;
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error => {
    console.log('Error in GET /polyline/:id: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;