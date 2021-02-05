module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user: dataTypes.STRING,
        name: dataTypes.STRING,
        address: dataTypes.STRING,
        password: dataTypes.STRING,
        categoryId: {
            type: dataTypes.INTEGER,
            foreignKey: true,
        },
        avatar: dataTypes.STRING,
    };
    let config = {
        tableName: "users",
        timestamps: false,
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.CategoriasUsuarios, {
            as: "user_category",
            foreignKey: "categoryId",
        });
    };

    return User;
};
