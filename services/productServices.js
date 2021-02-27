const { Product } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await Product.findByPk(id)
    },
    findSuggested: async (productCategoryId) => {
        return await Product.findAll({
            raw: true,
            where: { categoryId: productCategoryId }
        })
    },
    findAll: async () => {
        return await Product.findAll({raw:true})
    },
    findByCategory: async () => {
        return await Product.findAll({
            raw: true,
            where: { categoryId: req.params.category }
        }) 
    },
    // findSuggested: async (id) => {
    //     return await this.findAll().filter(product => {
    //         product.category = this.findByPk(id).category;
    //     });

    // },
    // create: async (payload) => {
        //     return await Product.create({
            //         ...payload
            //     })
            // }
            
        }