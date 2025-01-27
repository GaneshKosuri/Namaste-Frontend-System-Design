const express = require("express")
const app = express()


const redirectToHTTPS = (re, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        // Redirect to HTTPS
        return res.redirect(['https://', req.get('Host'), req.url].join(''))
    }

    next()
}

app.use(redirectToHTTPS)


app.use((req, res, next) => {
    // it will remove x-powered-by info from response headers
    res.removeHeader('X-Powered-By');


    // It will not share any URL
    // 'strict-origin-when-cross-origin' it will only share origin when redirecting to different origin
    res.setHeader('Referral-Policy', 'no-referral');


    res.setHeader('X-Content-Type-Options', 'nosniff');


    // Strict Security Transport

    res.setHeader("Strict-Transport-Security", 'max-age=315360000; includeSubDomains; preload')


    next();
})

app.use(express.static('public'))


app.get('/list', (req, res) => {
    res.send({
        id: 1,
        title: "This is first item"
    })
})

const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
    console.log(`server started at http:localhost:${PORT}`)
})
