const mongoose = require("mongoose")

const url = process.env.MONGODB_URL

mongoose.connect("mongodb+srv://akaz:HIvXfvbG0LBM5nMk@cluster0.edka0vi.mongodb.net/tracker?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).catch((e) => {
    console.log("Cant connect to database!!!")
})