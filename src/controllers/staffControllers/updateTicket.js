const { Ticket } = require("../../DB_connection");

const updateTicket = async (req, res) => {
  try {
    const { ticketId, newStatus } = req.body;
    if (ticketId && newStatus) { 
      const [updatedRowCount, [updatedTicket]] = await Ticket.update(
        { status: newStatus },
        { returning: true, where: { id: ticketId } }
      );

      if (updatedRowCount === 0) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      return res.status(200).json({
        message: "Ticket updated successfully",
        updatedTicket: updatedTicket
      });
    } else {
      return res.status(400).json({ message: "Ticket not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating Ticket' });
  }
};

module.exports = {
  updateTicket
};

/*La función Ticket.update en Sequelize devuelve un arreglo de dos elementos: 
el número de filas afectadas y los registros actualizados. 

Agregar { returning: true } en la opción de Ticket.update para que devuelva los registros actualizados.

Desestructurar el resultado de Ticket.update para obtener el número de filas actualizadas y el registro actualizado.

Verificar si updatedRowCount es igual a 0 para determinar si se encontró o no el ticket. Si no se encuentra, devuelve un código de estado 404.
 */