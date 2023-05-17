const LoginAdmin = require("../Models/LoginAdmin");

exports.registerAdminUser = async (req, res) => {
  const userAdmin = new LoginAdmin(req.body);
  const { usuario, senha, pin } = req.body;

  const registredAdmin = await userAdmin.registerAdmin();

  res.json({
    userAdmin: registredAdmin,
  });
};

exports.loginAdminUser = async (req, res) => {
  const userAdminCredentials = new LoginAdmin(req.body);
  const { usuario, senha, pin } = req.body;
  console.log(usuario)

  const localizedUser = await userAdminCredentials.findUserAdmin();

  res.json({
    userAdmin: localizedUser,
  });
};
