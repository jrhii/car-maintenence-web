import React from 'react';
import FillupModal from './FillupModal';
import TripsList from './TripsList';

const DetailedView = (props) => (
    console.log(props),
    <div className="container">
        <div className="row justify-content-start">
            <div className="col-12">
            <button type="button" className="btn btn-primary" name="user-vehicles" onClick={props.userVehicles.bind(null)}>Your Vehicles</button>
            </div>
        </div>
        <div className="row justify-content-start">
            <div className="col-4">
            {`${props.vehicleName}`}
            </div>
        </div>
        <div className="row justify-content-between">
            <div className="col-5">
                {`Oil Change due in {x} miles`}
            </div>
            <div className="col-1">
                <button type="button" className="btn btn-primary" name="user-vehicles" data-toggle="modal" data-target="#fillup-modal">Add Fillup</button>
            </div>
        </div>
        <div className="row justify-content-between">
            <div className="col-4">
                <div className="row">
                    1Yr Ave
                </div>
                <div className="row">
                    Global Ave
                </div>
            </div>
            <div className="col-4">
                <div className="row">
                    Recent Trips
                </div>
                <div className="row">
                    <TripsList trips={props.trips}/>
                </div>
            </div>
        </div>

        <FillupModal vehicleId={props.vehicle._id} addFillup={props.addFillup}/>
    </div>
);

export default DetailedView;
