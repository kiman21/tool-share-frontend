import React, { useState, useEffect } from 'react';
import API from "../../utils/API"
import DataWindow from "../../components/DataWindow";
import ToolArrangementForm from "../../components/ToolArrangement";

const Home = (props) => {
    console.log('Home - token:', props.token);
    const [tools, setTools] = useState([]);
    const [showToolArrangementForm, setShowToolArrangementForm] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);

    const handleNewPendingRequest = async (shareData, token) => {
      try {
        await API.createShare(shareData, token);
      } catch (error) {
        console.error('Failed to create share:', error);
      }

    };

    useEffect(() => {
       async function fetchData() {
          const allTools = await API.getAvailableTools();
          const toolsNotOwnedByUser = allTools.filter(tool => tool.Owner_Id !== props.userId);
          setTools(toolsNotOwnedByUser);
        };

        fetchData();
    }, [props.userId]);

    return (
        <div className="home-page">
        <DataWindow
          title="Available Tools"
          dataList={tools}
          renderItem={(tool) => (
            <>
              {tool.toolname}
              <button
                onClick={() => { 
                  console.log('Selected tool:', tool);
                  setSelectedTool(tool);
                  setShowToolArrangementForm(true);
                }}
              >
                Request Tool
              </button>
            </>
          )}
        />
        {showToolArrangementForm && (
          <ToolArrangementForm
            userId={props.userId}
            token={props.token}
            selectedTool={selectedTool}
            handleNewPendingRequest={handleNewPendingRequest}
            closeForm={() => setShowToolArrangementForm(false)}
          />
        )}
        </div>
    );
};

export default Home;