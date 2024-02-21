const { Ticket } = require("../../DB_connection")

const { Op } = require("sequelize");

const getTicketsByUserName = async (req, res) => {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const priority = req.query.priority || "All";
    const status = req.query.status || "All";
    let order = req.query.order || "asc";

    if (!search) {
        return res.status(400).json({ error: "Search parameter is required" });
    }

    try {
        const whereClause = {
            [Op.or]: [
                {
                    userName: {
                        [Op.iLike]: `%${search}%`,
                    },
                },
                {
                    userLastName: {
                        [Op.iLike]: `%${search}%`,
                    },
                },
            ],
        };

        if (priority !== "All") {
            whereClause.priority = priority;
        }

        if (status !== "All") {
            whereClause.status = status;
        }

        const allTicketsFromUser = await Ticket.findAndCountAll({
            where: whereClause,
            limit: perPage,
            offset: (page - 1) * perPage,
            order: [['createdAt', order.toUpperCase()]],
        });

        const totalTickets = allTicketsFromUser.count;
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
            message: "List of tickets obtained successfully",
            tickets: allTicketsFromUser.rows,
            totalTickets: totalTickets,
            totalPages: totalPages,
            prev: prev,
            next: next,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error while trying to find user" });
    }
};

module.exports = {
    getTicketsByUserName,
};