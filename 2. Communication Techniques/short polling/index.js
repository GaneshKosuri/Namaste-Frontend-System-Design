const express = require("express")
const app = express()

const PORT = 5111
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})


let data = "initial data"

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/getData', (req, res) => {
    res.send({
        data
    })
})

// Use POST or PUT
app.get('/updateData', (re, res) => {
    data = "Updated Data"
    res.send({
        data
    })
})