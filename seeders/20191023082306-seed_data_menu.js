'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fs = require('fs')
    const data = JSON.parse(fs.readFileSync('./menu.json','utf8'))
    console.log(data)
    return queryInterface.bulkInsert('Menus',data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Menus', null, {});
  }
};
