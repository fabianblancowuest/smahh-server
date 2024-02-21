const { Ticket } = require("../../DB_connection");
const { Op } = require("sequelize");

const getAllAndSearchTickets = async (req, res) => {
    try {
        const { search } = req.query;
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

        if (/^\d+$/.test(search)) {
            const ticket = await Ticket.findOne({
                where: { id: search },
            });

            if (ticket) {
                
                return res.status(200).json({
                    tickets: [ticket],
                    totalTickets: 1,
                    totalPages: 1,
                    prev: null,
                    next: null
                });
            } else {
                return res.status(200).json({
                    tickets: [],
                    totalTickets: null,
                    totalPages: null,
                    prev: null,
                    next: null
                });
            }
        } else {
            // Si se proporciona un campo de búsqueda, agregamos la cláusula OR al whereClause
            if (search) {
                whereClause[Op.or] = [
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
                ];
            }

            const allTickets = await Ticket.findAndCountAll({
                where: whereClause,
                limit: perPage,
                offset: (page - 1) * perPage,
                order: [["createdAt", order.toUpperCase()]],
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
                message: "List of tickets obtained successfully",
                tickets: allTickets.rows,
                totalTickets: totalTickets,
                totalPages: totalPages,
                prev: prev,
                next: next,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while trying to obtain tickets" });
    }
};

module.exports = {
    getAllAndSearchTickets,
};
