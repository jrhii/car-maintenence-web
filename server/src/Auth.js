import crypto from 'crypto';

class Auth {
    checkUsername(username, {AuthModel}, callback) {
        console.log(`Checking username ${username}`);

        AuthModel.find({username: username}, (err, arr) => {
            if (err) {
                callback(err, null);
                return;
            }
            
            if (arr.length > 0) {
                console.log(`${username} exists.`);
                callback(null, true);
            } else {
                console.log(`${username} not found.`);
                callback(null, false);
            }
        });
    }

    checkLogin(req, res, {AuthModel}) {
        const login = {
            username: req.body.username.toLowerCase(),
            password: req.body.password,
        };

        console.log('Checking Login');

        AuthModel.find({username: login.username}, (err, arr) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            if (arr.length !== 1) {
                if (arr.length > 1) throw console.log(`Too many users of ${login.username}`);
                return;
            }

            const userAuth = arr[0];
            this._verifyLogin(userAuth, login, (err, success) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

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

    register(login, {AuthModel, UserModel}, callback) {
        //login = {username, password}

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
            this.checkUsername(login.username, {AuthModel}, (err, exists) => {
                if (err) {
                    console.log(err);
                    callback(500);
                    return;
                }
                if (exists) {
                    callback(401);
                    return null;
                }
                new UserModel({ username: store.username, ownedIds: [] })
                    .save((err, user) => {
                        if (err) {
                            console.log(err);
                            callback(500);
                            return;
                        }

                        store['userId'] = user._id;
                        new AuthModel(store).save((err) => {
                            if (err) {
                                console.log(err);
                                this._removeUser(UserModel, user._id);
                                callback(500);
                                return;
                            }

                            const userId = user._id;
                            callback(null, userId);
                            console.log(`registered ${user.username}`);
                        });
                    });
            });
        });
    }

    setAdmin(userId, isAdmin, {UserModel}, callback) {
        UserModel.findOne({_id: userId}, (err, user) => {
            if (err) {
                callback(err);
                return;
            }
            user.isAdmin = isAdmin;
            user.save(err => {
                if (err) {
                    console.log(err);
                }

                if (callback) {
                    callback();
                }
            });
        });
    }

    _removeUser(UserModel, userId) {
        UserModel.findOneDndRemove({_id: userId}, (err) => {
            if (err) throw err;
        });
    }

    _verifyLogin(loginAttempt, login, callback) {
        crypto.pbkdf2(login.password, loginAttempt.salt, loginAttempt.ITERATION, 256, 'sha256', (err, key) => {
            if (err) {
                callback(err, null);
                return;
            }

            const freshHash = key.toString('hex');

            callback(null, loginAttempt.hashed === freshHash);
        });
    }
}

export default Auth;
