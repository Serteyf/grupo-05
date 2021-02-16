module.exports = (sequelize, dataTypes) => {
    let alias = "UserCategory";
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
        tableName: "users_category",
        timestamps: false,
    };

    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = (models) => {
        UserCategory.hasMany(models.User, {
            as: "users",
            foreignKey: "categoryId",
        });
    };

    return UserCategory;
};
