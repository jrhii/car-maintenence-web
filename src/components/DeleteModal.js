import React from 'react';

const DeleteModal = (props) => (
    <div className="modal fade" id={props.keyStr} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Delete Vehicle</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Deleting will permently erase this vehicle.  Are you sure?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger" onClick={props.deleteVehicle.bind(null, props.vehicleId)} data-dismiss="modal">Delete Vehicle</button>
          </div>
        </div>
      </div>
    </div>
);

DeleteModal.propTypes = {
    vehicleId: React.PropTypes.string.isRequired,
};

export default DeleteModal;
