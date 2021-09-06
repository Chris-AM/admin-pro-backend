const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.userID = _id;
    return object;
})

module.exports = model('User', UserSchema);