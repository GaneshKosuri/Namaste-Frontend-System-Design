const express = require("express")
const { join } = require('node:path')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})


app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    res.write('data: Welcome to Server Sent Event \n\n')

    const intervalId = setInterval(() => {
        // Write logic to send notifications or feed like connecting DB and sending notifications 
        res.write(`data: Server time ${new Date().toISOString()}\n\n`)
    }, 4000)

    res.on('close', () => {
        clearInterval(intervalId)
    })
})

app.listen(3000, () => {
    console.log("Server listening at port 3000")
})