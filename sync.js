const { sequelize, Customer, Order } = require('./models');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Database synced!");
    } catch (error) {
        console.error("Failed to sync database:", error);
    }
};

syncDatabase();