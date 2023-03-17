const Login = require('../Models/LoginReact');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const users = new Login(req.body);

        if (users.errors.length > 0) {
            res.send(users.errors);
        }

        const cadastrados = await users.findUser();

        const token = jwt.sign({ _id: cadastrados._id }, process.env.SECRET, {
            expiresIn: 60,
        });


        res.json({
            token: token,
            users: cadastrados,
        });

    } catch (e) {
        console.log(e, 'E-mail ou senha incorreto');
    }
}