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
    sequelize,
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false
  });
  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategoryTable,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
      onDelete: 'cascade'
    })
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'BlogPost',
      onDelete: 'cascade'
    })
  }
  return PostCategoryTable
};
module.exports = PostCategorySchema