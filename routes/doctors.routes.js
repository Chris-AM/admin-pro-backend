/**
 * route: /api/doctors
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-flieds");
const { validateJWT } = require("../middlewares/validate-jwt");
const { createDoctor,
    deleteDoctor,
    getDoctorById,
    getDoctors,
    updateDoctor } = require("../controllers/doctors.controller");
const router = Router();

router.get("/",
    validateJWT,
    getDoctors);

router.get("/:id",
    validateJWT,
    getDoctorById)

router.post(
    "/",
    [validateJWT,
        check('name', "Doctor's name is required").not().isEmpty(),
        check('hospital', 'Hospital id must be valid').isMongoId(),
        validateFields
    ],
    createDoctor
);
router.put(
    "/:id",
    [],
    updateDoctor
);
router.delete(
    "/:id",
    deleteDoctor
);

module.exports = router;
