/**
 * Route: /api/users
 */

const {Router} = require('express');
const router = Router();


router.get('/', (req, res) => {
    res.json({
        ok: true,
        users: []
    });
});

module.exports = router;