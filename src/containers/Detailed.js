import React, {Component} from 'react';
import DetailedView from '../components/DetailedView';
import {getDetail, addFillup} from '../service/details';
import {Link, Router} from 'react-router';

class Detailed extends Component {
    constructor(props) {
        super(props);
        const opt = props.params.opt === 'undef' ? '' : props.params.opt;
        
        this.state = {
            vehicleName: `${props.params.year} ${props.params.make} ${props.params.model} ${opt}`,
            vehicle: {},
            trips: [],
            userId: props.params.userId,
            fillup: {
                gallons: '',
                costPerGallon: '',
                miles: '',
                cost: '',
                date: (new Date()).toISOString(),
            },
        };

        this.userVehicles = this.userVehicles.bind(this);
        this.addFillup = this.addFillup.bind(this);
        this.handleFillupChange = this.handleFillupChange.bind(this);
        this.resetFillup = this.resetFillup.bind(this);

        getDetail(props.params.vehicleId, (details) => {
            this.setState({vehicle: details.vehicle, trips: details.trips.splice(0,3)});
        });
    }

    addFillup(ownedId) {
        const apiFillup = {
            gallons: this.state.fillup.gallons,
            miles: this.state.fillup.miles,
            cost: this.state.fillup.cost,
            date: this.state.fillup.date,
            ownedId,
        }

        console.log('Adding fillup');
        addFillup(apiFillup, () => {
            getDetail(this.props.params.vehicleId, (details) => {
                this.setState({vehicle: details.vehicle, trips: details.trips.splice(0,3)});
            });
            this.resetFillup();
        });
    }

    handleFillupChange(event) {
        const fillupUpdate = {
            costPerGallon: this.state.fillup.costPerGallon,
            gallons: this.state.fillup.gallons,
            miles: this.state.fillup.miles,
            cost: this.state.fillup.cost,
            date: (new Date()).toISOString(),
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

        for (let key in fillupUpdate) {//turn all the number props into Numbers
            if (key.toString() !== 'date' && fillupUpdate.hasOwnProperty(key)) {
                fillupUpdate[key] = parseFloat(fillupUpdate[key]);
            }
        }

        this.setState({fillup: fillupUpdate});
    }

    resetFillup() {
        console.log('resseting modal');
        this.setState({fillup: {costPerGallon: '', gallons: '', miles: '', cost: '', date: Date()}});
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
                resetFillup={this.resetFillup}
                handleFillupChange={this.handleFillupChange}/>
        );
    }
}

export default Detailed;
