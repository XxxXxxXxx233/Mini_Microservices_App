const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 8083;

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const {type, data} = req.body;

    if (type === 'CommentCreated') {
        data.status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:8088/events', {
            type: 'CommentModerated',
            data: {
                ...data
            }
        })
    }

    res.send({});
})

app.listen(port, () => {
    console.log(`Posts listening at http://localhost:${port}`)
})