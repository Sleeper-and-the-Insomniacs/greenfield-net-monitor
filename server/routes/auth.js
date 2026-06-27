const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  console.info('this is working', req);
  res.status(200);
});

module.exports = router;
