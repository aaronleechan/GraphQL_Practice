const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const {dateToString} = require('../helpers/date');
const jwt = require('jsonwebtoken');


module.exports = {
    createUser: args => {
        return UserModel.findOne({email: args.userInput.email}).then(
            user=>{
                if(user){
                    throw new Error('User exists already');
                }
                return bcrypt
                .hash(args.userInput.password, 12)
            }).then(hashpassword =>{
            const user = new UserModel({
                email: args.userInput.email,
                password: hashpassword
            });
            return user.save();
        })
        .then(result =>{
            return {...result._doc,_id: result.id};
        })
        .catch(err =>{
            throw err;
        })
    },
    loginuser: async ({email,password}) =>{
        const user = await UserModel.findOne({email: email});
        if(!user){
            throw new Error('User does not exist!')
        }
        const isEqual = await bcrypt.compare(password,user.password);
        if(!isEqual){
            throw new Error('Passowrd is incorrect')
        }
        const token = jwt.sign({userId: user.id,email: user.email},'somesupersecretkey',{
            expiresIn: '1h'
        });
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    }
};