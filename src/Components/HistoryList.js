import React from "react";
import HistoryListItem from "./HistoryListItem";

const HistoryList = ({
  searchHistory,
  noSearchHistoryIcon,
  onSearch,
  onDelete,
}) => (
  <div className="search-history">
    <div className="search-history-title">Search History</div>
    {!searchHistory.length ? (
      <img
        src={noSearchHistoryIcon}
        alt="No search history"
        style={{ height: 100, margin: "32px auto 0", display: "block" }}
      />
    ) : (
      searchHistory.map((item, idx) => (
        <HistoryListItem
          key={idx}
          item={item}
          idx={idx}
          onSearch={onSearch}
          onDelete={onDelete}
        />
      ))
    )}
  </div>
);

export default HistoryList;
