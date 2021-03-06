import React, {Component} from 'react';
import SingleInput from '../../components/SingleInput';
import Container from '../../components/Container';
import {addVehicle} from '../../service/vehicles';

class AddVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {userId: props.params.userId, year: '', make: '', model: '', opt: ''};

        this.handleEvent = this.handleEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleEvent(event) {
        const vehicle = {
            userId: this.state.userId,
            year: this.state.year,
            make: this.state.make,
            model: this.state.model,
            opt: this.state.opt,
        };

        addVehicle(vehicle, () => {
            this.props.router.push(`/vehicles/user/${this.state.userId}`);
        });

        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <form name="addVehicle" onSubmit={this.handleEvent}>
                    <SingleInput
                        className={'form-control'}
                        inputType={'text'}
                        name={'year'}
                        controlFunc={this.handleChange}
                        content={this.state.year}
                        placeholder={'Year'} />
                    <SingleInput
                        className={'form-control'}
                        inputType={'text'}
                        name={'make'}
                        controlFunc={this.handleChange}
                        content={this.state.make}
                        placeholder={'Make'} />
                    <SingleInput
                        className={'form-control'}
                        inputType={'text'}
                        name={'model'}
                        controlFunc={this.handleChange}
                        content={this.state.model}
                        placeholder={'Model'} />
                    <SingleInput
                        className={'form-control'}
                        inputType={'text'}
                        name={'opt'}
                        controlFunc={this.handleChange}
                        content={this.state.opt}
                        placeholder={'Options'} />
                    <input className="btn btn-primary" type="submit" value="Add Vehicle"/>
                </form>
            </Container>
        );
    }
}

export default AddVehicle;
