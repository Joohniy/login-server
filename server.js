require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const Login = require('./Models/LoginReact');

mongoose.set('strictQuery', true);

const connectionString = process.env.DB;
mongoose.connect(connectionString)
  .then(() => {
    app.emit('pronto');
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.post('/register', async (req, res) => {
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
});

app.post('/login', async (req, res) => {
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
});

app.get('/especial', async (req, res) => {
  const users = new Login(req.body);
  const allUsers = await users.findAll();
  res.json({
    users: allUsers,
  });
});

app.post('/especial/edit', async (req, res) => {
  const {
    _id, name, email, senha,
  } = req.body;
  const users = new Login(req.body);
  const idUsers = await users.edit(_id);

  res.json({
    users: idUsers,
  });
});

app.post('/especial/delete', async (req, res) => {
  const { _id } = req.body;
  const users = new Login(req.body);
  const deleteUser = await users.delete(_id);

  res.json ({
    users: deleteUser,
  })
})

app.get('/users/id', async (req, res) => {
  const headerToken = req.headers['authorization'];

  jwt.verify(headerToken, process.env.SECRET, (err, decoded) => {
    if(err) {
      console.log('Algo deu errado')
    } else {
      return decoded;
    }
    
  });

  const users = new Login(req.body);
  const cadId = await users.searchId();
  res.json({

  });
});

app.on('pronto', () => {
  app.listen(3001, () => {
    console.log('Servidor iniciado http://localhost:3001/');
  });
});
