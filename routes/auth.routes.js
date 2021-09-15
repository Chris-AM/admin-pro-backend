/**
 * path: /api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-flieds')
const router = Router();

router.post('/',
    [
        check('email', 'email is mandatory').isEmail(),
        check('password', 'password is mandatory').not().isEmpty(),
        validateFields
    ],
    login
);

module.exports = router;