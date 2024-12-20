const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

// Web Hook
app.post("/webhook", (req, res) => {

    const payload = req.body

    console.log("recieved webhook from payload", paylod)

    res.status(200).send("Web hook recieved successfully")
})


app.listen(3000, () => {
    console.log("Server listening at port 3000")
})