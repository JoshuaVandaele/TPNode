const express = require('express')
const app = express()
const port = 3000

requests = {}

app.use('/', function (req, res, next) {
    console.log(Date() + " | " + req.url);
    if (requests.hasOwnProperty(req.url)) {
        requests[req.url]+=1
    } else {
        requests[req.url] = 1
    }
    
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/welcome', (req, res) => {
    res.send('Bienvenue sur le TP 1 du cours d\'architecture logicielle')
})

app.get('/secret', (req, res) => {
    res.status(401)
})

app.get('/error', (req, res) => {
    err = {
        "message": ""
    }
    res.status(500).json(err)
})

app.get('/img', (req, res) => {
    res.sendFile("img.png", { root: __dirname })
})

app.get('/redirectMe', (req, res) => {
    res.redirect("https://univ-littoral.fr")
})

app.get('/users/:name', (req, res) => {
    res.send('Bienvenue sur la page de ' + req.params["name"])
})

app.get('/somme', (req, res) => {
    res.send((parseInt(req.query.a) + parseInt(req.query.b))+"")
})

app.get('/metrics', (req, res) => {
    res.send({
        "status": "healthy",
        "requestsCount": requests,
        "uptime": process.uptime()
    })
})

app.use('*', (res, req) => {
    res.send("Cette page n'existe pas!")
    res.status(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})