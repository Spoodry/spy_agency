const router = require('express').Router();
const hitmen_controller = require('../controllers/hitmen_controller');
const passport = require('passport');

router.get('/', hitmen_controller.index);
router.get('/:id', hitmen_controller.show);
router.post('/:id/deactivate', passport.authenticate('cookie', { session : false }), hitmen_controller.deactivate);

module.exports = router;