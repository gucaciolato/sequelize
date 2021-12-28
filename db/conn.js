const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch(err) {
//   console.log('Error connecting to database: ' + err);
// }

module.exports = sequelize;