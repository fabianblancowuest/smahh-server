const { Ticket } = require("../../DB_connection")

const getTickets = async (req, res) => {
    try {
        const userId = req.params.id
        const priority = req.query.priority || "All";
        const status= req.query.status || "All";
        const order = req.query.order || "asc";

        let whereClause = {};

        if (priority !== "All") {
            whereClause.priority = priority
        }

        if (status !== "All") {
            whereClause.status = status;
        }

        whereClause.UserId = userId

        const tickets = await Ticket.findAndCountAll({
            where: whereClause,
            order:[["createdAt", order.toUpperCase()]],
        });

        return res.status(200).json({
            message: "List of tickets obtained succesfully",
            tickets: tickets
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while trying to obtain tickets" });
    }
};

module.exports = {
    getTickets
}