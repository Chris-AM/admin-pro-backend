const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Hospital = require("../models/hospital.model");
const { generateJWT } = require("../helpers/jwt")

const getHospitals = async (req, res) => {
    const hospitals = await Hospital.find({}, "name")
        .populate('user', 'name image');
    res.json({
        ok: true,
        msg: 'getting hospitals',
        hospitals
    })
};

const getHospitalById = async (req = request, res = response) => {
    const hospId = req.params.id;
    try {
        const hospital = await Hospital.findById(hospId)
            .populate('user', 'name image');
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital id not found'
            });
        } else {
            res.json({
                ok: true,
                msg: 'hospital found',
                hospital
            })
        }
    } catch (error) {
        console.log('Error -->', error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error. Check logs'
        });
    }
}

const createHospital = async (req = request, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });
    console.log('USER ID -->', uid)
    try {
        const hospitalInDB = await hospital.save();
        res.json({
            ok: true,
            msg: 'Hospital created',
            hospital: hospitalInDB
        });
    } catch (error) {
        console.log('error -->', error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server error. Check Logs'
        });
    }
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
