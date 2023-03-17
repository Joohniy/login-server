const Login = require('../Models/LoginReact');

exports.especial = async (req, res) => {
    const users = new Login(req.body);
    const allUsers = await users.findAll();
    res.json({
      users: allUsers,
    });  

};

exports.edit = async (req, res) => {
    const {
        _id, name, email, senha,
      } = req.body;
      const users = new Login(req.body);
      const idUsers = await users.edit(_id);
    
      res.json({
        users: idUsers,
      });

};

exports.delete = async (req, res) => {
    const { _id } = req.body;
    const users = new Login(req.body);
    const deleteUser = await users.delete(_id);
  
    res.json ({
      users: deleteUser,
    });
};