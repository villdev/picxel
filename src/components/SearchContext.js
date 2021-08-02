import React from "react";
import { Button } from "@chakra-ui/react";

const SearchContext = ({
  searchHistory,
  setSearchHistory,
  status,
  setSearchContextStatus,
  setSearchQuery,
  searchRef,
  removeSearchHistory,
  getSearchResults,
}) => {
  const clearSearchHistory = () => {
    setSearchHistory([]);
    removeSearchHistory();
    searchRef.current.focus();
  };

  const getSearchQuery = (history) => {
    getSearchResults(history);
    setSearchQuery(history);
    setSearchContextStatus("close");
    searchRef.current.blur();
  };

  if (status === "open" && searchHistory.length > 0) {
    return (
      <div className="search-context">
        {searchHistory.map((history, index) => (
          <Button
            className="search-context__item"
            key={index}
            onClick={() => {
              getSearchQuery(history);
            }}
            isFullWidth={true}
            backgroundColor="gray.700"
            _hover={{ backgroundColor: "gray.600" }}
            justifyContent={"flex-start"}
          >
            {history}
          </Button>
        ))}
        <div className="search-context__item--reverse">
          <Button
            onClick={() => {
              clearSearchHistory();
            }}
            color="red.600"
            variant="link"
            size="sm"
            onFocus={() => setSearchContextStatus("open")}
          >
            Clear History
          </Button>
        </div>
      </div>
    );
  }
  return null;
};

export default SearchContext;
