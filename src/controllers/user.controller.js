const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {

    try {
        const users = await User.find();
        return res.status(200).json({ users })
    } catch (error) {
        next(error);
    }
}

const postNewUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const userInBD = await newUser.save();
        return res.status(201).json({ userInBD })
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const userInBD = await User.findOne({alias:req.body.alias});
        console.log('Usuario encontrado ->', userInBD);

        if (!userInBD) {
            const error = new Error();
            error.message = 'Alias does not exist';
            error.status = 404;
            return next(error);
        }

        console.log('Compara ', req.body.password, ' vs ', userInBD.password);
        const isValidPassword = bcrypt.compareSync(req.body.password, userInBD.password);
        userInBD.password = null;

        if (!isValidPassword) {
            const error = new Error();
            error.message = 'Invalid credentials';
            error.status = 403;
            return next(error);
        }

        console.log('Contraseña correcta');
        const token = jwt.sign({ id: userInBD._id, alias: userInBD.alias }, process.env.JWT_SECRET, { expiresIn: '1d'})
        return res.status(201).json(token);

    } catch (error) {
        next(error);
    }
}

const logoutUser = (req, res, next) => {
    try {
        const token = null;
        return res.status(200).json(token);
    } catch (error) {
        return next(error);
    }
}

module.exports = { 
    getAllUsers,
    postNewUser,
    loginUser,
    logoutUser,
};