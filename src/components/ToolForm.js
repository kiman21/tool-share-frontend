import React, { useState } from 'react';
// import API from "../utils/API";

const ToolForm = ({ userId, onSubmit }) => {

  const toolTypes = [
    { id: 1, name: 'Saw' },
    { id: 2, name: 'Drill' },
    { id: 3, name: 'Sander' }
  ];

  const [toolName, setToolName] = useState('');
  const [toolType, setToolType] = useState('');
  const [toolDescription, setToolDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const toolData = {
      toolname: toolName,
      description: toolDescription,
      Type_Id: toolType,
      Owner_Id: userId,
    };

    onSubmit(toolData);
};

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tool-name">Tool Name:</label>
      <input
        type="text"
        id="tool-name"
        value={toolName}
        onChange={(e) => setToolName(e.target.value)}
      />

      <label htmlFor="tool-type">Tool Type:</label>
      <select
        id="tool-type"
        value={toolType}
        onChange={(e) => setToolType(e.target.value)}
      >
        <option value="">Select a tool type</option>
        {toolTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <label htmlFor="tool-description">Description:</label>
      <textarea
        id="tool-description"
        value={toolDescription}
        onChange={(e) => setToolDescription(e.target.value)}
      ></textarea>

      <button type="submit">Add Tool</button>
    </form>

  );
};

export default ToolForm;
