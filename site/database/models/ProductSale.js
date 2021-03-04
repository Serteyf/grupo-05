module.exports = (sequelize, dataTypes) => {
    let alias = "ProductSale";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: dataTypes.INTEGER,
            foreignKey: true       
        },
         saleId: {
            type: dataTypes.INTEGER,
            foreignKey: true    
        },
        quantity: {
            type: dataTypes.INTEGER,
        },
        amount: {
            type: dataTypes.INTEGER,
        }
    };
    let config = {
        tableName: "products_sales",
        timestamps: false
    }

    const ProductSale = sequelize.define(alias, cols, config);

    return ProductSale;
}