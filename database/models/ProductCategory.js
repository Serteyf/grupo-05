module.exports = (sequelize, dataTypes) => {
    let alias = "CategoriaProductos";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
        },
    };
    let config = {
        tableName: "products_category",
        timestamps: false,
    };

    const ProductCategory = sequelize.define(alias, cols, config);

    ProductCategory.associate = (models) => {
        ProductCategory.hasMany(models.Productos, {
            as: "products",
        });
    };

    return ProductCategory;
};
