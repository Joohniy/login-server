const Login = require('../Models/LoginReact');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const users = new Login(req.body);

        const cadastrados = await users.findUser();

        const token = jwt.sign({ _id: cadastrados._id }, process.env.SECRET, {
            expiresIn: 60,
        });
        
        res.cookie('token', token, { httpOnly: true });

        res.json({
            token: token,
            users: cadastrados,
        });

        
    } catch (e) {
        res.send('Email ou senha incorretos');
    }
}