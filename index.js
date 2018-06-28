const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use( bodyParser.json() )     // to support JSON-encoded bodies
    .use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/video', getVideo)
    .get('/getPerson', function (req, res) {

    })
    .get('/tags', getTags)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

function getVideo(req, res) {
    console.log("getting video");
    var id = req.query.id
    console.log(`looking for video with id: ${id}`);
    //TODO: get the video from the DB here



    var result = {title: "Charlie bit my finger",
                   id: "37",
                   link: "garjib"};

    res.json(result);
}

function getTags (req, res) {
    console.log("getting tags");

    var id = req.query.id;

    var result = [{name: "comedy", id: "1"},
                  {name: "cat videos", id: "2"},
                  {name: "action", id: "3"}];

    res.json(result);
}
