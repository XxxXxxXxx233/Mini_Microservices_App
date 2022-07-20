const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 8088;

app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://posts-srv-clusterip:8080/events', event) // posts
        .catch((err) => {
            console.log('Error-Posts')
        });
    axios.post('http://comments-srv-clusterip:8081/events', event) // comments
        .catch((err) => {
            console.log('Error-Comments');
        })
    axios.post('http://query-srv-clusterip:8082/events', event) // query
        .catch((err) => {
            console.log('Error-Query');
        })
    axios.post('http://moderation-srv-clusterip:8083/events', event) // moderation
        .catch((err) => {
            console.log('Error-Moderation');
        })

    res.send({status: 'OK'});
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(port, () => {
    console.log(`Event-bus listening at http://localhost:${port}`)
})