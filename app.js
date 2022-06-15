const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

// Passport Config
require('./config/passport')(passport);
require('./config/adminpassport')(passport)

// DB Config
const db = 'mongodb+srv://segundo:olimpia@cluster0.rutme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose
    .connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/olimpia',require('./routes/Log'));
app.use('/adminDashboard', require('./routes/admin-dashboard.js'));
app.use('/dashboard', require('./routes/dashboard.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
