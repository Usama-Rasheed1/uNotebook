const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();


const JWT_SECRET = 'German$Cars';

// Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({min:5})
],
    async (req, res)=>{
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    // Check whether the user with this email exists already
    
    try{
        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        
        // .then(user => res.json(user))
        // .catch(err => res.json({error: 'Please Enter Unique Email', message: err.message}));

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router