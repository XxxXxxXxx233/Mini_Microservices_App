const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
const port = 8081;

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const content = req.body.content;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({
        id: commentId,
        content
    })
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
})

app.listen(port, () => {
    console.log(`Posts listening at http://localhost:${port}`)
})