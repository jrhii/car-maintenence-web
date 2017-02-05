import React, {Component} from 'react';
import DynamicList from '../components/DynamicList';

class Vehicles extends Component {
    constructor(props) {
        super(props);
        this.state = {user: null, vehicles: ['Ford Explorer', 'Mazda Miata']};
    }

    populateVehicles() {
        const userVehicles = ['Ford Explorer', 'Mazda Miata'];

        this.setState({vehicles : userVehicles});
    }

    render() {
        return (
            <div>
                <DynamicList vehicles={this.state.vehicles}/>
                <button type="button" className="btn btn-outline-primary" name="newVehicle" onClick={this.handleEvent}>Add New Vehicle</button>
            </div>
        );
    }
}

export default Vehicles;
