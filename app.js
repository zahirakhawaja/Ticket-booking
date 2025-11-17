const express = require("express");
const ejs = require('ejs');
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const User = require("./db/User");
const Compose = require("./db/Compose");
const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: true }));

// setting view engine
app.set("view engine", 'ejs');

// serving static files
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("authenticate");
});

app.get("/register", (req, res) => {
    res.render("authenticate");
});

app.get("/login", (req, res) => {
    res.render("authenticate");
});

app.get("/compose", (req, res) => {
    res.render("home");
});

app.post("/register",async (req, res) => {
    const salts = 10;
    const encryptPwd = await bcrypt.hash(req.body.password,salts);
    const newUser = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        userName: req.body.userName,
        password: encryptPwd
    });
    newUser.save().then(() => {
        res.render("home");
    }).catch((err) => {
        console.log(err);
    });
});

app.post("/login",async (req, res) => {

    await User.findOne({ userName: req.body.userName })
        .then((found) => {
            const pwdMatches = await = bcrypt.compare(req.body.password,found.password)
            if (pwdMatches) {
                res.render("home");
            } else {
                res.send("Invalid credentials");
            }
        })
        .catch((err) => {
            console.error(err);
        });
});

app.post("/compose", (req, res) => {
    const newComposition = new Compose({
        category: req.body.category,
        title: req.body.title,
        content: req.body.content
    });

    newComposition.save().then(() => {
        res.render('home');
    }).catch(err => {
        console.log(err);
    });
});


// function so that i can apply DRY
function renderData(req, res, route) {
    Compose.find({})
        .then((data) => {
            if (data) {
                // console.log(data);
                res.render(route, {data});
            } else {
                console.log("problem problem!");
            }
        })
        .catch((err) => {
            console.log(err);
    });
}

app.get("/shayari", (req, res) => {
    renderData(req, res, "shayari");
});

app.get("/thoughts", (req, res) => {
    renderData(req, res, "thoughts");
});

app.get("/blog", (req, res) => {
    renderData(req, res, "blog");
});

app.get("/quotes", (req, res) => {
    renderData(req, res, "quotes");
});

app.get("/display/:blogId",(req,res)=>{
    const blogId = req.params.blogId;
    // console.log(blogId);

    Compose.findOne({_id: req.params.blogId}).then(foundBlog => {
            res.render('display',{foundBlog});
    })
});

app.get("/logout",(req,res)=>{
    res.render("authenticate");
});
app.get("/home",(req,res)=>{
    res.render("home");
});

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});