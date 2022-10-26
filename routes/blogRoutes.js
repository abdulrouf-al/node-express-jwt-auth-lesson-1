const express = require('express');
const blogController = require('../controllers/blogController');
const { isLoggedIn,isAuthor } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/create',isLoggedIn, blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/',isLoggedIn, blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id',isLoggedIn,isAuthor, blogController.blog_delete);

router.get('/:id/edit',isLoggedIn,isAuthor, blogController.blog_edit);
router.put('/:id',isLoggedIn,isAuthor, blogController.blog_update);
module.exports = router;