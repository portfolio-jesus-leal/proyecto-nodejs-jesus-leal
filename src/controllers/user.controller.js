const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
// GET all users
//
const getAllUsers = async (req, res, next) => {

    try {
        const users = await User.find();
        return res.status(200).json({ users })
    } catch (error) {
        next(error);
    }
}

//
// GET a user by id
//
const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  };

//
// GET a user by alias
//
const getUserByAlias = async (req, res) => {
    try {
      const { alias } = req.params;
      const user = await User.find({ alias });
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  };

//
// POST - Create a new user
//
const postNewUser = async (req, res, next) => {
    const { name, alias, password, role } = req.body;

    try {
        const newUser = new User({
            name: name,
            alias: alias.toLowerCase(),
            password: password,
            role: role.toLowerCase(),
        });
        const userInBD = await newUser.save();
        return res.status(201).json({ userInBD })
    } catch (error) {
        next(error);
    }
}

//
// POST - Login
//
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

//
// POST - Logout
//
const logoutUser = (req, res, next) => {
    try {
        const token = null;
        return res.status(200).json(token);
    } catch (error) {
        return next(error);
    }
}

//
// PUT - Update a user
//
const updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, alias, password, role } = req.body;

        const updateUser = await User.findByIdAndUpdate(id, {
            name: name,
            alias: alias.toLowerCase(),
            password: password,
            role: role.toLowerCase(),
        });
        return res.status(200).json(updateUser);

    } catch (error) {
        return next(error);
    }
}

//
// PATH Update password by id
//
const updateUserPasswordById = async (req, res, next) => {
    try {
        const { id } = req.params;

        await User.findByIdAndUpdate(id, { password: req.body.password });
        return res.status(204).json();
        
    } catch (error) {
        return next(error);
    }
}

//
// DELETE User by Id
//
const deleteUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const user = await User.findByIdAndDelete(id);
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  };

module.exports = { 
    getAllUsers,
    getUserById,
    getUserByAlias,
    postNewUser,
    loginUser,
    logoutUser,
    updateUserById,
    updateUserPasswordById,
    deleteUserById,
};