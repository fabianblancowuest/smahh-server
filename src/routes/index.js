const {Router} = require("express");
const { staffRouter } = require("./staffRouter");
const { userRouter } = require("./userRouter");
const { login } = require("../controllers/login");
const mainRouter = Router ()

mainRouter.use("/user" , userRouter)
mainRouter.use("/staff", staffRouter)
mainRouter.post("/login", login)

module.exports = mainRouter