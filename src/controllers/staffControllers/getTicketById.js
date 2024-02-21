const { Ticket } = require("../../DB_connection")

const getTicketById = async (req, res) => {
    const { id } = req.params

    try {
        const ticket = await Ticket.findOne({
            where: { id: id },
        });

        console.log(ticket);

        if (ticket) {
            return res.status(200).json({
                ticket: [ticket],
            })
        } else {
            return res.status(200).json({ticket: []})
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = {
    getTicketById
};