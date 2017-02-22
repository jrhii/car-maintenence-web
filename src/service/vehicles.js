function populateVehicles (userId, callback) {
    fetch(`/api/vehicles/get/${userId}`).then((res) => {
        res.json().then((vehicles) => {
            callback(vehicles);
        });
    });
}

function addVehicle(vehicle, callback) {
    const init = {
        method: 'post',
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify(vehicle),
    };

    fetch(`/api/vehicles/new`,init).then((res) => {
        callback();
    });
}

function editVehicle(vehicle, callback) {
    const init = {
        method: 'post',
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify(vehicle),
    };

    fetch(`/api/vehicles/edit`,init).then((res) => {
        callback();
    });
}

function _deleteVehicle(vehicleId, callback) {
    fetch(`/api/vehicles/delete/${vehicleId}`, {method: 'delete'}).then((res) => {
        callback();
    });
}

export {populateVehicles, addVehicle, editVehicle, _deleteVehicle};
