const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationPassword } = require("../_shared/utils/validations.utils");

const userSchema = new mongoose.Schema(
{
    name: { type:String, required:true, trim:true },
    alias: { type:String, required:true, trim:true, unique:true },
    password: { type:String, required:true, trim:true},
    role: { type:String, 
        required:true, 
        enum:['admin', 'user'],
        default: 'user'
    }
},
{
    timestamps: true
});

// Ejecutar antes del save
// Genera hash del password para guardarlo cifrado
userSchema.pre('save', function (next) {

    if (!validationPassword(this.password)) {
        const error = new Error();
        error.message = "Invalid password";
        error.status = 400
    }

    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

// Name of collection in MongoDB and schema
const User = mongoose.model('Users', userSchema);

module.exports = User;

