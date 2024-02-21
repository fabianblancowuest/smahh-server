const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define("Ticket", {
        issueTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        issueDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        issueType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Not Started', 'In Progress', 'Completed', 'Closed'),
            defaultValue: 'Not Started',
          },
        priority: {
            type: DataTypes.ENUM('High', 'Low', 'Medium'),
            allowNull: false,
        },

        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        userLastName: {
            type: DataTypes.STRING,
        },
        

        userEmail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}