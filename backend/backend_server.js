const express = require('express');
const app = express();
const port = 3005;
const router = require('./routes/route');
const bodyparser = require('body-parser');

const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/training_nodejs', {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> console.log('Backend server is connected to mongodb server'))
.catch((error) => console.log('Backend server failed to connected with mongodb server'));

app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static('public'));

app.use('/', router);


app.listen(port, () => {
    console.log(`Backend server is lisening on port - ${port}`);
})