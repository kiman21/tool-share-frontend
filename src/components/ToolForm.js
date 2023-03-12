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
          <form className="form">
            <input
              value={toolType}
              name="toolType"
              onChange={handleInputChange}
              type="text"
              placeholder="Select Tool Type:"
            />
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