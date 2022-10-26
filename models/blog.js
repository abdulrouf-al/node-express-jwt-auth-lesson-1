const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// to create a model 

const blogSchema = new Schema({
  posted_at: Date,
  title: {
    type: String,
    required: true,
  },
  // snippet:String         enough if there is no other parameter
  snippet: {
    type: String,
    required: true,
    defaults: "new blog"
  },
  body: {
    type: String,
    required: true
  },
  user: {

    id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    email: String,
    //,required: true 

  },
  
  /* comments: [
      {
          type: Schema.Types.ObjectId,
          ref: "Comment"
      }
  ],
  likes: [
      {
          type: Schema.Types.ObjectId,
          ref: "User"
      }
  ] */
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema); //blog is the collection name without the 's'
// when created automatically will create (from thin name 'Blog')  => a collection called  'blogs' 
// the naming here is "*Important*" 
module.exports = Blog;  // to required it in the main page