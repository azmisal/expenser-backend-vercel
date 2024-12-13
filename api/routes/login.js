const express = require("express");
const router = express.Router();
const User = require('../model/user');

// Define the `/` route for `/hii`
router.post("/",async (req, res) => {
   const {tag,password} = req.body;
   let check = checkInput(tag);


   try{
    let user;
        if(check === 'Email'){
            user = await User.findOne({email:tag,password});
        }
        else if(check === 'username'){
            user = await User.findOne({username:tag,password});
        }
        else{
            return res.status(400).json({message: "Invalid input"});
        }
        if(!user){
            return res.status(404).json({message:"No user found"});

        }
        else{
            return res.status(200).json({message:"Login Successfull",user});
        }
   }
   catch(err){
    res.status(500).json({message:"Some error occured while Logging In ",err})
   }
});


function checkInput(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

    if (emailRegex.test(input)) {
        return 'Email';
    } else if (usernameRegex.test(input)) {
        return 'Username';
    } else {
        return 'Invalid';
    }
}

module.exports = router;
