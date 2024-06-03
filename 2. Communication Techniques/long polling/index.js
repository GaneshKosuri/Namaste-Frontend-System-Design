const express = require("express")
const app = express()

const PORT = 5111
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})


let data = "initial data"

const waitingClients = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/getData', (req, res) => {
    if (data !== req.query.lastData) {
        res.json({ data })
    } else {
        waitingClients.push(res)
    }
})

// Use POST or PUT
app.get('/updateData', (req, res) => {
    data = req.query.data
    while (waitingClients.length > 0) {
        const client = waitingClients.pop()
        client.json({ data })
    }
    res.send({ success: "Data updated Successfully" })
})