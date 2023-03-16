import React from 'react';

const RequestForm = ({ onShareRequestConfirm, onShareRequestDeny }) => {
  return (
    <div>
      <h4> New Request! </h4>
      <button onClick={onShareRequestConfirm}>Confirm</button>
      <button onClick={onShareRequestDeny}>Deny</button>
    </div>
  );
};

export default RequestForm;