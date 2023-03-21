import React, { useState } from 'react';
import "./index.css"

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
    <form class="page" onSubmit={handleFormSubmit}>
      <label class="title" htmlFor="notes">Submit a Request to Borrow a Tool:</label>
      <input class="input"
        value={shareNotes}
        name="notes"
        onChange={handleInputChange}
        type="text"
        placeholder="Request Notes (optional)"
      />
      <button class="button" type="submit">Submit</button>
    </form>
  );
};

export default ToolArrangementForm;
