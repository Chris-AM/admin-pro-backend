const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt")

const getHospitals = async (req, res) => {
    res.json({
        ok: true,
        msg: 'getHospital'
    })
};

const getHospitalById = async (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'getHospitalById'
    })
}

const createHospital = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'createHospital'
    })
};

const updateHospital = async (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'updateHospital'
    })
};

const delteHospital = async (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'delteHospital'
    })
}

module.exports = {
    getHospitals,
    getHospitalById,
    createHospital,
    updateHospital,
    delteHospital
};
