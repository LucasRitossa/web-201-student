const express = require('express');
const path = require('path');
//used to do stuff with querys
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

let app = express();
//handles user's requests and responces, simply responds with html files

function homePage(request, response) {
    response.sendFile(path.join(__dirname, 'home.html'));
}

function personPage(request, response){
    //grabs url
    let parsedUrl = url.parse(request.url, true);
    //saves index query value from the parsed url
    //must be a number because of "Number"
    let index = Number(parsedUrl.query.index);
    
    //if user does want people1 (0), or if user isnt trying to use a query (NaN)
    if(index === 0 || index === NaN){
        response.sendFile(path.join(__dirname, 'people0.html'));
    }
    
    else if(index == 1){
        response.sendfile(path.join(__dirname, 'people1.html'));
    }
    
    else if(index == 2){
        response.sendfile(path.join(__dirname, 'people2.html'));
    }
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