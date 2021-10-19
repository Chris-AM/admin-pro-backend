const fs = require('fs')
const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');

const updateImage = async (table, id, fileNewName) => {

    switch (table) {
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                console.log('User not found');
                return false;
            }
            const oldPath = `./uploads/users/${user.image}`;
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            user.image = fileNewName;
            await user.save();
            return true;
            break;

        case 'doctors':

            break;

        case 'hospitals':

            break;
    }
}

module.exports = {
    updateImage
}