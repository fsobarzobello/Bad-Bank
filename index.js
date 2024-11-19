var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

//create user account
app.get('/account/create/:name/:email/:password', function(req, res){
    dal.create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
        console.log(user);
        res.send(user);
})});

//login user
app.get('/account/login/:email/:password', function(req, res){
    dal.login(req.params.email, req.params.password)
        .then((user) => {
            if (user.error) {
                res.status(401).send(user); // Arroja Error si los datos son incorrectos
            } else {
                res.send(user);
            }
        })
        .catch(err => {
            console.error('Error during login:', err);
            res.status(500).send({ error: 'Internal server error' });
        });
});

// all accounts
app.get('/account/all', function(req, res){
    dal.all().
    then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

// deposit
app.get('/account/deposit/:email/:amount', function(req, res){
    dal.deposit(req.params.email, req.params.amount)
        .then((result) => {
            if (result.error) {
                res.status(404).send(result);
            } else {
                res.send({ message: `Deposit Successful`, balance: result.balance });
            }
        })
        .catch(err => {
            console.error('Error during deposit:', err);
            res.status(500).send({ error: 'Internal server error' });
        });
});

// withdraw
app.get('/account/withdraw/:email/:amount', function(req, res){
    dal.withdraw(req.params.email, req.params.amount)
        .then((result) => {
            if (result.error) {
                res.status(404).send(result);
            } else {
                res.send({ message: `Withdraw Successful`, balance: result.balance });
            }
        })
        .catch(err => {
            console.error('Error during withdraw:', err);
            res.status(500).send({ error: 'Internal server error' });
        });
});


// balance
app.get('/account/balance/:email', function(req, res){
    dal.balance(req.params.email)
        .then((result) => {
            if (result.error) {
                res.status(404).send(result);
            } else {
                res.send({ balance: result.balance });
            }
        })
        .catch(err => {
            console.error('Error retrieving balance:', err);
            res.status(500).send({ error: 'Internal server error' });
        });
});


var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);