const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).header('auth-token')
    }
    try {
        const data = jwt.verify(token, process.env.SECRET) //this will return the eobject given during making the token if verifield successfully
        console.log(data.id)
        req.user = data.id
        next();
    } catch (error) {
        res.status(401).send(error)
    }

}
module.exports = fetchuser;