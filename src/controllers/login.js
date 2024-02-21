const bcrypt = require('bcrypt');
const { User } = require("../DB_connection");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: "Missing data" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compara la contraseña proporcionada con la contraseña almacenada de forma segura
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(403).json({ error: "Incorrect password" });
        }

        return res.status(200).json({
            access: true,
            userType: user.userType,
            userId: user.id,
            userName: user.firstName,
            userEmail: user.email,
            userLastName: user.lastName,
            userPhone: user.phone
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    login
};
