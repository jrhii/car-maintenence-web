import React, {Component} from 'react';
import DetailedView from '../components/DetailedView';
import {getDetail} from '../service/details';
import {Link, Router} from 'react-router';

class Detailed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleName: `${props.params.year} ${props.params.make} ${props.params.model} ${props.params.opt}`,
            vehicle: {},
            trips: [],
            userId: props.params.userId,
        };

        this.userVehicles = this.userVehicles.bind(this);

        getDetail(props.params.vehicleId, (details) => {
            this.setState({vehicle: details.vehicle, trips: details.trips.splice(0,3)});
        });
    }

    addFillup() {
        console.log('Adding fillup');
    }

    userVehicles() {
        this.props.router.push(`/vehicles/user/${this.state.userId}`);
    }

    render() {
        return (
            <DetailedView vehicleName={this.state.vehicleName} vehicle={this.state.vehicle} trips={this.state.trips} userVehicles={this.userVehicles} addFillup={this.addFillup}/>
        );
    }
}

export default Detailed;
