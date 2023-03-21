import React, { useState } from 'react';
import API from "../utils/API";
import "./index.css"

const ToolForm = ({ userId, closeForm }) => {

  const toolTypes = [
    { id: 1, name: 'Saw' },
    { id: 2, name: 'Drill' },
    { id: 3, name: 'Sander' }
  ];

  const [toolName, setToolName] = useState('');
  const [toolType, setToolType] = useState('');
  const [toolDescription, setToolDescription] = useState('');

  const handleSubmit = async () => {

    const toolData = {
      toolname: toolName,
      description: toolDescription,
      Type_Id: toolType,
      Owner_Id: userId,
    };

    try {
      await API.createTool(toolData);

      closeForm();
    } catch (error) {
      console.error('Failed to create tool:', error);
    }
};

  return (
    <div class="container">
      <form class="page" onSubmit={handleSubmit}>
        <label class="title" htmlFor="tool-name">Tool Name:</label>
        <input class="input"
          type="text"
          id="tool-name"
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
        />

        <label class="title" htmlFor="tool-type">Tool Type:</label>
        <select class="input"
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

        <label class="title" htmlFor="tool-description">Description:</label>
        <textarea class="input"
           id="tool-description"
          value={toolDescription}
          onChange={(e) => setToolDescription(e.target.value)}
        ></textarea>

        <button class="button"type="submit">Add Tool</button>
      </form>
    </div>
  );
};

export default ToolForm;
