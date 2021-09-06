const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');


const getUsers = async (req, res) => {
    const users = await User.find({}, 'name lastName email');

    res.json({
        ok: true,
        msg: 'getting users',
        users
    });
}

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const emailExists = await User.findOne({email});
        
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'email already taken'
            });
        }

        const user = new User(req.body);
        console.log('user created', user);
        
        //encrypt password
        const salt  = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        await user.save();


        res.json({
            ok: true,
            msg: 'creating user',
            user
        });

    } catch (error) {
        console.log('error --->', error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server Error. Check Logs'
        })
    }
}

module.exports = {
    getUsers,
    createUser
}