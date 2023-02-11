const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');


router.get('/profile/:id', rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});

router.put('/profile/:id', rejectUnauthenticated, (req, res) => {
  
})

module.exports = router;