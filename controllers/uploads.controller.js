const { response, request } = require("express");
const { v4: uuidv4 } = require('uuid');

const uploadFile = async (req = request, res = response) => {

    const table = req.params.table;
    const id = req.params.id;

    //validating tables
    const validatedTable = ['users', 'doctors', 'hospitals'];
    if (!validatedTable.includes(table)) {
        return res.status(400).json({
            ok: false,
            msg: 'Bad Request: table does not exists'
        });
    }
    //validating if there is a file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }
    //processing img
    const file = req.files.image;
    const fileName = file.name.split('.');
    const fileExtension = fileName[fileName.length - 1];

    //validating extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'File not supported'
        });
    }

    //creating file name
    const fileNewName = `${uuidv4()}.${fileExtension}`;

    //path to new file
    const path = `./uploads/${table}/${fileNewName}`;

    file.mv(path, (err) => {
        if (err) {
            console.log('error --> ', err)
            return res.status(500).json({
                ok: false,
                msg: 'error storaging file'
            });
        }
        else {
            res.json({
                ok: true,
                msg: 'File uploaded!',
                fileNewName
            });
        }
    });
}


module.exports = {
    uploadFile
}