const postService = require(
  '../services/post.service',
);

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
  res.status(200).json(
    await postService
      .posts(),
  );
};

const postById = async (req, res) => {
  const postId = await postService
    .postById(req.params.id);
  if (postId) {
    return res.status(200)
      .json(postId);
  }
  res.status(404).json({
    message: 'Post does not exist',
  });
};

module.exports = {
  addPost,
  posts,
  postById,
};
// teste