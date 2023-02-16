const postService = require(
  '../services/post.service',
);

const inexiste = 'Post does not exist';
const addPost = async (req, res) => {
  const {
    body: {
      title,
      content,
      categoryIds: categories,
    },
    user: { id: userId },
  } = req;

  const novoPost = await postService
    .addPost({
      title, content, categories, userId,
    });
  const { type, message } = novoPost;
  if (type) {
    return res.status(type)
      .json({ message });
  }
  res.status(201).json(novoPost);
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
    message: inexiste,
  });
};

const upPost = async (req, res) => {
  const { params: { id }, body: {
    title,
    content,
  } } = req;
  const updatedPost = await postService
    .upPost({ id, title, content });
  res.status(200).json(updatedPost);
};

const delPostById = async (req, res) => {
  await postService
    .delPostById(req.params.id);
  res.status(204).end();
};

module.exports = {
  addPost,
  posts,
  postById,
  upPost,
  delPostById,
};
// STOP