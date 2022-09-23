const jwt = require("jsonwebtoken")
const User = require("../database/models/user")

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decode = jwt.verify(token, "urek@999")
        const user = await User.findById(decode._id)
        if (!user) {
            throw new Error()
        }
        req.user = user
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate" })
    }
    next()
}

module.exports = auth;