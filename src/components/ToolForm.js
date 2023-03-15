import React, { useState } from 'react';
import API from "../../utils/API";

const ToolForm = (props) => {
    const [toolType, setToolType] = useState('');
    const [toolName, setToolName] = useState('');
      tool: props.tool || "",

    const handleInputChange = (e) => {
        const {tool, value} = e.target;
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
        return tool==='toolName' ? setToolType(value) : setToolName(value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const toolData = {
          ...formData
        };
        API.addTool(toolData, props.token).then((data) => {
          console.log(data);
        })
        alert('Your tool is ready for lending!');
        setToolName('');
        setToolType('');
        props.fetchData();

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