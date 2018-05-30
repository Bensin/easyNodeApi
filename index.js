
const express = require('express');

const bodyParser = require('body-parser');

const {mongoose} = require('./config/db');

const app  = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

require('./app/routes/note.routes.js')(app);

app.listen('3000',()=>{
   console.log('server listening port 3000');
});