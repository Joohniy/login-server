require('dotenv').config();
const express = require('express');

const app = express();
<<<<<<< HEAD
=======
const routes = require('./routes')
>>>>>>> 15e4b144574ff3a9f274b7cfc01edfa80b7e20e6
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> cab1b656dfb20b6a5e793913a6ec4ddea002566a
const connectionString = process.env.DB;
mongoose.connect(connectionString)
  .then(() => {
    app.emit('pronto');
  });
<<<<<<< HEAD
=======

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
=======
//const connectionString = process.env.DB;
//mongoose.connect(connectionString)
//  .then(() => {
//    app.emit('pronto');
//  });
>>>>>>> cab1b656dfb20b6a5e793913a6ec4ddea002566a

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);


app.on('pronto', () => {
  app.listen(3001, () => {
    console.log('Servidor iniciado http://localhost:3001/');
  });
<<<<<<< HEAD
});
=======
//});
>>>>>>> 15e4b144574ff3a9f274b7cfc01edfa80b7e20e6
>>>>>>> cab1b656dfb20b6a5e793913a6ec4ddea002566a
