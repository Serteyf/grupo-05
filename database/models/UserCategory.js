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
        tableName: "user_category",
        timestamps: false,
    };

    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = (models) => {
        UserCategory.belongsToMany(models.User, {
            as: "users",
            through: "users_category",
        });
    };

    return UserCategory;
};
