const { Router } = require("express")
const Track = require("../database/models/track")
const auth = require("../middleware/userAuth")

const router = new Router()
router.use(auth)

router.get("/tracks", async (req, res) => {
    try {
        const tracks = await Track.find({ userId: req.user._id })
        res.send(tracks)
    } catch (error) {
        res.status(404)
    }

})

router.post("/tracks", async (req, res) => {
    const { name, locations } = req.body
    try {
        const track = new Track({ name, locations, userId: req.user._id })
        await track.save()
        res.send(track)
    } catch (error) {
        res.status(400)
    }

})


module.exports = router;