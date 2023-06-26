const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    try {
        jwt.verify(req.cookies.jwt_sa, process.env.SECRETORKEY, async (err, decode) => {
            if(err) {
                res.redirect('/');
            } else {
                res.render('hits', { success: true });
            }
        });
    } catch (e) {
        console.log("[ERROR]: " + e);
        return res.status(403).send({ error: 'Se ha encontrado un error.' });
    }
});

module.exports = router;