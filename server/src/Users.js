import mongoose from 'mongoose';

class Users {
    getUsers(req, {UserModel}, callback) {
        const userId = mongoose.Types.ObjectId(req.params.userId);

        UserModel.findOne({_id: userId}, (err, user) => {
            if (err) {
                callback(err);
                return;
            }
            if (!user.isAdmin) {
                callback('User is not authorized');
                return;
            }

            UserModel.find({}, (err, usersArr) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, usersArr);
            });
        });
    }
}

export default Users;
