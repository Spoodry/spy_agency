const router = require('express').Router();
const register_controller = require('../controllers/register_controller');

router.get('/', register_controller.index);
router.post('/', register_controller.create);

module.exports = router;