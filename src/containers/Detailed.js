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
            fillup: {costPerGallon: null, gallons: null, miles: null, cost: null, date: Date()},
        };

        this.userVehicles = this.userVehicles.bind(this);
        this.addFillup = this.addFillup.bind(this);
        this.handleFillupChange = this.handleFillupChange.bind(this);

        getDetail(props.params.vehicleId, (details) => {
            this.setState({vehicle: details.vehicle, trips: details.trips.splice(0,3)});
        });
    }

    addFillup(ownedId) {
        console.log(this.state.fillup);
        console.log(ownedId);
        console.log('Adding fillup');
    }

    handleFillupChange(event) {
        const fillupUpdate = {
            costPerGallon: this.state.fillup.costPerGallon,
            gallons: this.state.fillup.gallons,
            miles: this.state.fillup.miles,
            cost: this.state.fillup.cost,
            date: Date(),
        };

        fillupUpdate[event.target.name] = event.target.value;

        if (event.target.name !== 'miles' && event.target.name !== 'date') {//autofill
            if (fillupUpdate.gallons && (fillupUpdate.cost || fillupUpdate.costPerGallon)) {//if we have at least this much info
                switch (event.target.name) {
                case 'gallons':
                    if (fillupUpdate.cost) {
                        fillupUpdate.costPerGallon = (fillupUpdate.cost/fillupUpdate.gallons).toFixed(3);
                    } else {
                        fillupUpdate.cost = (fillupUpdate.gallons * fillupUpdate.costPerGallon).toFixed(2);
                    }
                    break;
                case 'cost':
                    fillupUpdate.costPerGallon = (fillupUpdate.cost/fillupUpdate.gallons).toFixed(3);
                    break;
                case 'costPerGallon':
                    fillupUpdate.cost = (fillupUpdate.gallons * fillupUpdate.costPerGallon).toFixed(2);
                    break;
                }
            }
        }

        this.setState({fillup: fillupUpdate});
    }

    userVehicles() {
        this.props.router.push(`/vehicles/user/${this.state.userId}`);
    }

    render() {
        return (
            <DetailedView
                vehicleName={this.state.vehicleName}
                vehicle={this.state.vehicle}
                trips={this.state.trips}
                userVehicles={this.userVehicles}
                fillup={this.state.fillup}
                addFillup={this.addFillup}
                handleFillupChange={this.handleFillupChange}/>
        );
    }
}

export default Detailed;
