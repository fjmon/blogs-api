const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
  }, {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false
    });
  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategoryTable,
      foreignKey: 'post_id',
      otherKey: 'category_id'
    })
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategoryTable,
      foreignKey: 'category_id',
      otherKey: 'post_id'
    })
  }
  return PostCategoryTable
};
module.exports = PostCategorySchema