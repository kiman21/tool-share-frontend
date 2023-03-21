import React from "react";

const DataWindow = ({ title, dataList, onItemClick, renderItem }) => {
    return (
        <div className="data-window-container">
            <h3>{title}</h3>
            <ul>
                {dataList && Array.isArray(dataList) && dataList.map((item) => (
                <li
                    key={item.id}
                    onClick={(e) => {
                        if (onItemClick) {
                          e.stopPropagation();
                          onItemClick(item);
                        }
                      }}
                      style={{ cursor: onItemClick ? "pointer" : "default" }}
                >
                    {renderItem ? renderItem(item) : item.name}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default DataWindow;

