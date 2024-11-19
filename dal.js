const { errorMonitor } = require('mongodb/lib/apm');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;  



MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    console.log("Connected successfully to server");

    //connect to myproyect database
    db = client.db('myproject');
});

// create users account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {writeConcern: {w:1}}, function(err, result){
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        });
    }
    );
}

// all users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db.
        collection('users')
        .find()
        .toArray(function(err, docs){
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
}

// Función para iniciar sesión
function login(email, password) {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error('Database connection is not established'));
        }
        const collection = db.collection('users');
        collection.findOne({ email, password }, (err, user) => {
            if (err) {
                return reject(err);
            }
            if (!user) {
                return resolve({ error: 'Invalid email or password' });
            }
            resolve(user);
        });
    });
}
function deposit(email, amount) {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error('Database connection is not established'));
        }
        const collection = db.collection('users');
        const depositAmount = parseFloat(amount);
        if (isNaN(depositAmount) || depositAmount <= 0) {
            return resolve({ error: 'Invalid deposit amount' }); 
        }
        collection.findOneAndUpdate(
            { email: email }, 
            { $inc: { balance: depositAmount } }, // Aumenta el Balance
            { returnDocument: 'after' }, // Return the updated document
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (!result.value) {
                    return resolve({ error: 'User not found' });
                }
                resolve(result.value); // Retorna al usuario actualizado
            }
        );
    });
}

function withdraw(email, amount) {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error('Database connection is not established'));
        }
        const collection = db.collection('users');
        const withdrawAmount = parseFloat(amount);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            return resolve({ error: 'Invalid deposit amount' }); 
        }
        collection.findOneAndUpdate(
            { email: email }, 
            { $inc: { balance: -withdrawAmount } }, // Disminuye el Balance
            { returnDocument: 'after' }, 
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (!result.value) {
                    return resolve({ error: 'User not found' });
                }
                resolve(result.value); // Retorna al usuario actualizado
            }
        );
    });
}

function balance(email) {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error('Database connection is not established'));
        }
        const collection = db.collection('users');
        collection.findOne({ email: email }, (err, user) => {
            if (err) {
                return reject(err);
            }
            if (!user) {
                return resolve({ error: 'User not found' });
            }
            resolve({ balance: user.balance || 0 });
        });
    });
}

module.exports = {create, all, login, deposit, withdraw, balance};
