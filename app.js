const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
 const flash = require('connect-flash');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const methodOverride = require('method-override'); // to delete/update blogs
const User = require("./models/User");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

//routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const ejsMate = require('ejs-mate');


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
//app.use(session(express-session));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:1000*60*60*24 }//,secure: true
}));
 
app.use(flash());


app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
/* var sessionFlash = function(req, res, next) {
  res.locals.messages = req.flash();
 // console.log(res.locals.messages);
  next();
} */

/* app.use(session({
  secret: "Once again Rusty wins cutest dog!",
  cookie: { maxAge:1000*60*60*24 },//secure: true,
   resave: false,
  saveUninitialized: false,
   
})); */

/* app.use(sessionFlash); */
app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(passport.session());
passport.use('local',new LocalStrategy(User.authenticate())); //register
passport.serializeUser(User.serializeUser()); // get into a session
passport.deserializeUser(User.deserializeUser());



app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/scss'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-icons/font/bootstrap-icons.css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-icons/css/font-awesome.css'));
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/css/font-awesome.min.css'))
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css/font-awesome.min.css'))


// view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');


 
  
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.message = req.flash.message;
  // delete req.session.message;
   next();
});


/* app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
}); */
/* app.get('/flash', function (req, res) {
    if (!req.isAuthenticated()) {
      req.flash('error', 'You are not authenticated');
      return res.redirect('/login')
    }
    req.flash('success', 'Flash is back!')
    res.redirect('/');
  }); */
// routes
/* app.get('*', checkUser); */
app.get('/', (req, res) => res.redirect('/blogs'));
app.get('/homePage', (req, res) => res.render('homePage'));
/* app.get('/blogs', (req, res) => res.render('blogs'));
 */
app.use('/blogs', blogRoutes);
app.use('/', authRoutes);


/* app.get('/blogs', async (req, res) => {
  await Blog.find().sort({ createdAt: -1 })
   .then(result => {
     res.render('blogs', { blogs: result, title: 'All blogs' });
   })
   .catch(err => {
     console.log(err);
   }); 
}); */


/* app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
 }); */



/*  app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
   .then(result => {
     res.render('details', { blog: result, title: 'Blog Details' });
   })
   .catch(err => {
     console.log(err);
   });
 }); */

/*  app.post('/blogs', async (req, res) => {  
  //  <!-- this action="/blogs" should be same with the parameter in app.post to receive  it -->
  // console.log(req.body);
  const blog = new Blog(req.body);
  await blog.save()
    .then(result => {
      res.redirect(`/blogs/${blog.id}`);
    })
    .catch(err => {
      console.log(err);
    });
}); */

 

/* const passport = require('passport');
const TwitterStrategy = require('passport-twitter'); */


/* app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
 */






app.use((err, req, res, next) => {
  console.log(err.status , 500);
  console.log(err.message , 'Oops! something went wrong.');
  req.flash('error', err.message || 'Oops! something went wrong.');
  res.redirect('back');
  next();
});


// database connection
const dbURI = 'mongodb+srv://abd:text1234@nodetuts.w28wcbw.mongodb.net/note-tuts';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(5000, () => {
    console.log('listening On Port 5000');//

  }))
  .catch((err) => console.log(err));




