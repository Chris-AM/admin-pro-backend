const { request, response } = require("express");
const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');

const getSearchAll = async (req = request, res = response) => {
    const searching = req.params.searching;
    const regex = new RegExp(searching, 'i');

    const [users, hospitals, doctor] = await Promise.all([
        User.find({ name: regex, lastName: regex }),
        Hospital.find({ name: regex }),
        Doctor.find({ name: regex })
    ]);

    return res.status(200).json({
        ok: true,
        msg: 'searching',
        users,
        hospitals,
        doctor
    });
}

const getSearchByCollection = async (req = request, res = response) => {
    const table = req.params.table
    const searching = req.params.searching;
    const regex = new RegExp(searching, 'i');

    let data = [];
    switch (table) {
        case 'users':
            data = await User.find({ name: regex, lastName: regex })
            break;

        case 'doctors':
            data = await Doctor.find({ name: regex })
                .populate('user', 'name img')
                .populate('hospital', 'name img');
            break;

        case 'hospitals':
            data = await Hospital.find({ name: regex })
                .populate('user', 'name img');
            break;

        default:
            return res.status(404).json({
                ok: false,
                msg: 'table not found: Options: users/doctors/hospitals'
            });
    }
    
    return res.status(200).json({
        ok: true,
        msg: 'searching',
        data
    });

}

module.exports = {
    getSearchAll,
    getSearchByCollection
}