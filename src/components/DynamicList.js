import React from 'react';

const DymanicList = (props) => (
    <ol className="list-group">
        {props.vehicles.map((vehicle, key) => {
            return <li className="list-group-item" key={key}>{vehicle}</li>;
        })}
    </ol>
);

DymanicList.propTypes = {
    vehicles: React.PropTypes.array.isRequired,
};

export default DymanicList;
