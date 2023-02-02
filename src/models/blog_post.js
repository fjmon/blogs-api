const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('Blog_post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false
  });
  return BlogPostTable
  };
module.exports = BlogPostSchema