module.exports = (sequelize, dataTypes) => {
    let alias = "Ventas";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: dataTypes.DATE,
        paymentMethod: dataTypes.STRING,
        userId: {
            type: dataTypes.INTEGER,
            foreignKey: true,
        },
    };
    let config = {
        tableName: "sales",
        timestamps: false,
    };

    const Sale = sequelize.define(alias, cols, config);

    Sale.associate = (models) => {
        Sale.belongsToMany(models.Productos, {
            as: "products",
            through: "products_sales",
        });
    };

    return Sale;
};
