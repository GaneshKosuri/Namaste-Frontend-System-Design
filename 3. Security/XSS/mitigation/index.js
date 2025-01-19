const express = require("express");

const PORT = 3010;
const app = express();


app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`server started at http:localhost:${PORT}`)
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
