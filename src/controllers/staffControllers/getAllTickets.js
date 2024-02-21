const { Ticket } = require("../../DB_connection");

const getAllTickets = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const priority = req.query.priority || "All";
        const status = req.query.status || "All";
        let order = req.query.order || "asc"; 

        let whereClause = {};

        if (priority !== "All") {
            whereClause.priority = priority;
        }

        if (status !== "All") {
            whereClause.status = status;
        }

        const allTickets = await Ticket.findAndCountAll({
            where: whereClause, // {priority: hig} {status: not started}
            limit: perPage,
            offset: (page - 1) * perPage,
            order: [['createdAt', order.toUpperCase()]],
        });

        const totalTickets = allTickets.count;
        const totalPages = Math.ceil(totalTickets / perPage);

        // Calculate the values of "prev" and "next"
        let prev = null;
        let next = null;

        if (page > 1) {
            prev = page - 1;
        }

        if (page < totalPages) {
            next = page + 1;
        }

        return res.status(200).json({
            message: "List of tickets obtained succesfully",
            tickets: allTickets.rows,
            totalTickets: totalTickets,
            totalPages: totalPages,
            prev: prev,
            next: next,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while triying to obtain tickets" });
    }
};

module.exports = {
    getAllTickets
};
