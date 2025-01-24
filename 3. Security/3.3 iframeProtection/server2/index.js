const express = require("express")
const app = express()


app.use(express.static('public'))


// It won't allow this webpages in any iframes
// app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "frame-ancestors 'none';")
//     next();
// })


app.get('/iframe-website1', (req, res) => {
    res.sendFile(__dirname + '/public/iframe-website1.html')
})

app.get('/iframe-website2', (req, res) => {
    res.sendFile(__dirname + '/public/iframe-website2.html')
})


const PORT = process.env.PORT || 5011;
app.listen(PORT, () => {
    console.log(`server started at http:localhost:${PORT}`)
})
