// import React, { useState } from 'react';

// function ToolForm(props) {
//     const [toolType, setToolType] = useState('');
//     const [toolName, setToolName] = useState('');

//     const handleInputChange = (e) => {
//         const {tool, value} = e.target;

//         return tool==='toolName' ? setToolType(value) : setToolName(value);
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         alert('Your tool is ready for lending!');
//         setToolName('');
//         setToolType('');

//     }
    // return (
    //     <div>
    //       <h1>Submit a Tool:</h1>
    //       <form className="form">
    //         <label for "toollist">Tool Type:</label>
    //         <select id="toollist" name="toollist">
    //           <option></option>
    //         </select>
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

// export default ToolForm;

import React, { useState } from 'react';
import API from "../utils/API";

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
