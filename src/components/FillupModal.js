import React from 'react';

const FillupModal = (props) => (
    <div className="modal fade" id="fillup-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <button type="button" className="btn btn-danger"data-dismiss="modal">Delete Vehicle</button>
          </div>
        </div>
      </div>
    </div>
);

export default FillupModal;
