const BusinessOwnerModel = require('../models/businessowner');
const bcrypt = require('bcryptjs');


module.exports = {
    createBusinessOwner: args =>{
        BusinessOwnerModel.findOne({email: args.businessownerInput.email}).then(
            user => {
                if(user){
                    throw new Error("Business Owner already have account");
                }
                return bcrypt
                .hash(args.businessownerInput.password,12)
            }).then(hashpassword=>{
            const businessOwner = new BusinessOwnerModel({
                email: args.businessownerInput.email,
                password: hashpassword
            });
            return businessOwner.save()
        }).then(result=>{
            return {...result._doc}
        })
        .catch(err=>{
            throw err
        })
    },
    loginbusinessowner: async ({email,password}) =>{
        const user = BusinessOwnerModel.findOne({email: email});
        if(!user){
            throw new Error('User does not exist!')
        }
        const isEqual = await bcrypt.compare(password,user.password);
        if(!isEqual){
            throw new Error('Passowrd is incorrect')
        }
        const token = jwt.sign({userId: user.id,email: user.email},'somesupersecretkey',{
            expireIn: '1h'
        });
        return {
            businessownerId: user.businessownerId,
            token: token,
            tokenExpiration: 1
        }
    }
}