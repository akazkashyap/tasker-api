const mongoose = require("mongoose")


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
}).catch((e) => {
    console.log("Cant connect to database!!!")
})