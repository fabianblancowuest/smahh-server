const { User } = require("../../DB_connection");
const { Op } = require("sequelize");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Actualiza solo los campos que se recibieron en el cuerpo de la solicitud
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      // Verifica si el nuevo email ya existe en otros usuarios (excepto el usuario actual)
      const existingUserWithEmail = await User.findOne({
        where: { email, id: { [Op.not]:id } }, // Excluye al usuario actual por su ID
      });
      if (existingUserWithEmail) {
        return res.status(400).json({ error: "Email user already exists" });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      user.email = email;
    }
    if (phoneNumber) {
      user.phone = phoneNumber;
    }
    if (password) {
      user.password = password;
    }

    await user.save();
    return res
      .status(200)
      .json({ message: "User updated successfully", newUser: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error while updating user" });
  }
};

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
		return false
	} else return true
}

module.exports = {
  updateUser,
};



