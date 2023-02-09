const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 /** ---------- GET POPULAR POINTS ---------- **/
 router.get('/', (req, res) => {
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

module.exports = router;
