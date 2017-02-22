import crypto from 'crypto';

class Auth {
    checkUsername(username, {AuthModel}, callback) {
        console.log(`Checking username ${username}`);

        AuthModel.find({ username: username}, (err, arr) => {
            if (arr.length > 0) {
                console.log(`${username} exists.`);
                callback(true);
            } else {
                console.log(`${username} not found.`);
                callback(false);
            }
        });
    }

    checkLogin(req, res, {AuthModel}) {
        const login = {
            username: req.body.username.toLowerCase(),
            password: req.body.password,
        };

        console.log('Checking Login');

        AuthModel.find({ username: login.username}, (err, arr) => {
            if (err) throw err;
            if (arr.length !== 1) {
                throw console.log('Error in username number!' + arr);
            }

            const userAuth = arr[0];
            this._verifyLogin(userAuth, login, (success) => {
                if (success) {
                    console.log('Login verified, getting id');
                    const userId = userAuth.userId;
                    res.json(userId);
                } else {
                    console.log('Login Failed');
                    res.sendStatus(401);
                }
            });
        });
    }

    register(req, res, {AuthModel, UserModel}) {
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
            this.checkUsername(login.username, {AuthModel}, (exists) => {
                if (exists) {
                    res.sendStatus(401);
                    return null;
                }
                new UserModel({ username: store.username, ownedIds: [] })
                    .save((err, user) => {
                        if (err) throw err;

                        store['userId'] = user._id;
                        new AuthModel(store).save((err) => {
                            if (err) throw err;

                            const userId = user._id;
                            res.json(userId);
                            console.log(`registered ${user.username}`);
                        });
                    });
            });
        });
    }

    _verifyLogin(loginAttempt, login, callback) {
        crypto.pbkdf2(login.password, loginAttempt.salt, loginAttempt.ITERATION, 256, 'sha256', (err, key) => {
            if (err) throw err;
            const freshHash = key.toString('hex');

            callback(loginAttempt.hashed === freshHash);
        });
    }
}

export default Auth;
