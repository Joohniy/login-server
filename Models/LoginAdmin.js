const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { genSaltSync } = require('bcrypt');

const AdminLoginSchema = new mongoose.Schema({
    name: {type: String, required: false},
    senha: {type: String, required: false},
    usuario: {type: String, required: false},
    pin: {type: String, required: false},
    isAdmin: { type: String, required: false, default: true }
});

const AdminLogin = mongoose.model('AdminControl', AdminLoginSchema);

class LoginAdmin {
    constructor(body) {
        this.body = body;
        this.userAdmin = null;
        this.errors = [];
    }

    async registerAdmin() {
        const salt = genSaltSync();
        this.body.senha = await bcryptjs.hashSync(this.body.senha, salt);
        this.body.pin = await bcryptjs.hashSync(this.body.pin, salt);
    
        this.userAdmin = await AdminLogin.create(this.body);    
    }

    async findUserAdmin() {
        this.userAdmin = await AdminLogin.findOne({ usuario: this.body.usuario });
    
        if (!this.userAdmin) {
          this.errors.push('Usuário não existe');
        }; 
        
        const authPassword = bcryptjs.compareSync(this.body.senha, this.userAdmin.senha);
        console.log(authPassword);
    
        const authPin = bcryptjs.compareSync(this.body.pin, this.userAdmin.pin);
        console.log(authPin);
        if (authPassword === false && authPin === false) {
          return this.errors.push('Credenciais incorretas.');
        };

        return this.userAdmin;
    }
}

module.exports = LoginAdmin;
