const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (error, token) => {
            if (error){
                console.log('login error', error);
                reject('uncought error. Could not generate JWT');
            }else{
                resolve(token)
            }
        })
    })
};

module.exports = {
    generateJWT
}