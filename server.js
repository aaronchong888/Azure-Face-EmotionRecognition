// this sample API URL corresponds to Face API v1.0 - Detect, and returns the Emotion FaceAttributes
// please refer to the Face API Reference for detailed API usage
var API_URL = "https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion";

// replace this with your own API KEY
var API_KEY = "---YOUR_API_KEY---";

// replace this with your own Azure Blob Storage SAS Signature
var SAS_SIGNATURE = "---YOUR_BLOB_STORAGE_SAS---";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', (req, res) => {
    console.log("[GET] Index page");
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/signature', (req, res) => {
    console.log("[GET] Signature - ");
    console.log(req.query);
    res.send(req.query.bloburi + SAS_SIGNATURE);
});

app.post('/success', (req, res) => {
    console.log("[POST] Success - ");
    console.log(req.body);
    request(
        {
            url: API_URL,
            method: 'POST',
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': API_KEY
            },
            body: {
                'url': req.body.container + "/" + req.body.blob + SAS_SIGNATURE
            }
        }, function (error, response, body) {
            if (error) {
                console.log('Emotion API failed: ' + error);
                res.status(500).send('Emotion API failed: ' + error);
            } else {
                //console.log(body);
                var numofFace = body.length;
                if (typeof numofFace === "undefined") {
                    // Rate limit exceeded
                    res.status(500).send('Emotion API failed: Rate limit is exceeded. Try again later.');
                    console.log(body);
                } else {
                    var totalScore = 0.0;
                    console.log("Faces Detected: " + numofFace);
                    for (var index in body) {
                        if (body[index].hasOwnProperty("faceAttributes")) {
                            if (body[index].faceAttributes.hasOwnProperty("emotion")) {
                                totalScore += body[index].faceAttributes.emotion.happiness;
                            }
                        }
                    }
                    console.log("Total Score: " + totalScore);
                    var avgScore = totalScore / numofFace;
                    console.log("Average Score: " + avgScore);
                    var responseData = {};
                    responseData['filename'] = req.body.name;
                    responseData['numofFace'] = numofFace;
                    responseData['avgScore'] = avgScore;
                    res.json(JSON.stringify(responseData));
                }
            }
        });
});

var port = process.env.PORT || 1337;
app.listen(port, () => console.log('Example app listening on port 1337!'));
