const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8082;

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/events', (req, res) => {
    const {type, data} = req.body;
    if (type === 'PostCreated') { 
        const {id, title} = data;
        posts[id] = {
            id,
            title,
            comments: []
        };
    } else if (type === 'CommentCreated') {
        const {id, content, postId, status} = data;
        posts[postId].comments.push({
            id,
            content,
            status
        })
    } else if (type === 'CommentUpdated') {
        const {id, content, postId, status} = data;
        const comment = posts[postId].comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
    res.send({});
})

app.listen(port, () => {
    console.log(`Posts listening at http://localhost:${port}`)
})