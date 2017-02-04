import crypto from 'crypto';

class Auth {
    constructor(collectionStr) {
        this.collectionStr = collectionStr;
    }

    checkUsername(req, res, db) {
        const collection = db.collection(this.collectionStr);
        const username = req.body.username.toLowerCase();
        console.log(`Checking username ${username}`);

        collection.find({ username: username}).toArray((err, result) => {
            if (result.length > 0) {
                console.log(`${username} exists.`);
                res.json({exists: true});
            } else {
                console.log(`${username} not found.`);
                res.json({exists: false});
            }
        });
    }

    checkLogin(req, res, db) {
        const collection = db.collection(this.collectionStr);
        const login = {
            username: req.body.username.toLowerCase(),
            password: req.body.password,
        };

        console.log('Checking Login');

        collection.find({ username: login.username}).toArray((err, result) => {
            if (err) throw err;
            if (result.length !== 1) {
                throw console.log('Error in username number!' + result);
            }

            const loginAttempt = result[0];

            if (this.verifyLogin(loginAttempt, login.password)) {
                res.sendStatus(200);
                console.log(`${login.username} login verified.`);
            } else {
                res.sendStatus(401);
                console.log('Bad Login');
            }
        });
    }

    register(req, res, db) {
        const collection = db.collection(this.collectionStr);
        const login = {
            username: req.body.username.toLowerCase(),
            password: req.body.password,
        };

        console.log(`registering ${login.username}`);
        const ITERATION = 20000;
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(login.password, salt, ITERATION, 256, 'sha256', (err, key) => {

            const store = {
                username : login.username,
                ITERATION,
                salt,
                hashed : key.toString('hex'),
            };

            //TODO ONLY ON USER CHECK

            collection.insertOne(store, (err, result) => {
                if (err) throw err;
                console.log(result.ops.length);
                if (result.ops.length === 1) {
                    res.sendStatus(201);
                }
            });
        });
    }

    verifyLogin(row, password) {
        const freshHash = crypto.pbkdf2Sync(password, row.salt.buffer, row.ITERATION, 256, 'sha256').toString('hex');

        return row.hashed === freshHash;
    }
}

export default Auth;
