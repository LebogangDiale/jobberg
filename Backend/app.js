const express = require("express");
const bodyParser =require("body-parser");
const cors = require('cors');
const morgan = require('morgan');



const app = express();

var corsOptions={
    origin:'http://localhost:4315'
}

app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const candidateRoutes = require('./api/routes/candidate');
const adminRoutes = require('./api/routes/admin');
const guestRoutes = require('./api/routes/guest');
const userRoutes = require('./api/routes/user');
const messageRoutes = require('./api/routes/messages')

app.use(userRoutes, candidateRoutes, adminRoutes, guestRoutes,messageRoutes);

app.get('/', (req,res)=>{
    res.send("Hello world!!!");
});

app.use((req, res, next) => {
    const error = new Error('Url not found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;