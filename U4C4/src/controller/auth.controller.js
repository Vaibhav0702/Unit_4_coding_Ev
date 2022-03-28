
const User = require("../models/user.models");

const jwt = require("jsonwebtoken");


const generateToken =  (user) => {
    return jwt.sign({ user }, 'secrectKey');
}

const register = async (req,res) =>{

    try{
        let user = await User.findOne({
            email:req.body.email
        });


        if(user)
        {
            return res.status(401).send({message:"Already Registerd"});
        }
        user = await User.create(req.body);
        const token = generateToken(user);
        return res.status(200).send({user,token});
    }
    catch(err)
    {
        res.status(400).send({err:err.message});
    }

}



module.exports = {register};