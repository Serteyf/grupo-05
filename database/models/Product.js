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
        featured: dataTypes.INTEGER,
        categoryId:{
            type: dataTypes.INTEGER,
            foreignKey: true,           
            autoIncrement: true
        },
        image: dataTypes.STRING
    };
    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.CategoriaProductos, {
            as: "products_category",
            foreignKey: "categoryId"
        });
        Product.belongsToMany(models.Ventas, {
            as: "sales",
            through: "products_sales"
        })
    }

    return Product;
}