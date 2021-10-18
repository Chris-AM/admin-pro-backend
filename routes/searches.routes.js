/**
 * route: /api/search
 */
const { Router } = require('express');
const { getSearchAll, getSearchByCollection } = require('../controllers/searches.controller');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.get('/:searching',
    validateJWT,
    getSearchAll
);

router.get('/collection/:table/:searching', validateJWT, getSearchByCollection)

module.exports = router;