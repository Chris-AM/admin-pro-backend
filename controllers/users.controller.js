const User = require('../models/user.model');


const getUsers = async (req, res) => {
    const users = await User.find({}, 'name lastName email');

    res.json({
        ok: true,
        msg: 'getting users',
        users
    });
}

const createUser = async (req, res) => {
    const body = req.body;
    const user = new User({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        img: body.image,
        role: body.role
    });
    console.log('user created', user);
    await user.save();
    
    res.json({
        ok: true,
        msg: 'creating user',
        user
    });
}

module.exports = {
    getUsers,
    createUser
}