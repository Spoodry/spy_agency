const router = require('express').Router();
const login_controller = require('../controllers/login_controller');

router.post('/', login_controller.login);

module.exports = router;