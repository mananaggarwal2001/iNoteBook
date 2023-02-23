const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello from the notes routes in the backend server.")
})


module.exports = router;