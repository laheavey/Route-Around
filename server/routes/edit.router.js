const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/** ---------- GET USER ID/AUTHENTICATE ---------- **/
router.get('/profile/:id', rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});

/** ---------- UPDATE USER EMAIL & PROFILE PIC ---------- **/
router.put('/profile/:id', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
    UPDATE "user"
    SET "email" = $1, "profile_img" = $2
    WHERE "id" = $3;`;
  const sqlValues = [req.body.email, req.body.profile_img, req.body.id];
  pool.query(sqlQuery,sqlValues)
  .then((response) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('Error in PUT /edit/profile/:id: ', error);
    res.sendStatus(500);
  })
});

module.exports = router;