let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

let app = express();
app.use(cors());
app.use(bodyParser.json());

let data = [
    { message: 'R&D' },
    { description: '...' }
]

app.get('/rnd', (req, res) => {
    res.send(data);
});

app.post('/register', (req, res) => {
    let userData=req.body;
    res.sendStatus(200);
});

app.listen(3000);