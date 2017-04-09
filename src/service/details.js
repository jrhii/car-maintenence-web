function getDetail(vehicleId, callback) {
    fetch(`/api/vehicles/details/get/${vehicleId}`).then((res) => {
        res.json().then((details) => {
            callback(details);
        });
    });
}

function addFillup(fillup, callback) {
    const init = {
        method: 'post',
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify(fillup),
    };

    fetch('/api/vehicles/details/addFillup', init).then((res) => {
        callback();
    });
}
export {getDetail, addFillup};
