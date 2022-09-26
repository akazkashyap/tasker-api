const { Router } = require("express")
const User = require("../database/models/user")
const auth = require("../middleware/userAuth")

const router = new Router()

router.post("/signup", async (req, res) => {
    if (!req.body) {
        return res.send("Bad Request")
    }
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        await user.save()
        res.status(201).send({ user })
    } catch (error) {
        res.status(422).send({ error: "Bad request. Try again." })
    }

})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findByCredentails(
            email = req.body.email, password = req.body.password
        )
        if (!user) {
            return res.status(400).send({ error: "Wrong Credentials" })
        }
        const token = user.genAuthToken()
        user.tokens = user.tokens.concat({ token: token })
        await user.save()
        res.status(200).send({ user, token })
    } catch (error) {
        res.status(500)
    }
})

router.get("/profile", auth, (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.send({ error: "Please Authenticate" })
    }
})

router.get("/blog", auth, async (req, res) => {
    try {
        await req.user.populate({
            path: "blogs"
        })
        res.status(200).send(req.user.blogs)
    } catch {
        res.status(400).send({ error: "Something went wrong!" })
    }
})

module.exports = router