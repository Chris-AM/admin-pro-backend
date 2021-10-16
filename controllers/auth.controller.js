const { request, response } = require("express");
const bcrypt = require('bcryptjs')
const User = require('../models/user.model');
const { generateJWT } = require("../helpers/jwt")

const login = async(req = request, res = response) => {
    const {email, password} = req.body;

    try {
        //check email
        const dbUser = await User.findOne({email});
        if(!dbUser){
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }
        //check password
        const checkPassword = bcrypt.compareSync(password, dbUser.password);
        if(!checkPassword){
            return res.status(400).json({
                ok: false,
                msg: 'invalid password'
            })
        }
        //create JWT
        const jwt = await generateJWT(dbUser.id);
        res.status(200).json({
            ok: true,
            msg: 'you are at login',
            token: jwt
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error. Check logs'
        });
    }
}

module.exports = {
    login
}