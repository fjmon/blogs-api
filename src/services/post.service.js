const {
  BlogPost,
  PostCategory,
  User,
  Category,
  sequelize,
} = require('../models');

const alt = {
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
  const response = await sequelize
    .transaction(async (taction) => {
      const novaPost = await BlogPost
        .create({ title, content, userId },
          { transaction: taction });
      await Promise.all(categories
        .map(async (categoryId) => PostCategory
          .create({
            postId: novaPost.dataValues.id,
            categoryId,
          }, { transaction: taction })));
      return novaPost;
    });
  return response;
};

const posts = async () => {
  const allPosts = await BlogPost
    .findAll(alt);
  return allPosts;
};

const postById = async (id) => {
  const postId = await BlogPost
    .findByPk(id, alt);
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