const { Router } = require('express');

const router = new Router();

router.get('/', (_, res) => res.json({ msg: 'Ok' }));

module.exports = router;
