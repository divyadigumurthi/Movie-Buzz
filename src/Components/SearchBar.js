import React from "react";

const SearchBar = props => {
  const { setNavBarLocation, setQuery } = props;

  return (
    <div class="container">
    <div className="search-container">
      <i className="fas fa-search" />
      <input
        className="search-input"
        type="search"
        placeholder="Search movie name..."
        onChange={event => setQuery(event.target.value)}
      />
    </div>
    </div>
  );
};

export default SearchBar;
