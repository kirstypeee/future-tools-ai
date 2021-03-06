const express = require('express');
const path = require('path');
const helmet = require('helmet');
const send = require('send');
const compression = require('compression');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const Base64Decode = require('base64-stream').Base64Decode;
const fs = require('fs');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const os = require('os');

// API proxy
const proxy = require('./proxy');
const errorHandler = require('./errorHandler');

// asset manifest generated by create-react-app build
const manifest = require('../build/asset-manifest.json');

// The app server
const app = express();

// Guard the app ...
app.use(helmet());

// compress all responses
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }));

/**
 * Parse a base 64 image and return the extension and buffer
 * @param  {String} imageString The image data as base65 string
 * @return {Object}             { type: String, data: Buffer }
 */
function parseBase64Image(imageString) {
    var matches = imageString.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
    var resource = {};

    if (matches.length !== 3) {
        return null;
    }

    resource.type = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    resource.data = new Buffer(matches[2], 'base64');
    return resource;
}


app.use('/classify', async (req, res) => {
    const imgData = req.body.image_data;

    const visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: '7XOsdrQO6q05QoX8eBIPDx1Od9meyT6H_0Vz7iG90D-c'
    });

    const promises = [];

    const classify = new Promise((resolve, reject) => {
        const resource = parseBase64Image(imgData);
        const temp = path.join(os.tmpdir(), uuid.v1() + '.' + resource.type);
        fs.writeFileSync(temp, resource.data);
        const images_file = fs.createReadStream(temp);
        visualRecognition.classify({ images_file, owners: ['me'] }, (err, response) => {
            if (err) {
                console.log('err');
                res.send(err);
                reject(err);
            } else {
                resolve(response);
            }
        });
    });

    const detectFaces = new Promise((resolve, reject) => {
        const resource = parseBase64Image(imgData);
        const temp = path.join(os.tmpdir(), uuid.v1() + '.' + resource.type);
        fs.writeFileSync(temp, resource.data);
        const images_file = fs.createReadStream(temp);
        visualRecognition.detectFaces({ images_file }, (err, response) => {
            if (err) {
                console.log('err');
                res.send(err);
                reject(err);
            } else {
                resolve(response);
            }
        });
    });

    Promise.all([classify, detectFaces]).then((values) => {
        const payload = {
            classify: values[0].images[0].classifiers,
            faces: values[1].images[0].faces[0]
        }

        res.send(payload);
    })
});

// Require HTTPS
if (process.env.NODE_ENV === 'production') {
    // Redirect http to https
    app.enable('trust proxy');
    app.use((req, res, next) => {
        if (req.secure) {
            next();
        } else {
            res.redirect('https://' + req.headers.host + req.url);
        }
    });
}

// Proxy the API
app.use('/api', proxy);

// Serve the static content
app.use(express.static(path.join(__dirname, '..', 'build')));

// Direct all requests to the main page so they can be handled by React Router
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// error handler
app.use(errorHandler);

// Let's start ...
const port = process.env.PORT || 3001;
app.listen(port, err => {
    if (err) {
        console.log(`App crashed: ${err}`);
    } else {
        console.log(`Listening on port ${port}`);
    }
});
