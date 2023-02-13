const { Router } = require('express');
const postController = require(
    '../controllers/post.controller',
);
const { validaPost, validaUpPost } = require(
    '../utils/validadorPost',
);
const verifToken = require(
    '../utils/autorizador',
);

const router = Router();

router.post('/', verifToken,
    validaPost,
    postController.addPost);
router.get('/', verifToken,
    postController.posts);
router.get('/:id', verifToken,
    postController.postById);
    router.put('/:id', verifToken, 
    validaUpPost, 
    postController.upPost);

module.exports = router;