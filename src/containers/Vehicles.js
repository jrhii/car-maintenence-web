import {Component} from 'react';

class Vehicles extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.list.map((listValue) => {
                    return <li>{listValue}</li>;
                })}
                <button type="button" className="btn btn-outline-primary" name="newVehicle" onClick={this.handleEvent}>Add New Vehicle</button>
            </div>
        );
    }
}

export default Vehicles;
