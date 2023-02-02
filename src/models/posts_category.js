const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('Post_category', 
  {}, 
  {
    tableName: 'post_categories',
    underscored: true,
    timestamps: false
  });

  PostCategoryTable.associate = ({Category, Blog_post}) => {
    Blog_post.belongToMany(Category, {
      through: PostCategorySchema,
      foreignKey: 'post_id',
      otherKey: 'category_id'
    })
    Category.belongToMany(Blog_post, {
      through: PostCategorySchema,
      foreignKey: 'category_id',
      otherKey: 'post_id'
    })
  }


  return PostCategoryTable
  };
module.exports = PostCategorySchema