const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser= require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


const app = express();


const ejsMate = require('ejs-mate');


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://abd:text1234@nodetuts.w28wcbw.mongodb.net/note-tuts';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(2000, () => {
    console.log('listening On Port 2000');//

  }))
  .catch((err) => console.log(err));
 

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);




 



















