const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();


const JWT_SECRET = 'German$Cars';

// ROUTE-1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({min:5})
],
    async (req, res)=>{
    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()})
    }

    // Check whether the user with this email exists already
    
    try{
        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.status(400).json({success, error: "Sorry a user with this email already exists"})
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
        success=true;
        res.json({success, authToken});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// At LOGIN:
// ROUTE-2: Auth a User using: POST "/api/auth/login". No login required

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()

],
    async (req, res)=>{
        let success = false;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {email, password} = req.body;
        try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: "Please use correct credentials to login"});
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({success, error: "Please use correct credentials to login"});
            }
            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, authToken});
        } catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })



// ROUTE-3: Get Logged-in User using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the request object
        const user = await User.findById(userId).select("-password"); // Find the user by ID and exclude the password field
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
