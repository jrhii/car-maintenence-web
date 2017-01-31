import React from 'react';

const DymanicList = (props) => (
    <ul className="list-group">
        {props.vehicles.map((vehicle, key) => {
            return <li className="list-group-item" key={key}>{vehicle}</li>;
        })}
    </ul>
);

DymanicList.propTypes = {
    vehicles: React.PropTypes.array.isRequired,
};

export default DymanicList;
