const Login = require('../Models/LoginReact');
const jwt = require('jsonwebtoken');

exports.localizeUserId = async (req, res) => {
    const headerToken = req.headers['authorization'];

    jwt.verify(headerToken, process.env.SECRET, (err, decoded) => {
      if(err) {
        res.status(401).send('Token inválido');
      } else {
        return decoded;
      }
    });

    const users = new Login(req.body);
    const cadId = await users.searchId();  
};