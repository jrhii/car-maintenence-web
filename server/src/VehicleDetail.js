class VehicleDetail {
    addFillup(req, res, {UserVehicleModel}) {
        const gallons = res.body.gallons,
            totalMiles = res.body.miles,
            totalCost = res.body.cost,
            date = res.body.date,
            ownedId = res.body.ownedId;

        UserVehicleModel.findOne({_id: ownedId}, (err, ownedVehicle) => {
            if (err) throw err;

            const oldMiles = ownedVehicle.miles[ownedVehicle.miles.length - 1],
                tripMiles = totalMiles - oldMiles,
                tripMPG = tripMiles / gallons,
                tripCPG = totalCost / gallons;

            const newTrip = {
                date,
                miles: totalMiles,
                tripMiles,
                gallons,
                cost: totalCost,
                tripMPG,
                tripCPG,
            };

            ownedVehicle.trips.push(newTrip);

        });
    }

    mileageEntry(ownedId, newMiles, date, {UserVehicleModel}, callback) {
        UserVehicleModel.findOne({_id: ownedId}, (err, ownedVehicle) => {
            if (err) throw err;

            const newUpdate = ownedVehicle.lifetimeUpdates[ownedVehicle.lifetimeUpdates.length - 1];

            newUpdate.miles = newMiles;
            newUpdate.date = date;

            ownedVehicle.lifetimeUpdates.push(newUpdate);
            ownedVehicle.save(err, updated => {
                if (err) throw err;

                callback(updated);
            });
        });
    }
}

export default VehicleDetail;
