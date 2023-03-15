const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { genSaltSync } = require('bcrypt');

const LoginReactSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  senha: { type: String, required: false },
});

const LoginReact = mongoose.model('LoginReact', LoginReactSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.users = null;
    this.errors = [];
  }

  async findUser() {
    this.user = await LoginReact.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push('Usuário não existe');
    }

    const auth = bcryptjs.compareSync(this.body.senha, this.user.senha);

    if (auth === false) {
      return this.errors.push('Senha inválida');
    }
    return this.user;
  }

  async register() {
    if (!this.body.email && !this.body.senha) {
      this.errors.push('Campo e-mail e senha são obrigatórios');
      return;
    }

    const salt = genSaltSync();
    this.body.senha = await bcryptjs.hashSync(this.body.senha, salt);

    this.user = await LoginReact.create(this.body);
  }

  async findAll() {
    const all = await LoginReact.find();
    return all;
  }

  async edit(id) {
    const salt = genSaltSync();
    this.body.senha = await bcryptjs.hashSync(this.body.senha, salt);
    this.user = await LoginReact.findByIdAndUpdate(id, this.body, { new: true });
  }

  async delete (id) {
    const deleteUser = await LoginReact.findByIdAndDelete(id);
    return deleteUser;
  }

  async searchId() {
    const refId = await LoginReact.find();
    return refId;
  }
}

module.exports = Login;
