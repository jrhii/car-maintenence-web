function loginAuth (init) {
    fetch(`/${event.target.name}`,init).then((res) => {
        if (res.ok) {
            console.log('post success');

        } else {
            console.log('post unsuccess');
        }
    });
}

function usernameCheck(init) {
    fetch('/checkUsername',init).then((res) => {
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
