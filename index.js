const express = require("express");
//creates an instance of express, our app;
const app = express();
const path = require("path");
const PORT = 3005;
const fs = require("fs");

//added comment
//you will always have these 3 lines in an express server;
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//rest API methods - GET, POST, PUT, DELETE

// $.ajax({
//     method: "GET",
//     url: "google.com"
// })
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get('/friends', function (req, res) {
    fs.readFile("myFriends.txt", "utf-8", (err, data) => {
        res.json({ friends: data.split("\n").map(s=> s.trim())})
    })
})

app.get("/test", (req, res) => res.send("HELLO"));

app.post("/test", (req, res) => {
    console.log(req.body);
    fs.appendFile("myFriends.txt", `This is my friend ${req.body.name}, he is ${req.body.age} years old! \n`, ()=> console.log("success!"))
    res.send("HELLO");
})

//this spins up our server;
app.listen(PORT, () => {
    console.log("app is running on port ", PORT)
})