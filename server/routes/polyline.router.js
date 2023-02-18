const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');

 /** ---------- GET POLYLINE (COORDINATES FOR MAP LINE) ---------- **/
 router.get('/:id', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
  SELECT "shape_pt_lon", "shape_pt_lat"
  FROM "gtfs_shapes"
  WHERE "shape_id" = (
    SELECT "shape_id"
    FROM "gtfs_shapes"
    WHERE "route_id" = $1
    ORDER BY "shape_dist_traveled" DESC
    LIMIT 1
  );`
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    // console.log('results: ', results)
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /polyline/:id: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;
