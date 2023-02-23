const jwt = require('jsonwebtoken')
const JWT_SECRET = 'mananisagoodb$oy';
const fetchuser = async (req, res, next) => {
    // get the user from the jwt token and append the id to the request object.
    const fetchToken = await req.header('auth-token'); // for getting the token from the header which is set in the window browser in the given application for verifying the data for the and to further proceed the data.
    if (!fetchToken) {
        return res.status(401).json({ error: "Access denied" })
    }
    try {

        const fetchString = jwt.verify(fetchToken, JWT_SECRET);
        req.user = fetchString.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please Authenticate using the valid token" })
    }
}
module.exports = fetchuser;