// import React from 'react';

// function ToolArrangementForm(props) {
//     const [toolType, setToolType] = useState('');
//     const [toolName, setToolName] = useState('');

//     const handleInputChange = (e) => {
//         const {tool, value} = e.target;

//         return tool==='toolName' ? setToolType(value) : setToolName(value);
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         alert('Your tool request has been submitted');
//         setToolName('');
//         setToolType('');

//     }
    // return (
    //     <div>
    //       <form className="form">
    //         <input
    //           value={toolType}
    //           name="toolType"
    //           onChange={handleInputChange}
    //           type="text"
    //           placeholder="Select Tool Type:"
    //         />
    //         <input
    //           value={toolName}
    //           name="toolName"
    //           onChange={handleInputChange}
    //           type="text"
    //           placeholder="Tool Description"
    //         />
    //         <button type="button" onClick={handleFormSubmit}>
    //           Submit
    //         </button>
    //       </form>
    //     </div>
    //   );
// }

// export default ToolArrangementForm;

import React, { useState } from 'react';

const ToolArrangementForm = ({ userId, selectedTool, handleNewPendingRequest, closeForm }) => {
  const [shareNotes, setShareNotes] = useState('');

  const handleInputChange = (event) => {
    setShareNotes(event.target.value);
  };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const shareData = {
      Tool_Id: selectedTool.id,
      notes: formData.get('notes'),
      Borrower_Id: userId,
      Lender_Id: selectedTool.ownerId,
    };

    handleNewPendingRequest(shareData);
    closeForm();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        value={shareNotes}
        name="notes"
        onChange={handleInputChange}
        type="text"
        placeholder="Request Notes (optional)"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ToolArrangementForm;
