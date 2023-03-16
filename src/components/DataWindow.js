import React from "react";
// import { useParams } from "react-router-dom";
// import API from "../../utils/API";

const DataWindow = ({ title, dataList, onItemClick }) => {
    return (
        <div className="data-window-container">
            <h3>{title}</h3>
            <ul>
                {dataList && Array.isArray(dataList) && dataList.map((item) => (
                <li
                    key={item.id}
                    onClick={() => onItemClick && onItemClick(item)}
                    style={{ cursor: onItemClick ? "pointer" : "default" }}
                >
                    {item.name}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default DataWindow;

