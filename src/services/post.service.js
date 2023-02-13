const {
  BlogPost,
  PostCategory,
  User,
  Category,
  sequelize,
} = require('../models');

const options = {
  include: [
    {
      model: User,
      as: 'user',
      attributes: [
        'id',
        'displayName',
        'email',
        'image',
      ],
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
};

const addPost = async ({
  userId, title, content, categories,
}) => {
  const result = await sequelize
    .transaction(async (taction) => {
      const newPost = await BlogPost
        .create({ title, content, userId },
          { transaction: taction });
      await Promise.all(categories
        .map(async (categoryId) => PostCategory
          .create({
            postId: newPost.dataValues.id,
            categoryId,
          }, { transaction: taction })));
      return newPost;
    });
  return result;
};

const posts = async () => {
  const allPosts = await BlogPost
    .findAll(options);
  return allPosts;
};

const postById = async (id) => {
  const postId = await BlogPost
    .findByPk(id, options);
  return postId;
};

const upPost = async ({
  id,
  title,
  content,
}) => {
  await BlogPost
    .update({ title, content },
      { where: { id } });
  const updatedPost = await postById(id);
  return updatedPost;
};

module.exports = {
  addPost,
  posts,
  postById,
  upPost,
};

// STOP