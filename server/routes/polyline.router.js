const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET POLYLINE ---------- **/
 router.get('/:id', (req, res) => {
  const sqlQuery =`
    SELECT "shape_pt_lon", "shape_pt_lat"
    FROM "gtfs_shapes"
    WHERE "route_id" = $1`
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    console.log('Success in GET /polyline/:id!')
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error in GET /polyline/:id: ', error);
    res.sendStatus(500);
  }))
});

module.exports = router;
