const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const title = req.body.title;
    posts[id] = {
        id,
        title
    }

    await axios.post('http://event-bus-srv-clusterip:8088/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    })

    res.status(201).send(posts[id]);
})

app.post('/events', (req, res) => {
    res.send({});
})

app.listen(port, () => {
    console.log(`Posts listening at http://localhost:${port}`)
})