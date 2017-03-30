import React from 'react';

const TripsList = (props) => (
    <ol className="list-group">
        {props.trips.map((trip, key) => {
            const date = new Date(trip.date);
            return (
                <div key={key}>
                    <li className="list-group-item group-btn">
                        <div className="card">
                            <div className="card-block">
                                <div className="row">
                                    <h4 className="card-title">{date.toDateString()}</h4>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <h6 className="card-subtitle mb-2">Total Miles: {trip.miles}</h6>
                                        <h6 className="card-subtitle mb-2">Cost: {trip.cost}</h6>
                                        <h6 className="card-subtitle mb-2">Dollars/Gal: {(trip.cost/trip.gallons).toFixed(3)}</h6>
                                        <h6 className="card-subtitle mb-2">Gallons: {trip.gallons}</h6>
                                    </div>
                                    <div className="col">
                                        <h6 className="card-subtitle mb-2">Miles: {trip.tripMiles}</h6>
                                        <h6 className="card-subtitle mb-2">MPG: {(trip.tripMiles/trip.gallons).toFixed(2)}</h6>
                                        <h6 className="card-subtitle mb-2">Miles Per Dollar: {(trip.tripMiles/trip.cost).toFixed(2)}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
            );
        })}
    </ol>
);

export default TripsList;
