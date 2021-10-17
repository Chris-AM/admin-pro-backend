/**
 * Route: /api/users
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const { validateFields } = require("../middlewares/validate-flieds");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/",
  validateJWT,
  getUsers);

router.get("/:id",
  validateJWT,
  getUserById)

router.post(
  "/",
  [
    //middleware which validates that all required fields aren't empty
    check("name", "name is required").not().isEmpty(),
    check("lastName", "last name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields,
  ],
  createUser
);
router.put(
  "/:id",
  [
    //middleware which validates that all required fields aren't empty
    validateJWT,
    check("name", "name is required").not().isEmpty(),
    check("lastName", "last name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("role", "role is required").not().isEmpty(),
    validateFields
  ],
  updateUser
);
router.delete(
  "/:id",
  [

  ],
  deleteUser
);

module.exports = router;
