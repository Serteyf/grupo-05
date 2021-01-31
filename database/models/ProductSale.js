module.exports = (sequelize, dataTypes) => {
    let alias = "Ventas de productos";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,           //REVISAR//
            autoIncrement: true         //REVISAR//
        },
         sale_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,           //REVISAR//
            autoIncrement: true         //REVISAR//
        }
    };
    let config = {
        tableName: "products_sales",
        timestamps: false
    }

    const ProductSale = sequelize.define(alias, cols, config);

    return ProductSale;
}