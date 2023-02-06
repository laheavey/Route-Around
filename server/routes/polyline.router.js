const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET ---------- **/
 router.get('/', (req, res) => {
  // console.log('req.body:', req.body);
  const sqlQuery =`
  SELECT 
    "shape_pt_lon",
    "shape_pt_lat"
  FROM "polyline_route_coords"
  ORDER BY "shape_pt_sequence" ASC;
  `
  pool.query(sqlQuery)

  .then((results) => {
    // console.log('Success!', results.rows)
    res.send(results.rows)
  })
  .catch((error => {
    console.log('Error making GET for map:', error);
    res.sendStatus(500);
  }))
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
