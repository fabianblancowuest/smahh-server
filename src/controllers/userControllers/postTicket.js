const { Ticket } = require("../../DB_connection")
const {User}= require("../../DB_connection")

const postTicket = async (req, res) => {
  try {
    const {
      issueTitle,
      issueDescription,
      issueType,
      priority,
      userId,
      userName,
      userEmail,
      userLastName,
    } = req.body;

    // Verifica si el ID de usuario existe en la base de datos
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(400).json({
        message: 'Id user does not exist',
      });
    }

    // Crea un nuevo ticket en la base de datos
    const newTicket = await Ticket.create({
      issueTitle,
      issueDescription,
      issueType,
      priority,
      UserId: userId,
      userName,
      userEmail,
      userLastName,
    });

    return res.status(201).json({
      message: 'Ticket created Successfully',
      ticket: newTicket
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error while creating ticket',
      error: error.original ? error.original.message : 'Unknown error'
    });
  }
};

module.exports = {
  postTicket
};
