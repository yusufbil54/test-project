const User = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    try {
        const { userName, email, password } = req.body;
        //Check emptyness of the incoming data
        if (!userName || !email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }

        //Check if the user already exist or not
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.json({ message: 'User already exist with the given emailId' })
        }
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = new User(req.body);
        await user.save();
        const token = await jwt.sign({
            userName:userName,
            email:email,
        },'secretKey');
        return res.cookie({ 'token': token }).json({ success: true, message: 'User registered successfully', data: user })
    } catch (error) {
        return res.json({ error: error.message });
        console.log(error);
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.json({ success: true, message: 'All users', data: users })
    } catch (error) {
        return res.json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.json({ success: true, message: 'User deleted successfully', data: user })
    } catch (error) {
        return res.json({ error: error.message });
    }
}
exports.updateUser = async (req, res) => {
        try {
            const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
            return res.json({ success: true, message: 'User updated successfully', data: user })
        }catch (error) {
            return res.json({ error: error.message });
        }
}

