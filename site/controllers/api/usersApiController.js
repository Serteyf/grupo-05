const toThousand = require("../../utils/toThousand");
const db = require("../../database/models");

usersController = {
    list: async (req, res) => {
        const users = await db.User.findAll({
            attributes: ["id", "user", "name", "email", "address"],
        });

        users.forEach((user) =>
            user.setDataValue("detail", "api/users/" + user.id)
        );

        res.json({
            meta: {
                status: 200,
                count: users.length,
                url: "/api/users",
            },
            data: users,
        });
    },
    find: async (req, res) => {
        const users = await db.User.findByPk(req.params.id, {
            attributes: ["id", "user", "name", "email", "address", "avatar"],
        });

        if (users !== null) {
            users.setDataValue("profile-image", "images/users/" + users.avatar);
        }

        res.json(users);
    },
    count: async (req, res) => {
        const count = await db.User.count();

        res.json({
            meta: {
                count,
            },
            count,
        });
    },
};

module.exports = usersController;
