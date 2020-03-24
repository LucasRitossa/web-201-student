const express = require('express');
//used to do stuff with querys
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;
//used to pull JSON data
const fs = require('fs');
let app = express();

//reads json file, then puts entire array into var, peopleJson
let rawdata = fs.readFileSync('people.json');
let peopleJson = JSON.parse(rawdata);

//handles user's requests and responces, simply responds with html files
app.set('view engine', 'ejs');

function homePage(request, response) {
    response.render('home',{
        people:peopleJson
    });
}

function personPage(request, response){
    //grabs url
    let parsedUrl = url.parse(request.url, true);
    //saves index query value from the parsed url
    //must be a number because of "Number"
    let index = Number(parsedUrl.query.index);
    
    let currentPerson = peopleJson[index];

    response.render('person', {
        person:currentPerson
    });
}
/*app.get is an easy way to make express check for a path,
then call a function if the path is found */
app.get('/person', personPage);
app.get('/', homePage);

function listenCallback() {
    console.log(`Listening on http://${hostname}:${port}`);
}
//starts the app, listens on a port, and hostname, callback to display if server is running
app.listen(port, hostname, listenCallback);