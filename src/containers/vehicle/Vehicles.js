import React, {Component} from 'react';
import DynamicVehicleList from '../../components/DynamicVehicleList';
import DeleteModal from '../../components/DeleteModal';
import Container from '../../components/Container';
import {populateVehicles, _deleteVehicle} from '../../service/vehicles';
import {Link, Router} from 'react-router';

class Vehicles extends Component {
    constructor(props) {
        super(props);
        this.state = {userId: props.params.userId, newVehiclePath: `/vehicles/new/${props.params.userId}`, vehicles: []};
        this.edit = this.edit.bind(this);
        this.deleteVehicle = this.deleteVehicle.bind(this);

        populateVehicles(this.state.userId, (vehicles) => {
            this.setState({vehicles: vehicles});
        });
    }

    edit(vehicleId) {
        const vehicle = this.state.vehicles.find((vehicle) => vehicle.id === vehicleId);
        let paramStr = this.state.userId;

        for (let property in vehicle) {
            if (vehicle.hasOwnProperty(property)) {
                paramStr += `/${vehicle[property]}`;
            }
        }
        this.props.router.push(`/vehicles/edit/${paramStr}`);
    }

    deleteVehicle(vehicleId) {
        _deleteVehicle(vehicleId, () => {
            populateVehicles(this.state.userId, (vehicles) => {
                this.setState({vehicles: vehicles});
            });
        });
    }

    render() {
        return (
            <Container>
                <DynamicVehicleList vehicles={this.state.vehicles} edit={this.edit} deleteVehicle={this.deleteVehicle}/>
                <Link type="button" className="btn btn-outline-primary" name="newVehicle" to={this.state.newVehiclePath}>New Vehicle</Link>
            </Container>
        );
    }
}

export default Vehicles;
