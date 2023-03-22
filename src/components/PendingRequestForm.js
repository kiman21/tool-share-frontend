import React from 'react';

const PendingRequestForm = ({ onRequestConfirm, onRequestDeny, onClose }) => {
  return (
    <form>
      <h4>New Request!</h4>
      {/* <p>Tool: {props.toolname}</p> */}
      {/* ... */}
      <button className="small-button" type="button" onClick={() => {
        onRequestConfirm();
        onClose();
      }}>
        Confirm
      </button>
      <button className="small-button" type="button" onClick={() => {
        onRequestDeny();
        onClose();
      }}>
        Deny
      </button>
    </form>
  );
};

export default PendingRequestForm;