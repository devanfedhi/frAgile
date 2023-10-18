/**
 * Setting up dependicies
 */
const express = require('express');
let app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("node_modules/bootstrap/dist/css"));

const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views/");

const print = console.log;
const PORT_NUMBER = 8080;

app.listen(PORT_NUMBER, function () {
    print(`listening on port ${PORT_NUMBER}`);
})


/// Functions ///

function sprintIdGenerator(){
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const firstLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    const secondLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    const fourDigits = Math.floor(1000 + Math.random() * 9000);
    return `C${firstLetter}${secondLetter}-${fourDigits}`;
  };


/// Routes ///

const Sprint = require('./models/sprint.js');
sprintArray = [];

/**
 * For the home page
 */
app.get('/', function (req, res) {
    fileName = VIEWS_PATH + "index.html";
    res.sendFile(fileName);
});

/**
 * Route user to the create sprint page
 */
app.get('/sprint/create', function (req, res) {
    fileName = VIEWS_PATH + "sprint-create.html";
    res.sendFile(fileName);
});

/**
 * Post request that creates a new sprint by querying data from the sprint-create.html page
 */
app.post('/sprint/create', function (req, res) {
    let obj = req.body;
    let sprintId = sprintIdGenerator();
    let sprintName = obj.sprintName;
    let sprintStartDate = obj.sprintStartDate;
    let sprintEndDate = obj.sprintEndDate;

    let newSprint = new Sprint(sprintId, sprintName, sprintStartDate, sprintEndDate);
    sprintArray.push(newSprint);

    res.redirect('/sprint/list')
});

/**
 * Routes user to the SprintBoard page.
 */
app.get('/sprint/list', function (req, res) {
    res.render("sprint-list", { sprintArray: sprintArray }); // This means that we are passing sprintArray to the HTML page. We can access stuff in the html page. 
});




// const list_el = document.getElementById("list");
// const create_btn_el = document.getElementById("create");

// let todos = []

// create_btn_el.addEventListener('click',CreateNewTodo);

// function CreateNewTodo () {
//     console.log("Create New Todo")
// }

