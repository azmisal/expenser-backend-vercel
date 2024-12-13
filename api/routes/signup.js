const express = require("express");
const router = express.Router();
// const Expense = require("../model/expense");
const User = require('../model/user')


router.post("/",async (req,res)=>{
    const {username,email, password, monthlyLimit} = req.body;

    try{
        let emailUser = await User.findOne({email});
        if(emailUser){
            return res.status(400).json({message:"Email already Exist"})
        }
        let nameUser = await User.findOne({username});
        if(nameUser) {
            return res.status(400).json({message: "Username already exists"});
        }
        const user = new User({
            username,
            email,
            password,
            monthlyLimit
        });

        await user.save();
        return res.status(200).json({message:"Signup Successfull"})

    }
    catch(err){
        res.status(500).json({message:"Error Occured while Signing Up", err});
    }

});

module.exports = router;