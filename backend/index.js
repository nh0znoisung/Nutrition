// npm install express mongoose body-parser cors nodemon dotenv
import express from 'express';
// Using middleware
import bodyParser from 'body-parser';
import cors from 'cors';
// Using router for architechture 
import nguyenlieu from './routers/nguyenlieu.js';
import nguyenlieuAPI from './routers/nguyenlieuAPI.js';

import monan from './routers/monan.js';
// Using mongoose for database
import mongoose from 'mongoose';
// Dot env for config
import dotenv from 'dotenv';

import { engine } from 'express-handlebars';
// const exphbs = require('express-handlebars');
// import path from 'path';
// // const path = require('path');
// // const methodOverride = require('method-override');
// import methodOverride from 'method-override';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true , limit: '50mb'}));
app.use(cors());

//More router divded into different files (Router Folder)
app.get('/', (req, res) => {
    // More Logical => Controllers Folder
    // res.render('updateMonan', {error: false});
    res.redirect('/nguyenlieu');
});
// app.use('/posts', posts)


app.use('/api/nguyenlieu', nguyenlieuAPI)


// app.get('/', nguyenlieu);
app.use('/nguyenlieu', nguyenlieu)
app.use('/monan', monan)


app.use('/monankem', nguyenlieu)
app.use('/monannguyenlieu', nguyenlieu)



// View Engine\
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));


// Connect to MongoDB. Return a promise
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch(err => console.log(err));


