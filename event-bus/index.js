const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 8088;

app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:8080/events', event); // posts
    axios.post('http://localhost:8081/events', event); // comments
    axios.post('http://localhost:8082/events', event); // query
    axios.post('http://localhost:8083/events', event); // moderation

    res.send({status: 'OK'});
})

app.listen(port, () => {
    console.log(`Event-bus listening at http://localhost:${port}`)
})