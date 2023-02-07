const { Category } = require('../models');

const addCategory = async (category) => ({ 
    type: null, 
    message: await Category.create(category) });

  module.exports = {
    addCategory,
  };