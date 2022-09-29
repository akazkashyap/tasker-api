const mongoose = require("mongoose")

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/tracker"

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true
}).catch((e) => {
    console.log("Cant connect to database!!!")
})