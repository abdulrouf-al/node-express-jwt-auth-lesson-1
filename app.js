const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser= require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const Blog = require('./models/blog');
const methodOverride = require('method-override'); // to delete/update blogs 


const app = express();


const ejsMate = require('ejs-mate');


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

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
app.get('/homePage', (req, res) => res.render('homePage'));
/* app.get('/blogs', (req, res) => res.render('blogs'));
 */


app.get('/blogs', async (req, res) => {
  await Blog.find().sort({ createdAt: -1 })
   .then(result => {
     res.render('blogs', { blogs: result, title: 'All blogs' });
   })
   .catch(err => {
     console.log(err);
   }); 
});


app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
 });



 app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
   .then(result => {
     res.render('details', { blog: result, title: 'Blog Details' });
   })
   .catch(err => {
     console.log(err);
   });
 });

 app.post('/blogs', async (req, res) => {  
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
});





app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);




















