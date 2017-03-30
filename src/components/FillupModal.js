import React from 'react';
import SingleInput from './SingleInput';

const FillupModal = (props) => (
    <div className="modal fade" id="fillup-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Fillup</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
              <form name="fillup">
                  <SingleInput
                        className={'form-control'}
                        inputType={'number'}
                        name={'miles'}
                        controlFunc={props.handleFillupChange}
                        content={props.fillup.miles}
                        placeholder={'Odometer'} />
                 <SingleInput
                        className={'form-control'}
                        inputType={'number'}
                        name={'costPerGallon'}
                        controlFunc={props.handleFillupChange}
                        content={props.fillup.costPerGallon}
                        placeholder={'Dollars/Gal'} />
                  <SingleInput
                        className={'form-control'}
                        inputType={'number'}
                        name={'gallons'}
                        controlFunc={props.handleFillupChange}
                        content={props.fillup.gallons}
                        placeholder={'Gallons'} />
                  <SingleInput
                        className={'form-control'}
                        inputType={'number'}
                        name={'cost'}
                        controlFunc={props.handleFillupChange}
                        content={props.fillup.cost}
                        placeholder={'Total Cost'} />
              </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" onClick={props.addFillup.bind(null, props.vehicleId)} data-dismiss="modal">Submit Fillup</button>
          </div>
        </div>
      </div>
    </div>
);

export default FillupModal;