module.exports = (sequelize, dataTypes) => {
    let alias = "CategoriasUsuarios";
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
        UserCategory.hasMany(models.Usuarios, {
            as: "users",
        });
    };

    return UserCategory;
};
