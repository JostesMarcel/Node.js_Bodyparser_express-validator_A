const bodyParser = require("body-parser")
const express = require("express")
const { body, validationResult } = require("express-validator")

const PORT = 9000
const app = express()
app.set("view engine", "ejs")

const users = []

app.use(bodyParser.urlencoded())

app.use((req, _, next) => {
    console.log("new request", req.method, req.url);
    next()
})

app.get("/", (_, res) => {
    res.render("index", { users })
})

app.post(
    "/",
    body("name").isLength({ min: 1, max: 40 }),
    body("username").isLength({ min: 1, max: 25 }),
    body("email").isEmail(),
    body("comment").isLength({ min: 20, max: 250 }),
    (req, res) => {
        const newPost = req.body
        users.push(newPost)
        res.redirect("/")
    }
)

app.use((req, res) => {
    console.log(req.method, req.url, "route was not found...");
    res.end()
})

app.listen(PORT, () => console.log("Server listening on Port", PORT))