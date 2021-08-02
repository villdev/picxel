import React from "react";
import { Gallery, Header } from "../components";
import { usePhotos } from "../hooks";
import { Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const {
    photos,
    status,
    getNextPage,
    // searchResults,
    getNextSearchPage,
    searchQuery,
    setSearchQuery,
    getSearchResults,
    variant,
  } = usePhotos();

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        getSearchResults={getSearchResults}
      />
      {status === "pending" && (
        <div className="loader-wrapper">
          <Spinner />
        </div>
      )}
      {status === "resolved" && (
        <InfiniteScroll
          dataLength={photos.length}
          next={variant === "default" ? getNextPage : getNextSearchPage}
          hasMore={true}
          loader={
            <div className="loader-wrapper">
              <Spinner />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen all the photos.</b>
            </p>
          }
        >
          <Gallery imgArray={photos} />
        </InfiniteScroll>
      )}
      {status === "rejected" && (
        <div className="alert-wrapper">
          <Alert justifyContent={"center"} status="error">
            <AlertIcon />
            There was an error processing your request. Please refresh.
          </Alert>
        </div>
      )}
    </div>
  );
}
