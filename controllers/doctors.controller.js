const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/doctor.model");
const { generateJWT } = require("../helpers/jwt")

const getDoctors = async (req, res) => {
    const doctors = await Doctor.find({}, "name hospital")
        .populate('user', 'name image')
        .populate('hospital', 'name image');
    res.json({
        ok: true,
        msg: 'getting doctors',
        doctors
    })
};

const getDoctorById = async (req = request, res = response) => {
    const doctorId = req.params.id;
    try {
        const doctor = await Doctor.findById(doctorId)
            .populate('user', 'name image')
            .populate('hospital', 'name image');
        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor id not found'
            });
        } else {
            res.json({
                ok: true,
                msg: 'Doctor found',
                doctor
            })
        }
    } catch (error) {
        console.log('error -->', error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error. Check Logs'
        })
    }
}

const createDoctor = async (req = request, res = response) => {
    const uid = req.uid;
    const hospitalid = req.params.hospital
    const doctor = new Doctor({
        user: uid,
        hospital: hospitalid,
        ...req.body
    });
    console.log('uid --> ', uid);
    console.log('hid --->', hospitalid);
    try {
        const doctorInDb = await doctor.save();
        res.json({
            ok: true,
            msg: 'doctor added',
            doctor: doctorInDb,

        });
    } catch (error) {
        console.log('Error --->', error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error. Check Logs',
        })
    }
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
