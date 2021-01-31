module.exports = (sequelize, dataTypes) => {
    let alias = "Productos";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        price:{
            type: dataTypes.INTEGER
        },
        discount:{
            type: dataTypes.INTEGER
        },
        featured:{},
        category_id:{
             type: dataTypes.INTEGER,
            foreignKey: true,           //REVISAR//
            autoIncrement: true         //REVISAR//
        },
        image:{}
    };
    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);

    return Product;
}