const router = require('express').Router();
const users = require('../models/users');

router.get('/', async (req, res) => {
    let users_boss = await users.get_by_type(1);

    console.log(users_boss);

    res.send('Hello World!');
});

module.exports = router;