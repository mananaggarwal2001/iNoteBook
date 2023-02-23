const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');



// create the user using the POST REQUEST USING THE ENDPOINT:- "api/auth/" doesn't require auth in the given application.

// no login required in this auth.js for the authentication for the intial stage.


// THE ENDPOINT NAME IS :- /API/AUTH/CREATEUSER
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
                const user = User(req.body)
                await user.save()
                console.log(req.body)
                res.send(req.body)
            }
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occured in the system will be resolved soon !!!!!")
        }
    })


module.exports = router;