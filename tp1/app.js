const express = require('express')
const app = express()
const port = 3000

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
    res.send(req.query.a + req.query.b)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})