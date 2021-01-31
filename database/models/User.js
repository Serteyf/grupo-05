module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user:{},
        name:{
            type: dataTypes.STRING
        },
        address:{},
        password:{},
        category_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,           //REVISAR//
            autoIncrement: true         //REVISAR//
        },
        avatar:{}
    };
    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    return User;
}