import React, { useState, useEffect } from 'react';
import Card from './Card';
// import API from "../../utils/API"
import { getAvailableTools } from "../../utils/API"

const HomePage = () => {
    const [tools, setTools] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
          const data = await getAvailableTools();
          setTools(data);
        };

        fetchData();
    }, []);


    const availableToolsList = (
        <ul>
            {tools.map((tool) => (
                <li key={tool.id}>{tool.toolname}</li>
            ))}
        </ul>
    );

    return (
        <div className="home-page">
        <Card title="Available Tools" content={availableToolsList} />
        </div>
    );
};

export default HomePage;