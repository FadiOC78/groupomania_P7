module.exports = app => {
    const posts = require('../controllers/post');
    const auth = require('../middleware/auth');

    const router = require('express').Router();
    const multer = require('../middleware/multer-config');

    // Post CRUD
    router.post('/', auth, multer, posts.createPost);
    router.get('/:id', auth, posts.getOnePost);
    router.get('/users/:id', auth, posts.getAllUsersPosts);
    router.get('/', auth, posts.getAllPosts);
    router.put('/:id', auth, multer, posts.modifyPost);
    router.delete('/:id', auth, posts.deletePost);

    // Images
    router.get('/image/:id', auth, postCtrl.getOneImage);

    // Like / Unlike
    router.patch('/:id/likeunlike', auth, postCtrl.likeUnlikePost);
    router.post('/:id/postLikedByUser', auth, postCtrl.postLikedByUser);
    router.post('/:id/likeunlike', auth, postCtrl.countLikes);

    app.use('/api/posts', router);
};
