function getDetail(vehicleId, callback) {
    fetch(`/api/vehicles/details/get/${vehicleId}`).then((res) => {
        res.json().then((details) => {
            callback(details);
        });
    });
}
export {getDetail};
