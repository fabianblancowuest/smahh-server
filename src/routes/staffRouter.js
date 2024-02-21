const express = require("express");
const { updateTicket } = require("../controllers/staffControllers/updateTicket");
// const { getAllTickets } = require("../controllers/staffControllers/getAllTickets");
// const { getTicketsByUserName } = require("../controllers/staffControllers/getTicketsByUserName");
// const { getTicketById } = require("../controllers/staffControllers/getTicketById");
const { getAllAndSearchTickets } = require("../controllers/staffControllers/getAllAndSearchTickets")

const staffRouter = express.Router();

//  http://localhost:3001/staff ==> before path

staffRouter.put("/update-ticket", updateTicket) // This update the "status" atribute of one specific ticket 

// staffRouter.get("/allTickets", getAllTickets) // This will bring all the tickets from all users 
// staffRouter.get("/search-id/:id", getTicketById)
// staffRouter.get("/search", getTicketsByUserName) //Bring all the tickets from an especific User

staffRouter.get("/tickets" , getAllAndSearchTickets)

module.exports = {
    staffRouter
}