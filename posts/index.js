const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const title = req.body.title;
    posts[id] = {
        id,
        title
    }
    res.status(201).send(posts[id]);
})

app.listen(port, () => {
    console.log(`Posts listening at http://localhost:${port}`)
})