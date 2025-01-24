const express = require("express");

const PORT = 3010;
const app = express();


app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'unsafe-inline' 'self' 'nonce-randomKey' https://stackpath.bootstrapcdn.com;"

        // unsafe-inline script is used to allow inline script to exceute our scripts in HTML code
    );

    next();
});

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`server started at http:localhost:${PORT}`)
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
