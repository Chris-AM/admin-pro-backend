const { response, } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const getUsers = async (req, res) => {
  const users = await User.find({}, "name lastName email");

  res.json({
    ok: true,
    msg: "getting users",
    users,
  });
};

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

    res.json({
      ok: true,
      msg: "creating user",
      user,
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
    const updatingUser = await User.findById(uid);
    if (!updatingUser) {
      return res.status(404).json({
        ok: false,
        msg: "User not found or it does not exisist.",
      });
    }

    //updating user (not updating password)
    const {password, google , email, ...fields} = req.body;
    if (updatingUser.email === email) {
      delete fields.email;
    }else{
        const emailExists = await User.findOne({email});
        if (emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'Email already taken'
            })
        }
    }
    

    const userUpdated = await User.findByIdAndUpdate(uid, fields, {new: true});

    res.json({
      ok: true,
      uid,
      user: userUpdated,
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        ok: false,
        msg: "Internal server error. Check logs",
      });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
};
