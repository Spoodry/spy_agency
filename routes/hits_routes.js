const router = require('express').Router();
const hits_controller = require('../controllers/hits_controller');
const passport = require('passport');

router.get('/', hits_controller.index);
router.get('/:id(\\d+)', hits_controller.show);
router.post('/:id(\\d+)/status', passport.authenticate('cookie', { session : false }), hits_controller.status_update);
router.post('/:id(\\d+)/assignee', passport.authenticate('cookie', { session : false }), hits_controller.assignee_update);
router.get('/create', hits_controller.create);
router.post('/create', passport.authenticate('cookie', { session : false }), hits_controller.new);

module.exports = router;