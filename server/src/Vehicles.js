class Vehicles {
    constructor(collectionStr) {
        this.collectionStr = collectionStr;
    }

    getVehicles(req, res, db) {
        const collection = db.collection(this.collectionStr);
        const username = req.body.username.toLowerCase();

        collection.find({ username: username}).toArray((err, result) => {
            if (err) throw err;

            console.log(`${username} exists.`);
            res.json(result);
        });
    }

    newVehicle(req, res, db) {
        const collection = db.collection(this.collectionStr);
        const username = req.body.username.toLowerCase();
        const vehicle = {
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            opt: req.body.opt,
        };
        
    }
}

export default Vehicles;
