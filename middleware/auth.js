const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    const authHeader = req.he

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) {
            return 'deu errado';
        };
    
        if(decoded) {
            return 'deu certo';
        };
     
        next();
    })
}


module.exports = authToken();