const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt")

const getUsers = async (req = request, res) => {
  const from = Number(req.query.from) || 0;
 
  const [users, total] = await Promise.all([
    User.find({}, "name lastName email google")
      .skip(from)
      .limit(5),
    User.count()
  ]);

  res.json({
    ok: true,
    msg: "getting users",
    total,
    users,
  });
};

const getUserById = async (req = request, res = response) => {
  const uid = req.params.id;
  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'id User not found'
      });
    } else {
      res.json({
        ok: true,
        msg: "user found",
        user,
      });
    }

  } catch (error) {
    console.log('Error -->', error);
    res.status(500).json({
      ok: false,
      msg: 'Internal server error. Check logs'
    });
  }

}

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "email already taken",
      });
    }

    const user = new User(req.body);
    console.log("user created", user);

    //encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    const jwt = await generateJWT(user.id);

    res.json({
      ok: true,
      msg: "creating user",
      user,
      token: jwt

    });
  } catch (error) {
    console.log("error --->", error);
    res.status(500).json({
      ok: false,
      msg: "Internal server Error. Check Logs",
    });
  }
};

const updateUser = async (req = request, res = response) => {
  //TODO: Validate token and check if it's the correct user
  const uid = req.params.id;
  try {

    const userDB = await User.findById(uid);
    /*****************************
      validating if user exisits
    *****************************/
    //here if doesn't exist
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'id User not found'
      });
    }
    //here if does
    const { password, google, email, ...fields } = req.body;
    //validating if email is already taken
    if (userDB.email !== email) {
      const emailAlreadyTaken = await User.findOne({ email });
      if (emailAlreadyTaken) {
        res.status(401).json({
          ok: false,
          msg: 'email already taken'
        });
      }
    }
    fields.email = email;
    const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true })
    res.json({
      ok: true,
      userID: uid,
      user: updatedUser
    });
  } catch (error) {
    console.log('Internal error, check logs', error);
    res.status(500).json({
      ok: false,
      msg: 'Internal Server Error. Check Logs'
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  const uid = req.params.id;
  try {
    const dbUser = await User.findById(uid);
    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: 'user not found'
      });
    } else {
      res.json({
        ok: true,
        msg: 'droping user',
        userID: uid
      });
      await User.findByIdAndDelete(uid);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Internal server error. Check logs'
    })
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
