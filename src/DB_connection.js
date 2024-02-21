const { Sequelize } = require('sequelize');
const TicketModel = require("./models/Ticket");
const UserModel = require("./models/User")

const sequelize = new Sequelize(
   "postgres://postgres:1234@localhost:5432/securityDB",
   { logging: false, native: false }
);

// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.

TicketModel(sequelize);
UserModel(sequelize);


// ¡Relaciona tus modelos aquí abajo!
const { Ticket, User } = sequelize.models;

User.hasMany(Ticket, {
   foreignKey: {
      name: "UserId",
   }
});
Ticket.belongsTo(User);


module.exports = {
   User,
   Ticket,
   conn: sequelize,
};
