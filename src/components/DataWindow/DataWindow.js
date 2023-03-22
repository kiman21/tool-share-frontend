import React from "react";
import "../../index.css";

const DataWindow = ({ title, dataList, onItemClick, renderItem }) => {
    return (
        <div className="data-window-container w-auto ml-20 mt-10 border-2 border-gray-700 max-w-2xl p-3">
            <h3 className="text-xl">{title}</h3>
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

