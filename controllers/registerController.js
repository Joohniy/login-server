const Login = require('../Models/LoginReact');

exports.register = async (req, res) => {
    const { name, email, senha } = req.body;
    const users = new Login(req.body);

    await users.register();

    if (users.errors.length > 0) {
        res.send(users.errors);
    }

    const cadastrados = await users.searchId();
    res.json({
        users: cadastrados,
    });
}