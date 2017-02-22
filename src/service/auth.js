function loginAuth (eventName, init, callback) {
    fetch(`/api/${eventName}`,init).then((res) => {
        if (res.ok) {
            console.log('post success');
            res.json().then((resJson) => {
                callback(true, resJson);
            });
        } else {
            console.log('post unsuccess');
            callback(false);
        }
    });
}

function usernameCheck(init) {
    fetch('/api/checkUsername',init).then((res) => {
        res.json().then((json) => {
            if (!json.exists) {
                alert('Username available');
            } else {
                alert('Username taken');
            }
        });
    });
}

export { loginAuth, usernameCheck};
