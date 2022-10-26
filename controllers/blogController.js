const Blog = require('../models/blog');
const passport = require("passport");
const mongoose = require('mongoose');
const User = require('../models/User');
const moment = require('moment'); // require 21/09/2022
moment.locale('en');
 console.log(moment('2022-09-25T17:22:44.889+00:00').format('DD/MM/YYYY'));
  console.log(moment('2022-09-25T17:22:44.889+00:00').fromNow());
    




  //blogs
  const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }).populate('user', 'username')
      .then(result => {
        moment.locale('ar');
        res.render('blogs', { blogs: result,moment });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //blogs/id
  const blog_details = async (req, res) => {
    const id = req.params.id;
    //const blog = await Blog.findById(id).populate('user');//.populate('user') &&  Blog.comments.push(comment);
    Blog.findById(id)
      .then(result => {
        moment.locale('en');
        res.render('details', { blog: result ,moment: moment});
      })
      .catch(err => {
        console.log(err);
        res.render('404', { title: 'Blog not found' });
      });
  }
  //blogs/create
  const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  }
  //post
  const blog_create_post = (req, res) => {

    //const user = new mongoose.Types.ObjectId();
    // const blog = new Blog(req.body,user );
    var oldUser = {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }

    const blog = new Blog({
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
      user: oldUser,
      
    });
    blog.save()
      .then(result => {
        req.flash('success', 'Your blog has been created');
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  }
  //edit

  //blog_edit
const blog_edit = async (req, res) => {
    
    const id = req.params.id;
  const blog = await Blog.findById(id).then(result => {
    res.render('edit', { blog: result, title: 'edit blog' });

  }).catch(err => {
    console.log(err);
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