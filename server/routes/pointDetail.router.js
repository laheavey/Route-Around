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

module.exports = router;
