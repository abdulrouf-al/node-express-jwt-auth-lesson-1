const Blog = require('../models/blog');
const passport = require("passport");
 const mongoose = require('mongoose');
const User = require('../models/User');
//blogs
const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 }).populate('user')
    .then(result => {
      res.render('blogs', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}
//blogs/id
const blog_details = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id).populate('user').populate('user');
  console.log(blog);
   Blog.findById(id)
     .then(result => {
      console.log(blog);
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    }); 
}
//blogs/create
const blog_create_get = (req, res) => {
  console.log(req.currentUser)
  res.render('create', { title: 'Create a new blog' });
}
//post
const blog_create_post = (req, res) => {
   
  //const user = new mongoose.Types.ObjectId();
  // const blog = new Blog(req.body,user );
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
    user: req.user._id
  } );
  blog.save()
    .then(result => {
      
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}
//edit


const blog_edit = async (req, res) => {
  const id = req.params.id;console.log(req.currentUser)
  const blog = await Blog.findById(id).then(result => {
    res.render('edit', { blog: result ,title:'edit blog'});

  })
};

/* app.put('/blogs/:id', 
 */  const blog_update = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })//...req.body.result
    .then(result => {
      res.redirect(`/blogs/${ result.id }`)//      res.redirect(`/blogs/${blog.id}`);

    })
};

//delete
const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete,
  blog_edit,
  blog_update
  
}