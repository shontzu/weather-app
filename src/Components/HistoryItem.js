import React from "react";

const HistoryItem = ({ item, idx, onSearch, onDelete }) => {
  return (
    <div className="history-item">
      <div className="history-info">
        <span className="history-city">{item.city}</span>
        <span className="history-date">{item.date}</span>
      </div>
      <div>
        <button
          className="icon-btn"
          type="button"
          onClick={() => onSearch(item)}
        >
          <span role="img" aria-label="search">
            🔍
          </span>
        </button>
        <button
          className="icon-btn"
          type="button"
          onClick={() => onDelete(idx)}
        >
          <span role="img" aria-label="delete">
            🗑️
          </span>
        </button>
      </div>
    </div>
  );
};

export default HistoryItem;
