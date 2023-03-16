import React, { useState, useEffect } from 'react';
import API from "../../utils/API"
import DataWindow from "../../components/DataWindow";
import ToolArrangementForm from "../../components/ToolArrangement";

const Home = (props) => {
  // console.log('Home - token:', props.token);
    const [tools, setTools] = useState([]);
    const [showToolArrangementForm, setShowToolArrangementForm] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);
    
    const handleToolClick = (tool) => {
        setSelectedTool(tool);
        setShowToolArrangementForm(true);
      };

    const handleNewPendingRequest = async (shareData) => {
      try {
        const newShare = await API.createShare(shareData);
      } catch (error) {
        console.error('Failed to create share:', error);
      }

      };
  
    const handleCreateShare = async () => {
      const shareData = {
        Tool_Id: selectedTool.id,
        Borrower_Id: props.userID,
        Lender_Id: selectedTool.ownerId,
      };
          
      handleNewPendingRequest(shareData);
      };

    useEffect(() => {
       async function fetchData() {
          const allTools = await API.getAvailableTools();
          const toolsNotOwnedByUser = allTools.filter(tool => tool.ownerId !== props.userId);
          setTools(toolsNotOwnedByUser);
        };

        fetchData();
    }, [props.userId]);

    const availableToolsList = (
        <ul>
            {tools.map((tool) => (
                <li key={tool.id}>
                    {tool.toolname}
                    <button onClick={() => handleCreateShare(selectedTool)}>Request Tool</button>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="home-page">
        <DataWindow
          title="Available Tools"
          dataList={availableToolsList}
          onItemClick={handleToolClick}
        />
        {showToolArrangementForm && (
          <ToolArrangementForm
            userId={props.userId}
            selectedTool={selectedTool}
            handleNewPendingRequest={handleNewPendingRequest}
            closeForm={() => setShowToolArrangementForm(false)}
          />
        )}
        </div>
    );
};

export default Home;