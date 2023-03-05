const User = require('../Models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {globalAgent} = require("http");
module.exports= class classUser {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    AutoId=1;
    create= async (params) => {
        try {
            const {id, userName, email, password } = params;
               //Check emptyness of the incoming data
            if (!userName || !email || !password) {
                return { message: 'Please enter all the details' };
            }

            //Check if the user already exist or not
            const userExist = await User.findOne({ email: params.email });
            if (userExist) {
                return { message: 'User already exist with the given emailId' };
            }
            //Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(params.password, salt);
            params.password = hashPassword;
            const user = new User(params);
            await user.save();

            await User.findOneAndUpdate(
                {email:params.email},
                {"$inc":{"id":this.AutoId++}},
                {new:true,upsert:true}
            );
            const token = await jwt.sign({
                userName:userName,
                email:email,
            },'secretKey');
            return { success: true, message: 'User registered successfully', data: user };
        } catch (error) {
            return error.message ;
        }
    }
    getAll= async ()=> {
        try {
            const users = await User.find({});
            return users;
        } catch (error) {
            return error.message;
        }
    }
    delete= async (id) => {
        try {
            const user = await User.findOneAndDelete({id:id});
            return { success: true, message: 'User deleted successfully', data: user }
        }catch (error) {
            return { error: error.message };
        }
    }
    update= async (id,params) => {
        try {
            const user=await User.findOneAndUpdate({id:id},params,{new:true});
            return { success: true, message: 'User updated successfully', data: user }
        }catch (error) {
            return { error: error.message };
        }
    }
}
