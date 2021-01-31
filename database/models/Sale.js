module.exports = (sequelize, dataTypes) => {
    let alias = "Ventas";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date:{},
        payment_method:{},
        user_id:{
             type: dataTypes.INTEGER,
            foreignKey: true,           //REVISAR//
            autoIncrement: true         //REVISAR//
        },
        quantity:{
            type: dataTypes.INTEGER
        },
        total_amount:{
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "sales",
        timestamps: false
    }

    const Sale = sequelize.define(alias, cols, config);

    return Sale;
}