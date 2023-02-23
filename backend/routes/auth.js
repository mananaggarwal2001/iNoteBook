const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'mananisagoodb$oy';


// create the user using the POST REQUEST USING THE ENDPOINT:- "api/auth/" doesn't require auth in the given application.

// no login required in this auth.js for the authentication for the intial stage.


// ROUTE 1:- THE ENDPOINT NAME IS :- /API/AUTH/CREATEUSER
router.post('/createuser',
    [body('email', 'Enter the valid Email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name', 'Enter the valid of min length 3').isLength({ min: 3 })
    ],
    async (req, res, next) => {
        // if there are errors return bad request and the errors.
        const errors = validationResult(req);

        if (!errors.isEmpty()) { // this is used by the express validator if the validationResult which is defined by the destructing in the above situation is not true then it will  return the 400 status code and the return the error.array() file and terminate the program above.
            return res.status(400).json({ errors: errors.array() });
        }

        // check whether the user exist already or not and if not then create the user otherwise throw the error the user already exist.
        try {

            let givenUser = await User.findOne({ email: req.body.email })
            if (givenUser) {
                return res.status(400).json({ message: "Sorry this user already existis with this email please try with the different emaile address Thank You !!!!" })
            } else {
                const salt = await bcryptjs.genSalt(10)
                const securePassword = await bcryptjs.hash(req.body.password, salt);
                const user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: securePassword

                });
                const data = {
                    user: {
                        _id: user.id
                    }
                }

                const authToken = jwt.sign(data, JWT_SECRET);
                console.log(user)
                res.json({ authToken })
            }
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occured in the system will be resolved soon !!!!!")
        }
    })


// ROUTE 2:- Create the endpoint for authenticating the details of the user and to sign in the user to the given application :- /api/auth/login

router.post('/login',
    [body('email', 'Enter the valid Email').isEmail()
        , body('password', 'Password cannot be blank').exists()
    ]
    , async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ error: "Please Enter the valid credentials and try again !!", details: result.array() })
        } else {
            const { email, password } = req.body; // destructuring used in for fetching the email and the password.
            try {
                const findUser = await User.findOne({ email });
                if (!findUser) {
                    return res.status(400).json({ error: "Try to Login with the Correct Credentials." })
                }
                const passwordMatch = await bcryptjs.compare(password, findUser.password)
                if (!passwordMatch) {
                    return res.status(400).json({ error: "Try to Login with the correct credentials." })
                }

                // if all the credentials are correct then we will send the payload in which the user id will be send

                const data = {
                    user: {
                        id: findUser.id
                    }
                }
                const authToken = jwt.sign(data, JWT_SECRET)
                res.json({ authToken })
            } catch (error) {
                console.log(error.message())
                res.status(500).send("Internal Server Error")
            }
        }
    })

// ROUTE 3 :- GET THE USER DETAILS IN FOR THE PARTICULAR USER .

router.post('/getuser', fetchuser ,async (req, res) => {
    try {
        const findUser = req.user.id
        const resultantUser = await User.findById(findUser).select("-password")
        res.json({resultantUser})
        console.log(resultantUser)

    } catch (error) {
        res.send(500).json({ error: "An error occured in the server" })
        console.log(error.message())
    }
})

module.exports = router;