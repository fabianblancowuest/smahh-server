require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } =
	process.env;
const { Sequelize } = require("sequelize");
const TicketModel = require("./models/Ticket");
const UserModel = require("./models/User");

// const sequelize = new Sequelize(
// 	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
// 	{ logging: false, native: false },
// );

const sequelize = new Sequelize(DB_DEPLOY, { logging: false, native: false });

TicketModel(sequelize);
UserModel(sequelize);

const { Ticket, User } = sequelize.models;

User.hasMany(Ticket, {
	foreignKey: {
		name: "UserId",
	},
});
Ticket.belongsTo(User);

module.exports = {
	User,
	Ticket,
	conn: sequelize,
};
