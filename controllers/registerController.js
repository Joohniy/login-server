const Login = require('../Models/LoginReact');

exports.register = async (req, res) => {
    const { name, email, senha } = req.body;
    const users = new Login(req.body);

    await users.register();

    const errors = users.errors;
    console.log(errors);

    const cadastrados = await users.searchId();
    res.json({
        users: cadastrados,
    });
}