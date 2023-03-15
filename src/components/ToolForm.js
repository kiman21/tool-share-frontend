import React, { useState } from 'react';

function ToolForm(props) {
    const [toolType, setToolType] = useState('');
    const [toolName, setToolName] = useState('');

    const handleInputChange = (e) => {
        const {tool, value} = e.target;

        return tool==='toolName' ? setToolType(value) : setToolName(value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('Your tool is ready for lending!');
        setToolName('');
        setToolType('');

    }
    return (
        <div>
          <h1>Submit a Tool:</h1>
          <form className="form">
            <label for "toollist">Tool Type:</label>
            <select id="toollist" name="toollist">
              <option></option>
            </select>
            <input
              value={toolName}
              name="toolName"
              onChange={handleInputChange}
              type="text"
              placeholder="Tool Description"
            />
            <button type="button" onClick={handleFormSubmit}>
              Submit
            </button>
          </form>
        </div>
      );
}

export default ToolForm;