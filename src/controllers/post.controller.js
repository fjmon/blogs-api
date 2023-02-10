const postService = require('../services/post.service');

const addPost = async (req, res) => {
  const {
    body: {
      title,
      content,
      categoryIds: categories,
    },
    user: { id: userId },
  } = req;

  const newPost = await postService
    .addPost({
      title, content, categories, userId,
    });
  if (newPost.type) {
    return res.status(newPost.type)
      .json({ message: newPost.message });
  }
  res.status(201).json(newPost);
};

const posts = async (_req, res) => {
  res.status(200).json(postService
    .posts());
};

const postById = async (req, res) => {
  res.status(200).json(await postService
    .postById(req.params.id));
};

module.exports = {
  addPost,
  posts,
  postById,
};
// teste