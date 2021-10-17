const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt")

const getDoctors = async (req, res) => {
    res.json({
        ok: true,
        msg: 'getDoctors'
    })
};

const getDoctorById = async (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'getDoctorById'
    })
}

const createDoctor = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'createDoctor'
    })
};

const updateDoctor = async (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'updateDoctor'
    })
};

const deleteDoctor = async (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteDoctor'
    })
}

module.exports = {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
};
