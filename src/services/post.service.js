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

const posts = async () => BlogPost
.findAll(alt);

const postById = async (id) => BlogPost
.findByPk(id, alt);

const upPost = async ({
  id,
  title,
  content,
}) => {
  await BlogPost
    .update({ title, content },
      { where: { id } });
  return postById(id);
};

const delPostById = async (id) => BlogPost
.destroy({
    where: { id },
  });

module.exports = {
  addPost,
  posts,
  postById,
  upPost,
  delPostById,
};

// STOP