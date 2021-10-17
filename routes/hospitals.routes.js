/**
 * route: /api/hospitals
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-flieds");
const { validateJWT } = require("../middlewares/validate-jwt");
const { createHospital,
    delteHospital,
    getHospitalById,
    getHospitals,
    updateHospital } = require("../controllers/hospitals.controller");
const router = Router();

router.get("/",
    validateJWT,
    getHospitals);

router.get("/:id",
    validateJWT,
    getHospitalById)

router.post(
    "/",
    [
        validateJWT,
        check('name', 'Hospital name is required').not().isEmpty(),
        validateFields
    ],
    createHospital
);
router.put(
    "/:id",
    [],
    updateHospital
);
router.delete(
    "/:id",
    delteHospital
);

module.exports = router;