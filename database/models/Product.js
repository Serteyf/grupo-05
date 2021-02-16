module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.STRING,
        },
        price: {
            type: dataTypes.INTEGER,
        },
        discount: {
            type: dataTypes.INTEGER,
        },
        featured: {
            type: dataTypes.INTEGER,
        },
        categoryId: {
            type: dataTypes.INTEGER,
            foreignKey: true,
        },
        image: {
            type: dataTypes.STRING,
        },
    };
    let config = {
        tableName: "products",
        timestamps: false,
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.ProductCategory, {
            as: "product_category",
            foreignKey: "categoryId",
        });
        Product.belongsToMany(models.Sale, {
            as: "sales",
            through: "products_sales",
            foreignKey: "productId",
            otherKey: "saleId",
            timestamps: false,
        });
    };

    return Product;
};
