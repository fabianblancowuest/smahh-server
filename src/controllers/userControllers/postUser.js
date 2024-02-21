const bcrypt = require('bcrypt');
const { User } = require("../../DB_connection");

const postUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, userType, phoneNumber } = req.body;

        if (!firstName || !lastName || !email || !password || !userType) {
            return res.status(400).json({ error: "Missing data to create user in DataBase" });
        }

        // Genera un hash seguro para la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                firstName,
                lastName,
                password: hashedPassword,
                userType,
                phone: phoneNumber
            }
        });

        if (!created) {
            return res.status(409).json({ error: "This user already exists" });
        }

        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while creating user" });
    }
};

module.exports = {
    postUser
};
