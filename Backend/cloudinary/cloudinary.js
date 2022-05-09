require('dotenv').config();
const cloudinary = require('cloudinary').v2; //npm i cloudinary

cloudinary.config({
    cloud_name: 'dceiszqyq',
    api_key: '923994428789169',
    api_secret: 'sKWKPkEQg39gzKMazwIe50xlRnI',
});

module.exports = {cloudinary};