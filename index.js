const path = require("path")
const express = require('express');
const dotenv = require('dotenv').config()
const port = process.env.PORT

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/openai", require("./routes/openaiRoutes"))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log("server started on port:", port);
})