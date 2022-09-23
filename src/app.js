require("./database/mongoose")
const express = require("express")
const userRoutes = require("./routes/userRoutes")
const trackRoutes = require("./routes/trackRoutes")

//const cors = require("cors")

const app = express();

const PORT = process.env.PORT || 3000

/*const corsOpts = {
    origin: '*',
    methods: [
      'GET',
      'POST',
    ],
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
app.use(cors(corsOpts));*/

app.use(express.json())
app.use(userRoutes)
app.use(trackRoutes)




app.listen(PORT, () => {
  console.log("server running on port 3000")
})
