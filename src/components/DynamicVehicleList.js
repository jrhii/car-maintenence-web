import React from 'react';
import DeleteModal from './DeleteModal';

const DymanicVehicleList = (props) => (
    <ol className="list-group">
        {props.vehicles.map((vehicle, key) => {
            const targetStr = `#delete${key}Modal`;
            const keyStr = `delete${key}Modal`;
            const yearMakeModel = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

            return (
                <div key={key}>
                    <li className="list-group-item group-btn">
                        <div className="btn-group btn-block">
                            <button className="btn btn-block btn-secondary" type="button" onClick={props.vehicleDetail}>{yearMakeModel}</button>
                            <button className="btn btn-warning" type="button" onClick={props.edit.bind(null, vehicle.id)}>Edit</button>
                            <button className="btn btn-danger" type="button" data-toggle="modal" data-target={targetStr}>X</button>
                        </div>
                    </li>

                    <DeleteModal keyStr={keyStr} vehicleId={vehicle.id} deleteVehicle={props.deleteVehicle}/>
                </div>
            );
        })}
    </ol>
);

DymanicVehicleList.propTypes = {
    vehicles: React.PropTypes.array.isRequired,
};

export default DymanicVehicleList;
