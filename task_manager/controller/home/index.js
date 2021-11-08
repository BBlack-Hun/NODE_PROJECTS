const { Router } = require('express');
const router = Router();

router.get('/', (_, res) => {
  res.send('all items form the file');
});

module.exports = router;
