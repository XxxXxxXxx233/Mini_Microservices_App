const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 8081;

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const content = req.body.content;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({
        id: commentId,
        content,
        status: 'pending'
    })
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://192.168.56.1:8088/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending',
        }
    });

    res.status(201).send(comments);
})

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    if (type === 'CommentModerated') {
        const {id, postId, status, content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id === id);
        comment.status = status;

        await axios.post('http://localhost:8088/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }
    res.send({});
})

app.listen(port, () => {
    console.log(`Posts listening at http://localhost:${port}`)
})