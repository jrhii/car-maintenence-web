import crypto from 'crypto';

class Auth {
    checkUsername(req, res, AuthModel) {
        const username = req.body.username.toLowerCase();
        console.log(`Checking username ${username}`);

        AuthModel.find({ username: username}, (err, arr) => {
            if (arr.length > 0) {
                console.log(`${username} exists.`);
                res.json({exists: true});
            } else {
                console.log(`${username} not found.`);
                res.json({exists: false});
            }
        });
    }

    checkLogin(req, res, AuthModel) {
        const login = {
            username: req.body.username.toLowerCase(),
            password: req.body.password,
        };

        console.log('Checking Login');

        AuthModel.find({ username: login.username}, (err, arr) => {
            if (err) throw err;
            this._verifyLogin(arr, login, res);
        });
    }

    register(req, res, AuthModel, UserModel) {
        //const collection = db.collection(this.collectionStr);
        const login = {
            username: req.body.username.toLowerCase(),
            password: req.body.password,
        };

        console.log(`registering ${login.username}`);
        const ITERATION = 20000;
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.pbkdf2(login.password, salt, ITERATION, 256, 'sha256', (err, key) => {

            const store = {
                username : login.username,
                ITERATION,
                salt,
                hashed : key.toString('hex'),
            };

            //TODO ONLY ON USER CHECK
            new AuthModel(store).save((err, inserted) => {
                if (err) throw err;
                console.log(`registered ${inserted.username}`);
            });

            new UserModel({ username: store.username, ownedIds: [] })
                .save((err) => {
                    if (err) throw err;
                });
        });
    }

    _verifyLogin(arr, login, res) {
        if (arr.length !== 1) {
            throw console.log('Error in username number!' + arr);
        }

        const loginAttempt = arr[0];
        crypto.pbkdf2(login.password, loginAttempt.salt, loginAttempt.ITERATION, 256, 'sha256', (err, key) => {
            if (err) throw err;
            const freshHash = key.toString('hex');

            if (loginAttempt.hashed === freshHash) {
                res.sendStatus(200);
                console.log(`${login.username} login verified.`);
            } else {
                res.sendStatus(401);
                console.log('Bad Login');
            }
        });
    }
}

export default Auth;
