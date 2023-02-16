'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
//        field: 'post_id',
        type: Sequelize.INTEGER,
        references: {
          model: "blog_posts",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: "CASCADE",
        primaryKey: true,
        onDelete: 'cascade',
      },
      category_id: {
        allowNull: false,
        field: 'category_id',
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: "CASCADE",
        primaryKey: true,
      },      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};
//6.3 aula relacionamento n:n - 