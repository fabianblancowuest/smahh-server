const express = require("express");
const server = express();
const { conn } = require("./DB_connection");
const PORT = 3001;

const morgan = require("morgan");
const mainRouter = require("./routes");

server.use(morgan("dev"));
server.use(express.json());

// Middleware: Configuración de CORS
server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

// http://localhost:3001/
server.use("/", mainRouter);

conn.sync({ force: false }).then(
	server.listen(PORT, "0.0.0.0", () => {
		console.log("Server raised in port: " + PORT);
	}),
);

module.exports = {
	server,
};
